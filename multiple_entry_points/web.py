from flask import Flask, jsonify
from core.calculator import add, subtract

app = Flask(__name__)

@app.route("/add/<int:a>/<int:b>")
def addition(a, b):
    result = add(a, b)
    return jsonify(result=result)

@app.route("/subtract/<int:a>/<int:b>")
def subtraction(a, b):
    result = subtract(a, b)
    return jsonify(result=result)

if __name__ == "__main__":
    app.run(debug=True)
