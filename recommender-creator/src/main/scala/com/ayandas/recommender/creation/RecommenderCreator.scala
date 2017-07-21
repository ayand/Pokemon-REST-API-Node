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


case class Rating(userId: Int, pokemonId: Int, rating: Float)

object RecommenderCreator {
    def main(args: Array[String]) {
        //println("Hello World")


        val spark = SparkSession.builder()
            .master("local")
            .appName("MongoSparkConnectorIntro")
            .config("spark.mongodb.input.uri", "mongodb://127.0.0.1/pokemon")
            .config("spark.mongodb.output.uri", "mongodb://127.0.0.1/pokemon")
            .getOrCreate()

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
        model.save("bestModel")
        //val mongoClient: MongoClient = MongoClient()
        //val database: MongoDatabase = mongoClient.getDatabase("pokemon")
        //val recommendationCollection: MongoCollection[Document] = database.getCollection("recommendations")

        val recommendations = model.recommendForAllUsers(50)
        val transformedReccos = recommendations.select($"userId", explode($"recommendations")).select($"userId", $"col.pokemonId", $"col.rating")

        val stage1 = transformedReccos.select($"userId", $"pokemonId", transformedReccos("rating").cast(DoubleType))
        MongoSpark.save(stage1.write.option("collection", "recommendations").mode("overwrite"))
        /*transformedReccos.foreach(row => {
            val userId = row.getInt(0)
            val pokemonId = row.getInt(1)
            val rating = if (row.getFloat(2) > 5) 5.0 else row.getFloat(2)
            //println("Rating: " + rating)
            val doc: Document = Document("userId" -> userId, "pokemonId" -> pokemonId, "rating" -> rating)
            recommendationCollection.insertOne(doc)
        })*/
    }
}
