from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
from json_data import tick_json
from json_data import date_tick_json
from os.path import exists
import gunicorn

app = Flask(__name__)
CORS(app)

@app.route('/home')
def returnFile():
    stock_data = pd.read_json('./data/home.json')
    stock_data.index = stock_data.index.strftime('%Y-%m-%d').map(str)
    response = stock_data.to_json()
    return response

@app.route('/tick')
def priceTick():
    tick = request.args.get('tick')
    return f'teri mummy {tick} se sasti hai'

@app.route('/custom-tick')
def customTick():
    tick = request.args.get('tick')
    path = './data/'+tick+'.json'
    if exists(path):
        stock_data = pd.read_json(path) 
    else:
        tick_json(tick)
        stock_data = pd.read_json(path)
    stock_data.index = stock_data.index.strftime('%Y-%m-%d').map(str)
    response = stock_data.to_json()
    return response

@app.route('/date')
def date_parse():
    tick = request.args.get('tick')
    start = request.args.get('begin')
    end = request.args.get('end')
    path = './data/'+tick+start+end+'.json'
    if exists(path):
        stock_data = pd.read_json(path) 
    else:
        date_tick_json(path, tick, start, end)
        stock_data = pd.read_json(path)
    stock_data.index = stock_data.index.strftime('%Y-%m-%d').map(str)
    response = stock_data.to_json()
    return response
    return f'Begin: {start}, End: {end}'

if __name__ == '__main__':
    app.run(debug=True)
