const getAveragePNL = (data, len) => {
  if (data) {
    let pnlSum = 0;

    for (let index = 0; index < len; index++) {
      pnlSum = pnlSum + parseFloat(data["data"][index]['percent_profit']);
    }

    let result = pnlSum / len;

    return result;
  }
};

export default getAveragePNL;
