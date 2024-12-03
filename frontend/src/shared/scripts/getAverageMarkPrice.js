const getAverageMarkPrice = (data, len) => {
    if (data) {
      let markPriceSum = 0;
  
      for (let index = 0; index < len; index++) {
        markPriceSum = markPriceSum + parseFloat(data["data"][index]['mark_price']);
      }
  
      let result = markPriceSum / len;
  
      return result;
    }
  };
  
  export default getAverageMarkPrice;