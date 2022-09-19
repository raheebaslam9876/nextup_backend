
var DateDiff = require('date-diff');


let DateDifference = async (serverTime, userTime) => {
   var date1 = new Date(serverTime).getTime(); // 2015-12-1
   var date2 = new Date(userTime).getTime();
   var diff = date1 - date2;
   return diff
}

module.exports = DateDifference