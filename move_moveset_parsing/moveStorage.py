import json
from pymongo import MongoClient

client = MongoClient()

db = client.pokemon

moveCollection = db.moves
movesetCollection = db.movesets

# Store information about all moves in the database
moveFile = open("moves.json", "r")
allMoves = json.load(moveFile)
moveFile.close()

moveDictionary = {}

for move in allMoves:
    moveCollection.insert_one(move)
    print("Inserting " + move["move"])
    moveDictionary[move["move"]] = move["id"]

with open("moveDictionary.json", "w") as g:
    json.dump(moveDictionary, g, indent=1)

print("Done")
