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
import java.util.Arrays;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Random;
import org.bson.Document;

/**
 * Dumping ratings into the database
 *
 */
public class App
{
    public static void main( String[] args )
    {
        Random userNumberGenerator = new Random(1234L);
        Random userGenerator = new Random(6981L);
        Random sentimentGenerator = new Random(5678L);
        Random ratingGenerator = new Random(9600L);

        ArrayList<Double> negativeRatings = new ArrayList<>();
        negativeRatings.add(1.0);
        negativeRatings.add(2.0);

        ArrayList<Double> positiveRatings = new ArrayList<>();
        positiveRatings.add(3.0);
        positiveRatings.add(4.0);
        positiveRatings.add(5.0);

        MongoClient mongoClient = new MongoClient("localhost");
        MongoDatabase database = mongoClient.getDatabase("pokemon");
        System.out.println("Connected to the DB");

        MongoCollection<Document> coll = database.getCollection("users");
        MongoCollection<Document> ratingColl = database.getCollection("ratings");

        ArrayList<Integer> ids = new ArrayList<>();
        FindIterable<Document> users = coll.find();
        for (Document d: users) {
            //System.out.println("Document: " + d);
            int id = d.getInteger("userNo");
            //System.out.println(id);
            ids.add(id);
        }
        System.out.println("Size: " + ids.size());
        for (int i = 1; i <= 1061; i++) {
            int numberOfUsers = (userNumberGenerator.nextInt(ids.size()) + 1);
            HashSet<Integer> selectedUsers = new HashSet<>();
            for (int j = 0; j < numberOfUsers; j++) {
                int user = userGenerator.nextInt(61);
                selectedUsers.add(user);
            }
            for (Integer userNum: selectedUsers) {
                int sentiment = sentimentGenerator.nextInt(2);
                ArrayList<Double> possibleRatings = (sentiment % 2 == 0) ? positiveRatings : negativeRatings;
                Double theRating = possibleRatings.get(ratingGenerator.nextInt(
                    possibleRatings.size()));
                Document document = new Document()
                    .append("userId", new Integer(userNum))
                    .append("pokemonId", new Integer(i))
                    .append("rating", new Double(theRating));
                ratingColl.insertOne(document);
            }
            System.out.println("All Ratings for Pokemon " + i + " are deposited");
        }
        System.out.println("All ratings are deposited");
    }
}
