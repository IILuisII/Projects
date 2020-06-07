import datetime as datetime
import numpy as np
import pandas as pd
from sqlalchemy import create_engine
from sqlHelper import SQLHelper
import json
from flask import Flask, jsonify

app= Flask(__name__)
sqlHelper = SQLHelper()

@app.route("/")
def home():
    return (
        f"Welcome to Luis's SQLAlchemy Homework - Surfs Up!<br/>"

        f"""
        <ul>
            <li><a target="_blank" href='/allrows'>Get All Rows</a></li>
            <li><a target="_blank" href='/precipitation'>Precipitation</a></li>
            <li><a target="_blank" href='/stations'>Stations</a></li>
            <li><a target="_blank" href='/tobs'>Most active station for the last year</a></li>
            <li>Max, Min & Avg Temperature
             <li style="margin-left:2em"> <a target="_blank" href='/start'>From first day</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2010-01-01/2010-12-31'>From 2010</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2011-01-01/2011-12-31'>From 2011</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2012-01-01/2012-12-31'>From 2012</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2013-01-01/2013-12-31'>From 2013</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2014-01-01/2014-12-31'>From 2014</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2015-01-01/2015-12-31'>From 2015</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2016-01-01/2016-12-31'>From 2016</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2017-01-01/2017-12-31'>From 2017</a></li>
        """
    )


@app.route("/allrows")
def allrows():
    data = sqlHelper.getAllRows()
    data = data.to_json(orient='records')
    data = json.loads(data)
    return(jsonify(data))

@app.route("/precipitation")
def precipitation():
    data = sqlHelper.getPrecipitation()
    data = data.to_json(orient='records')
    data = json.loads(data)
    return(jsonify(data))

@app.route("/stations")
def stations():
    data = sqlHelper.getStations()
    data = data.to_json(orient='records')
    data = json.loads(data)
    return(jsonify(data))

@app.route("/tobs")
def tobs():
    data = sqlHelper.mostactive()
    data = data.to_json(orient='records')
    data = json.loads(data)
    return(jsonify(data))

@app.route("/start")
def start():
    data = sqlHelper.start()
    data = data.to_json(orient='records')
    data = json.loads(data)
    return(jsonify(data))

@app.route("/range/<start>/<end>")
def range(start, end):
    data = sqlHelper.range(start, end)
    data = data.to_json(orient='records')
    data = json.loads(data)
    return(jsonify(data))

if __name__ == "__main__":
    app.run(debug=True)
