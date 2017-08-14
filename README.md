# Pokémon MEAN Stack/Spark/ElasticSearch based Application

### Source of data that is stored in the database for this operation:
https://www.kaggle.com/mylesoneill/pokemon-sun-and-moon-gen-7-stats

This application is intended to provide users with information about various Pokémon and their stats and types. You can search by their type, and also gain information about all forms they might take, such as Mega Evolutions and alternate forms coming from abilities or objects held and administered. Additional functionality to incorporate user signup and interaction is in progress. Below are the details of each separate component.

## pokemon-node
This is an Express.js application written in Node.js which interacts with a MongoDB database through the Mongoose package. The functionalities currently encoded by this API are:
* Returning all possible forms of all possible Pokémon
* Finding a particular Pokémon form based on an ID number
* Finding all forms of a particular Pokémon species
* Finding all Pokémon that have a particular type or type combination
* Registering users
* Allowing a user to post ratings for multiple Pokémon
* Returning the top 50 recommended Pokémon for a user along with the suggested ratings the user might give them.
* Return all moves in the games
* Return one particular move
* Return all the moves a Pokémon can learn
* Return all the Pokémon who can learn a move
* Search for Pokémon with a certain species, forme, type, ability, or egg group with ElasticSearch
* Search for moves with a particular name, category, or type with ElasticSearch

## rating-dump
This is a Maven Java application which uses two source files to read all user ratings of Pokémon from the database and put them in a text file
* App.java randomly selects a number of users to rate each Pokémon on a scale of 1 to 5 and stores these ratings in a database. The users whose ratings are in the database were generated by me when I used the Node API to sign them up in the database.
* FileCreation.java pulls all of the documents from "ratings" collection of the MongoDB database used in our Node app and puts the data in a text file.

## recommender-creator
This contains Apache Spark jobs which read the text file generated from the rating-dump project and use it to generate a recommendation model that uses the alternating least squares algorithm to recommend Pokémon that users may like. The top 50 recommendations for each user are then stored in the MongoDB database. Each of the files in this project tackle the recommender creation process differently.
* RecommenderCreator.scala trains an ALS model by using a matrix factorization rank of 10, a regularization parameter of 0.1, and a maximum of 15 iterations.
* BestRecommender.scala experiments with a range of different parameter options for matrix factorization rank, regularization parameter, and maximum number of iterations

## pokemon-app-frontend
This directory contains the front-end of my Pokémon application, written in Angular in TypeScript. This front-end will be capable of displaying information about Pokémon, allowing users to rate Pokémon, recommending Pokémon, and also allowing users to share customized Pokémon teams with others in order to get their opinion.

This application contains images from various sources. They are as follows:
* Carousel images
    * https://gameperiod.com/wp-content/uploads/2017/04/2016-03-08-08-24-17-ash_and_pokemon_all_by_pklucario-d34lncz.png
    * http://cdn2.alphr.com/sites/alphr/files/2016/07/how_to_get_pikachu_starter_pokemon.jpg
    * http://emertainmentmonthly.com/wp-content/uploads/sites/45/2016/11/pokemon4.jpg
* Pokémon images
    * https://bulbapedia.bulbagarden.net/

## mongo_dump
This directory contains various files for dumping various data into MongoDB and ElasticSearch.

## move_moveset_parsing
This directory contains files for dumping information about moves and Pokémon mindsets onto the MongoDB database.
