import readerContract from "../contracts/readerContract";

const getMarket = async (datastore, marketAddress) => {
  const market = await readerContract.getMarket(datastore, marketAddress);

  return market;
};

export default getMarket;
