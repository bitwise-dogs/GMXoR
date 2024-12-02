const getOrderType = (typeNumber) => {
  switch (typeNumber) {
    case "0":
      return "Market Swap";
    case "1":
      return "Limit Swap";
    case "2":
      return "Market Increase";
    case "3":
      return "Limit Increase";
    case "4":
      return "Market Decrease";
    case "5":
      return "Take-Profit";
    case "6":
      return "Stop-Loss";
    case "7":
      return "Liquidation";
    case "8":
        return "Stop Increase"
  }
};

export default getOrderType;
