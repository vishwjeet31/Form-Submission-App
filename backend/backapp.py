from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os 
import pymongo
from flask_cors import CORS


load_dotenv()

MONGO_URI=os.getenv("MONGO_URI")
print("Using Mongo URI:", MONGO_URI)


client= pymongo.MongoClient(MONGO_URI)
db= client.test
collection= db['Node_data']

app= Flask(__name__)
CORS(app)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    print(data)  # For debugging
    collection.insert_one(data)
    return jsonify({"message": "Data received successfully"})


@app.route('/view', methods=['GET'])
def view_data():
    data = list(collection.find({}, {'_id': 0}))  # Hides Mongo's _id
    return jsonify(data)


if __name__== '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)


