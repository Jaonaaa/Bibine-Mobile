export const PriceParser = (price: string | number | undefined) => {
  let response: string = "";
  price = `${price}`;
  let counter: number = 0;
  for (let i = price.length - 1; i >= 0; i--) {
    response = price[i] + response;
    counter++;
    if (counter % 3 === 0) {
      response = " " + response;
    }
  }
  return response.trim().replace(" ", ".");
};

export default PriceParser;

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getNumberPrice = (min: number, max: number) => {
  let StNumber = PriceParser(getRandomNumber(min, max).toString());
  let part = StNumber.split(".");
  let first = part.shift();
  let total = "";

  if (part.length > 0) {
    total = part.reduce((acc, part) => acc + part);
    total = total
      .split(" ")
      .map(() => "000")
      .reduce((acc, part) => acc + part);
  }
  let res = first + "" + total;
  return PriceParser(res).replace(" ", ".");
};

export const capitalizeFirstLetter = (text: string) => {
  if (text && typeof text === "string") {
    return text.charAt(0).toUpperCase() + text.slice(1);
  } else {
    return text;
  }
};
