import numpy as np
import json
from get_oracle_prices import OraclePrices

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from utils import _set_paths

_set_paths()

from get_positions import getPositionsData 

from gmx_python_sdk.scripts.v2.gmx_utils import ConfigManager



app = FastAPI()

chain = 'arbitrum'
config = ConfigManager(chain)
config.set_config()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*']
)

@app.get("/getPositionsData/{wallet}")
def read_root(wallet):
    # wallet_address = "0x4210Ebe4d47F7a183a8FeF5A7aa64f8eD918Df83"
    wallet_address = wallet
    
    return getPositionsData(config, wallet_address, "0x47c031236e19d024b42f8AE6780E44A573170703")