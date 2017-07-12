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
import org.bson.Document;

/**
 * Dumping ratings into the database
 *
 */
public class App
{
    public static void main( String[] args )
    {
        MongoClient mongoClient = new MongoClient("localhost");
        MongoDatabase database = mongoClient.getDatabase("pokemon");
        System.out.println("Connected to the DB");

        MongoCollection<Document> coll = database.getCollection("users");
        ArrayList<String> ids = new ArrayList<>();
        FindIterable<Document> users = coll.find();
        for (Document d: users) {
            String id = d.getObjectId("_id").toString();
            System.out.println(id);
            ids.add(id);
        }
        System.out.println("Size: " + ids.size());
    }
}
