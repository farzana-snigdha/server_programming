var crypto = require("crypto");

const generateNumber = () => {
  let num=crypto.randomBytes(4).toString('hex')
  console.log("rand number",num)
  return num;
};

module.exports = generateNumber;
