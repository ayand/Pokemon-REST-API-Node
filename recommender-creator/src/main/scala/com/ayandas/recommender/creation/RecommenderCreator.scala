package com.ayandas.recommender.creation

import java.io._

import org.apache.spark.sql.SparkSession
import org.apache.spark.ml.evaluation.RegressionEvaluator
import org.apache.spark.ml.recommendation.ALS
import org.apache.spark.ml.recommendation.ALSModel

case class Rating(userId: Int, pokemonId: Int, rating: Float)

object RecommenderCreator {
    def main(args: Array[String]) {
        //println("Hello World")


        val spark = SparkSession.builder().getOrCreate()
        import spark.implicits._

        val data = spark.read.textFile("src/main/resources/ratings.txt")
        val ratings = data.map(_.split(',') match { case Array(user, item, rate) =>
          Rating(user.toInt, item.toInt, rate.toFloat)
        }).toDF()

        val Array(training, test) = ratings.randomSplit(Array(0.8, 0.2))

        var bestModel: ALSModel = null
        var rmse: Double = Double.MaxValue

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
            .setMaxIter(15)
            .setRegParam(0.1)
            .setRank(10)
            .setUserCol("userId")
            .setItemCol("pokemonId")
            .setRatingCol("rating")
        val model = als.fit(training)

        //model.setColdStartStrategy("drop")
        val predictions = model.transform(test)

        val evaluator = new RegressionEvaluator()
            .setMetricName("rmse")
            .setLabelCol("rating")
            .setPredictionCol("prediction")

        val error: Double = evaluator.evaluate(predictions)
        println(s"Root-mean-square error = $error")
        val writer = new PrintWriter(new File("error.txt"))
        writer.write(s"Root-mean-square error = $error")
        writer.close()
        model.save("bestModel")
    }
}
