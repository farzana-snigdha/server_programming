var crypto = require("crypto");

const generateNumber = (id) => {
  let uniqueID=id.toString()
 // console.log(id)
  let num= crypto.createHash('md5').update(uniqueID).digest('hex');
  console.log("rand number",num)
  return num;
};

module.exports = generateNumber;
