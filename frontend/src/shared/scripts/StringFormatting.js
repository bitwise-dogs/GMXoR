function formatRawPrice(input) {
  const inputUsd = input.slice(0, -30) + "." + input.slice(-30, -28);
  const [integerPart, decimalPart = ""] = inputUsd.split(".");

  // Форматируем целую часть с разделением тысяч
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Оставляем две цифры после точки
  const formattedDecimal = decimalPart.slice(0, 2).padEnd(2, "0");

  // Собираем результат
  return `$${formattedInteger}.${formattedDecimal}`;
}

function formatPnl(input) {
  const formattedPnl = input.replace(/^(\d+\.\d{0,2})\d*$/, "$1");
  return `${formattedPnl}%`;
}

function formatPrice(input) {
  const [integerPart, decimalPart = ""] = input.split(".");

  // Форматируем целую часть с разделением тысяч
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Оставляем две цифры после точки
  const formattedDecimal = decimalPart.slice(0, 2).padEnd(2, "0");

  // Собираем результат
  return `$${formattedInteger}.${formattedDecimal}`;
}
export { formatRawPrice, formatPnl, formatPrice };
