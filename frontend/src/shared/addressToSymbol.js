import { ethers } from "ethers";
import provider from "../provider";
import getMarket from "./getMarket";

const getTokenName = async (marketAddress) => {
  let abi = [
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const datastore = "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8";
  const market = await getMarket(datastore, marketAddress);

  const marketIndexToken = market[2];
  const contract = new ethers.Contract(marketIndexToken, abi, provider);
  const symbol = await contract.symbol();

  return symbol;
};

export default getTokenName;