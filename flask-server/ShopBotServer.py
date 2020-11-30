from flask import Flask
app = Flask(__name__, static_folder='./build', static_url_path='/')

# @app.route('/')
# def index():
#     return app.send_static_file('index.html')

@app.errorhandler(404)   
def not_found(e):   
  return app.send_static_file('index.html')


@app.route("/sample")
def sample():
    return "<h1>YOOOOO</h1>"

if __name__ == "__main__":
    app.run(debug=True)