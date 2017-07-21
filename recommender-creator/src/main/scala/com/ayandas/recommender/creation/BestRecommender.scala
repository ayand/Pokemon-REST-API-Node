package com.ayandas.recommender.creation

import java.io._

import org.apache.spark.sql.SparkSession
import org.apache.spark.ml.evaluation.RegressionEvaluator
import org.apache.spark.ml.recommendation.ALS
import org.apache.spark.ml.recommendation.ALSModel
//import org.mongodb.scala._
import scala.collection.JavaConversions._
import org.apache.spark.sql.Row
import org.apache.spark.sql.functions._
import com.mongodb.spark._
import org.bson._
import org.apache.spark.sql.types.DoubleType
import org.apache.spark.ml.tuning.{ParamGridBuilder, TrainValidationSplit}


case class PokemonRating(userId: Int, pokemonId: Int, rating: Float)

object BestRecommender {
    def main(args: Array[String]) {
      val spark = SparkSession.builder()
        .master("local")
        .appName("MongoSparkConnectorIntro")
        .config("spark.mongodb.input.uri", "mongodb://127.0.0.1/pokemon")
        .config("spark.mongodb.output.uri", "mongodb://127.0.0.1/pokemon")
        .getOrCreate()

      import spark.implicits._

      val data = spark.read.textFile("src/main/resources/ratings.txt")
      val ratings = data.map(_.split(',') match { case Array(user, item, rate) =>
          PokemonRating(user.toInt, item.toInt, rate.toFloat)
        }).toDF()

      var ranks = new Array[Int](3)
      ranks(0) = 8
      ranks(1) = 10
      ranks(2) = 12

      var lambdas = new Array[Double](3)
      lambdas(0) = 0.01
      lambdas(1) = 0.1
      lambdas(2) = 10

      var iterationNums = new Array[Int](3)
      iterationNums(0) = 10
      iterationNums(1) = 15
      iterationNums(2) = 20

      val als = new ALS()
          .setUserCol("userId")
          .setItemCol("pokemonId")
          .setRatingCol("rating")

      val paramGrid = new ParamGridBuilder()
        .addGrid(als.regParam, Array(0.1, 10.0))
        .addGrid(als.rank, Array(8, 10))
        .addGrid(als.maxIter, Array(10, 20))
        .build()

      val trainedAndValidatedModel = new TrainValidationSplit()
        .setEstimator(als)
        .setEvaluator(new RegressionEvaluator().setMetricName("rmse").setLabelCol("rating").setPredictionCol("prediction"))
        .setEstimatorParamMaps(paramGrid)
        .setTrainRatio(0.8)

      val bestModel = trainedAndValidatedModel.fit(ratings)
      bestModel.save("bestModel")

      val model = ALSModel.load("bestModel/bestModel")

      val recommendations = model.recommendForAllUsers(50)
      val transformedReccos = recommendations.select($"userId", explode($"recommendations")).select($"userId", $"col.pokemonId", $"col.rating")

      val stage1 = transformedReccos.select($"userId", $"pokemonId", transformedReccos("rating").cast(DoubleType))
      MongoSpark.save(stage1.write.option("collection", "recommendations").mode("overwrite"))
    }
}
