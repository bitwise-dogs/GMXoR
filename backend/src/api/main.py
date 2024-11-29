
import numpy as np
import json
from get_oracle_prices import OraclePrices

from fastapi import FastAPI, HTTPException

from utils import _set_paths
from web3 import Web3
import hashlib
from hexbytes import HexBytes

_set_paths()

from get_positions import get_positions

from gmx_python_sdk.scripts.v2.get.get_markets import Markets
from gmx_python_sdk.scripts.v2.gmx_utils import (
    ConfigManager, get_reader_contract, get_datastore_contract,
    get_tokens_address_dict)

from gmx_python_sdk.scripts.v2.keys import (
    min_collateral, accountPositionListKey,
    max_position_impact_factor_for_liquidations_key,
    min_collateral_factor_key)


from gmx_python_sdk.scripts.v2.get.get import GetData

from decimal import Decimal

chain = 'arbitrum'
config = ConfigManager(chain)
config.set_config()
data_obj = GetData(config=config, use_local_datastore=False,
                       filter_swap_markets=True)

def transform_to_dict(account_positions_list):
    # result = []
    
    for pos in account_positions_list:
        # Unpack the components of each position
        position, referral, fees, base_pnl_usd, uncapped_base_pnl_usd, pnl_after_price_impact_usd = pos
        
        market_info = data_obj.markets.info[position[0][1]]

        chain_tokens = get_tokens_address_dict(chain)

        entry_price = (
            position[1][0] / position[1][1]
        ) / 10 ** (
            30 - chain_tokens[market_info['index_token_address']]['decimals']
        )

        leverage = (
            position[1][0] / 10 ** 30
        ) / (
            position[1][2] / 10 ** chain_tokens[
                position[0][2]
            ]['decimals']
        )
        prices = OraclePrices(chain=chain).get_recent_prices()
        mark_price = np.median(
            [
                float(
                    prices[market_info['index_token_address']]['maxPriceFull']
                ),
                float(
                    prices[market_info['index_token_address']]['minPriceFull']
                )
            ]
        ) / 10 ** (
            30 - chain_tokens[market_info['index_token_address']]['decimals']
        )

        position_dict = {
            "position": {
                "addresses": {
                    "account": position[0][0],
                    "market": position[0][1],
                    "collateralToken": position[0][2],
                },
                "numbers": {
                    "sizeInUsd": position[1][0],
                    "sizeInTokens": position[1][1],
                    "collateralAmount": position[1][2],
                    "borrowingFactor": position[1][3],
                    "fundingFeeAmountPerSize": position[1][4],
                    "longTokenClaimableFundingAmountPerSize": position[1][5],
                    "shortTokenClaimableFundingAmountPerSize": position[1][6],
                    "increasedAtBlock": position[1][7],
                    "decreasedAtBlock": position[1][8],
                    "increasedAtTime": position[1][9],
                    "decreasedAtTime": position[1][10],
                },
                "flags": {
                    "isLong": position[2][0],
                },
            },
            "referral": {
                "referralCode": referral[0][0],
                "affiliate": referral[0][1],
                "trader": referral[0][2],
                "totalRebateFactor": referral[0][3],
                "traderDiscountFactor": referral[0][4],
                "totalRebateAmount": referral[0][5],
                "traderDiscountAmount": referral[0][6],
                "affiliateRewardAmount": referral[0][7],
            },
            "fees": {
                "fundingFeeAmount": referral[1][0],
                "claimableLongTokenAmount": referral[1][1],
                "claimableShortTokenAmount": referral[1][2],
                "latestFundingFeeAmountPerSize": referral[1][3],
                "latestLongTokenClaimableFundingAmountPerSize": referral[1][4],
                "latestShortTokenClaimableFundingAmountPerSize": referral[1][5],
            },
            "borrowing": {
                "borrowingFeeUsd": referral[2][0],
                "borrowingFeeAmount": referral[2][1],
                "borrowingFeeReceiverFactor": referral[2][2],
                "borrowingFeeAmountForFeeReceiver": referral[2][3],
            },
            "ui": {
                "uiFeeReceiver": referral[3][0],
                "uiFeeReceiverFactor": referral[3][1],
                "uiFeeAmount": referral[3][2],
            },
            "collateralTokenPrice": {
                "min": referral[4][0],
                "max": referral[4][1],
            },
            "positionFeeFactor": referral[5],
            "protocolFeeAmount": referral[6],
            "positionFeeReceiverFactor": referral[7],
            "feeReceiverAmount": referral[8],
            "feeAmountForPool": referral[9],
            "positionFeeAmountForPool": referral[10],
            "positionFeeAmount": referral[11],
            "totalCostAmountExcludingFunding": referral[12],
            "totalCostAmount": referral[13],
            "basePnlUsd": base_pnl_usd,
            "uncappedBasePnlUsd": uncapped_base_pnl_usd,
            "pnlAfterPriceImpactUsd": pnl_after_price_impact_usd,
            "percent_profit": (
                (
                    1 - (mark_price / entry_price)
                ) * leverage
            ) * -100,
            "market_symbol": (
                data_obj.markets.info[position[0][1]]['market_symbol'],
            ),
            "leverage": leverage,
            "collateral_token": chain_tokens[position[0][2]]['symbol'],
            "position_size": position[1][0] / 10**30,
            "size_in_tokens": position[1][1],
            "entry_price": (
                (
                    position[1][0] / position[1][1]
                ) / 10 ** (
                    30 - chain_tokens[
                        market_info['index_token_address']
                    ]['decimals']
                )
            ),
            "inital_collateral_amount": position[1][2],
            "inital_collateral_amount_usd": (
                position[1][2]
                / 10 ** chain_tokens[position[0][2]]['decimals'],
            ),
            "mark_price": mark_price
        }
        # print("\n", position_dict["position"]["numbers"]["sizeInUsd"])
        # print("\n basePnlUsd", position_dict["basePnlUsd"], " \n   uncappedBasePnlUsd", position_dict["uncappedBasePnlUsd"],
        #       "\n pnlAfterPriceImpactUsd", position_dict["pnlAfterPriceImpactUsd"], "\n")
        # result.append(position_dict)
        return(position_dict)
    # return result


def getData(config, wallet_address=None, market_address=None):
    
    data_obj._get_token_addresses(market_address)
    market_info = data_obj.markets.get_available_markets()[market_address]
    index_token_address = market_info["index_token_address"]
    output = [data_obj._get_oracle_prices(market_address,
                                          index_token_address,
                                          return_tuple=True)]
    hex_data = accountPositionListKey(wallet_address)
    
    
    datastore_obj = get_datastore_contract(config)

    position_keys = datastore_obj.functions.getBytes32ValuesAt(hex_data, 0, 1000).call()
    
    reader_obj = get_reader_contract(config)
    
    positions_dict = {}

    for i in range(len(position_keys)):      
        account_positions_list_raw = reader_obj.functions.getAccountPositionInfoList(
            "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8", "0xe6fab3F0c7199b0d34d7FbE83394fc0e0D06e99d", [position_keys[i]], output, wallet_address).call()

        account_positions_list = transform_to_dict(account_positions_list_raw)
        
        positions_dict[str(i)] = account_positions_list
    
    return positions_dict

# if __name__=="__main__":
    
app = FastAPI()

@app.get("/{wallet}")
def read_root(wallet):
    # wallet_address = "0x4210Ebe4d47F7a183a8FeF5A7aa64f8eD918Df83"
    wallet_address = wallet
    
    return getData(config, wallet_address, "0x47c031236e19d024b42f8AE6780E44A573170703")
