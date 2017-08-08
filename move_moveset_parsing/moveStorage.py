import json
from pymongo import MongoClient

client = MongoClient()

db = client.pokemon

moveCollection = db.moves

# Store information about all moves in the database
moveFile = open("moves.json", "r")
allMoves = json.load(moveFile)
moveFile.close()

moveDictionary = {}

for move in allMoves:
    movePayload = {}
    movePayload["category"] = move["category"]
    movePayload["pp"] = move["pp"]
    movePayload["description"] = move["description"]
    movePayload["power"] = move["power"]
    movePayload["move"] = move["move"]
    movePayload["priority"] = move["priority"]
    movePayload["crit"] = move["crit"]
    movePayload["zEffect"] = move["z-effect"]
    movePayload["type"] = move["type"]
    movePayload["id"] = move["id"]
    movePayload["accuracy"] = move["accuracy"]
    moveCollection.insert_one(movePayload)
    print("Inserting " + move["move"])
    moveDictionary[move["move"]] = move["id"]

with open("moveDictionary.json", "w") as g:
    json.dump(moveDictionary, g, indent=1)

print("Done")
