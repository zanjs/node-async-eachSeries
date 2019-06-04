const async = require('async');
const util = require('util')

const testJSON = [
  {
    name: '王一',
    age: 10,
    sex: 'MAN',
  },
  {
    name: '王三',
    age: 31,
    sex: 'MAN',
  },
];

let ff = false;

async function fis() {

  // async.eachSeries(testJSON, (data, callback) => {
  //   checkUser(data, str => {
  //     callback(str);
  //   });
  // }, err => {
  //   console.log(err)
  // });

  const eachSeries = util.promisify(async.eachOfSeries)
  await eachSeries(testJSON, (data, callback) => {
    checkUser(data, str => {
      callback(str);
    });
  }, err => {
    console.log(err)
  });


  console.log(ff)

}

fis()

async function checkUser(str,cb) {
  const res = await asyncHttpClic(str)
  console.log(res)
  if (str.age > 30) {
    ff=true
    cb('王三炸了');
  } else {
    cb(null);
  }
}

function asyncHttpClic(str) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('foo:' + JSON.stringify(str));
    }, 1300);
  });
}