import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import json
from flask import Flask, jsonify


#pull from databases
drug_db_df = pd.read_sql_table('OD Data by Drug Type', 'sqlite:///OD_Data_byDrug.db')  
drugvunemployment_db_df = pd.read_sql_table('OD Data Rate versus Unemployment Rate', 'sqlite:///OD_DeathratevsUnemployment.db')

drug_dict = drug_db_df.to_dict('records')
##drug_json = json.dumps(drug_dict, indent = 2)
#print(drug_json)

unemployment_dict = drugvunemployment_db_df.to_dict('records')
unemployment_json = json.dumps(unemployment_dict, indent = 2)
##print(unemployment_json)


##Flask App
app = Flask(__name__)


@app.route("/api/v1.0/drugdata")
def drug_data():
    """Return the drug OD data by state"""

    return jsonify(drug_dict)

@app.route("/api/v1.0/drugvunemployment")
def drugvunemployment():
    """Return the Drug vs Unemployment Data by State"""

    return jsonify(unemployment_dict)

@app.route("/")
def welcome():
    return (
        f"Welcome to the DrugDash<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/drugdata<br/>"
        f"/api/v1.0/drugvunemployment<br/>"
    )


if __name__ == "__main__":
    app.run(debug=True)

