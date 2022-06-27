import pandas as pd
import yfinance as yf

def tick_json(tick):

    '''
        Creates a json file for the requested tick
    '''

    start = '2014-01-01'
    end = '2021-01-01'

    data = yf.download(tick, start=start, end=end)
    print(data.head())
    data.index = data.index.astype(str)
    data.to_json('./data/'+tick+'.json')

def date_tick_json(path, tick, start, end):

    '''
        Creates a json file for the requested tick and interval
    '''

    data = yf.download(tick, start=start, end=end)
    print(data.head())
    data.index = data.index.astype(str)
    data.to_json(path)

