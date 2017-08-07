import json
from pymongo import MongoClient

client = MongoClient()

db = client.pokemon

movesetCollection = db.movesets
pokemonCollection = db.pokemons

movesetFile = open("movesets.json", "r")
movesets = json.load(movesetFile)
movesetFile.close()

with open("moveDictionary.json", "r") as dictionaryFile:
    moveDictionary = json.load(dictionaryFile)



for moveset in movesets:
    print(moveset["forme"])
    print(moveset["species"])
    pokemonCursor = pokemonCollection.find({ "forme": moveset["forme"] })
    if pokemonCursor.count() == 0:
        pokemonCursor = pokemonCollection.find({ "species": moveset["species"] })
    currentPokemon = None
    for document in pokemonCursor:
        currentPokemon = document
    if currentPokemon != None:
        pokemonID = currentPokemon["id"]
        for i in range(174):
            index = i + 1
            moveColumn = "move" + str(index)
            move = moveset[moveColumn]
            if move != "":
                moveComponents = move.split("-")
                method = moveComponents[0].strip()
                moveName = moveComponents[1:]
                aMove = None
                if len(moveName) == 1:
                    aMove = moveName[0].strip()
                else:
                    aMove = ("-").join(moveName).strip()
                print(aMove)
                moveIndex = moveDictionary[aMove]
                learningMethod = None
                if method[0] == 'L' or method == 'Start':
                    learningMethod = "Level-Up"
                elif method[0:2] == 'TM':
                    learningMethod = 'TM'
                elif method == 'Tutor':
                    learningMethod = 'Tutor'
                elif method == 'Egg':
                    learningMethod = 'Egg'
                elif method == 'ORAS':
                    learningMethod = 'ORAS'
                elif method == 'Prev':
                    learningMethod = 'Prior Evolution'
                record = {}
                record["pokemon"] = pokemonID
                record["move"] = moveName
                record["method"] = learningMethod
                record["method_full"] = method
                movesetCollection.insert_one(record)
                print("Inserted")
        print("Done with this moveset")
print("Done")
