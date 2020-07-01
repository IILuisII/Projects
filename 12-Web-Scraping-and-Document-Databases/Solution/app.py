from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)
mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")

@app.route("/")
def index():
    mars = mongo.db.mars.find_one({"active": 1})
    return render_template("index.html", mars=mars)

@app.route("/scrape")
def scrape():
    mars_app = mongo.db.mars
    mars = scrape_mars.scrape_all()
    mars_app.update_many(
        {'active': 1},
        {"$set": {'active': 0}
        }
    )
    mars_app.insert_one(mars)
    return redirect('/')


if __name__ == "__main__":
    app.run()

