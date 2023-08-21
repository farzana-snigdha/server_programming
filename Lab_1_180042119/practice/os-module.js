// https://nodejs.org/api/os.html

const os = require("os");

console.log(os.userInfo());
console.log(os.platform());

const up = os.uptime();
console.log(up);

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};
console.log(currentOS);
