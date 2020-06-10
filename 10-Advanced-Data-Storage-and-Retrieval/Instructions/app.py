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
            <li>Max, Min & Avg Temperature from:
             <li style="margin-left:2em"> <a target="_blank" href='/start/2017-01-01'>Any day (format: YYYY-MM-DD)</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2010-01-01/2010-12-31'>Any day range (format: YYYY-MM-DD/YYYY-MM-DD)</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2010-01-01/2010-12-31'>2010</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2011-01-01/2011-12-31'>2011</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2012-01-01/2012-12-31'>2012</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2013-01-01/2013-12-31'>2013</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2014-01-01/2014-12-31'>2014</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2015-01-01/2015-12-31'>2015</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2016-01-01/2016-12-31'>2016</a></li>
             <li style="margin-left:2em"> <a target="_blank" href='/range/2017-01-01/2017-12-31'>2017</a></li>
        """
    )


@app.route("/allrows")
def allrows():
    data = sqlHelper.getAllRows()
    return(jsonify(json.loads(data.to_json(orient='records'))))

@app.route("/precipitation")
def precipitation():
    data = sqlHelper.getPrecipitation()
    return(jsonify(json.loads(data.to_json(orient='records'))))

@app.route("/stations")
def stations():
    data = sqlHelper.getStations()
    return(jsonify(json.loads(data.to_json(orient='records'))))

@app.route("/tobs")
def tobs():
    data = sqlHelper.mostactive()
    return(jsonify(json.loads(data.to_json(orient='records'))))

@app.route("/start/<date>")
def start(date):
    data = sqlHelper.start(date)
    return(jsonify(json.loads(data.to_json(orient='records'))))

@app.route("/range/<start>/<end>")
def range(start, end):
    data = sqlHelper.range(start, end)
    return(jsonify(json.loads(data.to_json(orient='records'))))

if __name__ == "__main__":
    app.run(debug=True)
