const convertType = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  const number = parseFloat(value);
  return isNaN(number) ? value : number;
};

function cookieStrToObj(string = "") {
  const obj = {};
  const pairs = string.split(";");

  for (const pair of pairs) {
    const [key, value] = pair.split("=").map((part) => part.trim());
    if (!key || value === undefined) {
      console.log("Got invalid key-value pair", pair);
      continue;
    }
    obj[key] = convertType(value);
  }

  return obj;
}

module.exports = cookieStrToObj;
