export function formatNumber(
  num: number,
  maxDecimal: number = 8,
  thousandSeparator: boolean = true,
): string {
  if (isNaN(num)) return "-";
  if (num === 0) return "0";
  const rounded = Number(num.toFixed(maxDecimal)).toString();
  const [integerPart, decimalPart] = rounded.split(".");
  const formattedInteger = thousandSeparator
    ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : integerPart;
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}
