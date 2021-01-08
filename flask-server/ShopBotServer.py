from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='./build', static_url_path='/')

# @app.route('/')
# def index():
#     return app.send_static_file('index.html')

@app.errorhandler(404)   
def not_found(e):  
  return app.send_static_file('index.html')


@app.route("/GetOrders", methods=['GET'])
def sample():


  order1 = {"orderID": 1, "userID": 123, "firstName": "Ervin", "lastName": "Lara", "wantedProducts": ["Apples", "Bananas"]}
  order2 = {"orderID": 2, "userID": 456, "firstName": "Bill", "lastName": "Baker", "wantedProducts": ["Chips", "Cookies"]}
  completed1 = {"orderID": 3, "userID": 654, "firstName": "Sally", "lastName": "Simpson", "wantedProducts": ["Broccoli", "Cookies"]}
  completed2 = {"orderID": 4, "userID": 643, "firstName": "Joe", "lastName": "Doe", "wantedProducts": ["Apples", "Oreos"]}

  allPendingOrders = [order1,order2]
  allCompletedOrders = [completed1,completed2]



  return jsonify({"pendingOrders": allPendingOrders, "completedOrders":allCompletedOrders })

if __name__ == "__main__":
    app.run(debug=True)