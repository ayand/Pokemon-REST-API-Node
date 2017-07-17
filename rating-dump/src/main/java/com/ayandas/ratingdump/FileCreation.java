package com.ayandas.ratingdump;

import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.ServerAddress;
import com.mongodb.MongoCredential;
import com.mongodb.client.FindIterable;

import java.io.PrintWriter;
import java.io.IOException;

import org.bson.Document;

public class FileCreation {

    public static void main(String[] args) {
        MongoClient mongoClient = new MongoClient("localhost");
        MongoDatabase database = mongoClient.getDatabase("pokemon");
        System.out.println("Connected to the DB");

        MongoCollection<Document> coll = database.getCollection("ratings");
        FindIterable<Document> ratings = coll.find();
        try {
          PrintWriter writer = new PrintWriter("ratings.txt", "UTF-8");
          for (Document rating: ratings) {
              int user = rating.getInteger("userId");
              int pokemon = rating.getInteger("pokemonId");
              double score = rating.getDouble("rating");
              String line = user + "," + pokemon + "," + score;
              writer.println(line);
          }
          writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            System.out.println("We're done");
        }

    }
}
