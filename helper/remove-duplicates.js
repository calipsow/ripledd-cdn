const removeDupStr = (array = []) => {
  const uniqueArray = array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return uniqueArray;
};
module.exports = removeDupStr;
