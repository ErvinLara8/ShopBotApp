from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='./build', static_url_path='/')

# @app.route('/')
# def index():
#     return app.send_static_file('index.html')

@app.errorhandler(404)   
def not_found(e):  
  return app.send_static_file('index.html')


# @app.route("/GetOrders", methods=['GET'])
# def sample():
#
#
#   order1 = {"orderID": 1, "userID": 123, "firstName": "Ervin", "lastName": "Lara", "wantedProducts": ["Apples", "Bananas"]}
#   order2 = {"orderID": 2, "userID": 456, "firstName": "Bill", "lastName": "Baker", "wantedProducts": ["Chips", "Cookies"]}
#   completed1 = {"orderID": 3, "userID": 654, "firstName": "Sally", "lastName": "Simpson", "wantedProducts": ["Broccoli", "Cookies"]}
#   completed2 = {"orderID": 4, "userID": 643, "firstName": "Joe", "lastName": "Doe", "wantedProducts": ["Apples", "Oreos"]}
#
#   allPendingOrders = [order1,order2]
#   allCompletedOrders = [completed1,completed2]
#
#
#
#   return jsonify({"pendingOrders": allPendingOrders, "completedOrders":allCompletedOrders })

@app.route("/GetEmployees", methods=['GET'])
def sample():


  employee1 = {"employeeID": 1, "firstName": "Saara", "lastName": "Vohra", "password": "myPassword123", "isAdmin": "true", "isWorking": "true"}
  employee2 = {"employeeID": 2, "firstName": "Leya", "lastName": "Michele", "password": "thisIsMyPass00", "isAdmin": "false", "isWorking": "true"}
  newEmployee1 = {"employeeID": 3, "firstName": "Peter", "lastName": "Parker", "password": "Spiderman2021", "isAdmin": "false", "isWorking": "false"}
  newEmployee2 = {"employeeID": 4, "firstName": "Zaid", "lastName": "Beau", "password": "Baseball#11", "isAdmin": "true", "isWorking": "false"}

  allOnDutyEmployees = [employee1,employee2]
  allOffDutyEmployees = [newEmployee1,newEmployee2]



  return jsonify({"onDutyEmployees":allOnDutyEmployees, "offDutyEmployees": allOffDutyEmployees})

if __name__ == "__main__":
    app.run(debug=True)
