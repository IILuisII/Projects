import datetime as dt
import numpy as np
import pandas as pd
from sqlalchemy import create_engine

class SQLHelper():

    def __init__(self):
        self.connection_string = "sqlite:///Resources/hawaii.sqlite"
        self.engine = create_engine(self.connection_string)
    
    def getAllRows(self):
        query = f"""
                    SELECT
                        s.id,
                        s.station,
                        s.name,
                        s.elevation,
                        m.date,
                        m.prcp,
                        m.tobs
                    FROM
                        measurement m
                    JOIN station s ON s.station = m.station
                """

        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

    def getPrecipitation(self):
        query = f"""
            SELECT
                date as "Date",
                SUM(prcp) as "Precipitation"
            FROM
                measurement
            GROUP BY
                date
            """
        
        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

    def getStations(self):
        query = f"""
            SELECT
               station as "Station",
               name as Name,
               latitude,
               longitude,
               elevation
            FROM
                station
            """

        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

    def mostactive(self):
        query = f"""
            SELECT
                station,
                COUNT(station) as "most_active"
            FROM
                measurement
            Group by
                station
            ORDER BY 
                most_active DESC
            LIMIT
                1
            """

        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

    def start(self, date):
        query = f"""
            SELECT
                MIN(tobs) as Minimum_Temperature,
                MAX(tobs) as Max_Temperature,
                AVG(tobs) as Average_Temperature
            FROM
                measurement
            WHERE
                date >= "{date}"
            """

        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

    def range(self, start, end):
        query = f"""
            SELECT
                MIN(tobs) as Minimum_Temperature,
                MAX(tobs) as Max_Temperature,
                AVG(tobs) as Average_Temperature
            FROM
                measurement
            WHERE
                date BETWEEN "{start}" and "{end}"
            """

        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df