var crypto = require('crypto');

const generateNumber=()=>{
  // console.log("rand number",crypto.randomBytes(4).readUInt32BE(0, true))
        return crypto.randomBytes(4).readUInt32BE(0, true);
      
}

module.exports=generateNumber