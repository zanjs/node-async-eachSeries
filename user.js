'use strict';

const BaseController = require('../../base');
const async = require('async');
var waitUntil = require('wait-until');
class UserController extends BaseController {
  async addOldUser() {
    const { ctx, service, app } = this;
    const param = await this.getApiParamCrypto();
    // console.log(param)
    const apicode = ctx.helper.getApiCode().USER.ADD;
    const user = param.user;
    // let contactList=param.contactList
    // let car=param.car
    const contactList = [
      {
        relation: '12',
        contact_name: '22',
        contact_phone: '22',
        contact_address: '22',
      },
      {
        relation: '111',
        contact_name: '11',
        contact_phone: '11',
        contact_address: '11',
      },
      {
        relation: '33',
        contact_name: '33',
        contact_phone: '33',
        contact_address: '33',
      },
    ];
    const car = {
      car_model: 'A6L',
      car_num: '8888888',
      register_time: '2016 12-12',
      push_time: '2017-12-12',
      car_code: '21S5X124S',
      engine_code: 'XCS11SX4',
      use_age: 2,
      user_long: 1200,
      nature: '抵押',
      car_color: '红色',
      demain: '没有',
    };
    // 判断必填项
    if (!user.name) return this.apiReturnBodyCrypto(apicode.NO_PARAM, '');
    if (!user.sex) return this.apiReturnBodyCrypto(apicode.NO_PARAM, '');
    if (!user.age) return this.apiReturnBodyCrypto(apicode.NO_PARAM, '');
    if (!user.job) return this.apiReturnBodyCrypto(apicode.NO_PARAM, '');
    if (!user.phone) return this.apiReturnBodyCrypto(apicode.NO_PARAM, '');
    if (!user.idcard) return this.apiReturnBodyCrypto(apicode.NO_PARAM, '');
    if (!user.address) return this.apiReturnBodyCrypto(apicode.NO_PARAM, '');
    if (!user.marriage) return this.apiReturnBodyCrypto(apicode.NO_PARAM, '');


    const uuid = ctx.helper.createUuid(32);

    user.user_id = uuid;
    car.user_id = uuid;
    const timeNow = ctx.helper.getTimeForNow();
    car.create_time = timeNow;
    car.update_time = timeNow;
    const strList = [];
    contactList.forEach(v => {

      strList.push(`('${uuid}','${v.relation}','${v.contact_address}','${v.contact_phone}','${v.contact_name}','${timeNow}','${timeNow}')`);
    });
    const num = strList.length;
    const contactStr = strList.join(',');
    const addResult = service.web.user.user.addUser(user);
    if (addResult) {
      let res1 = true;
      if (num && num > 0) {
        res1 = await service.web.user.userContact.addUserContactList(contactStr, num);
      }
      const res2 = await service.web.user.userCar.addUserCar(car);
      if (res1 == res1 == true) {
        return this.apiReturnBodyCrypto(apicode.SUCESS, '');
      }
      return this.apiReturnBodyCrypto(apicode.FAILD, '');

    }
    return this.apiReturnBodyCrypto(apicode.FAILD, '');


  }
  async testMatch() {
    console.log('OK');
    let ff = false;
    const { ctx, service, app } = this;
    const apicode = ctx.helper.getApiCode().USER.ADD;
    const param = await this.getApiParamCrypto();
    const testJSON = [
      {
        name: '王一',
        age: 10,
        sex: 'MAN',
      },
      {
        name: '王二',
        age: 20,
        sex: 'MAN',
      },
      {
        name: '王三',
        age: 30,
        sex: 'MAN',
      },
      {
        name: '王四',
        age: 40,
        sex: 'MAN',
      },
    ];


    async.eachSeries(testJSON, (data, callback) => {
      this.checkUser(data, str => {
        callback(str);
      });
    }, err => {

      if (err == '王三炸了') {
        console.log(1);
          ff=true

      } else {
        console.log(2);

      }
    });
    // console.log(2222222)
    // await this.sleep(500)
    // console.log(121212)
    return this.apiReturnBodyCrypto(apicode.FAILD, ff)
    
  }

  sleep(timeountMS){
    return new Promise((resolve) => {
      setTimeout(resolve, timeountMS);
  })
}
  async checkUser(data, cb) {
    const { ctx, service, app } = this;
    console.log(data);
    const user = await service.web.user.user.getUser();
    if (data.age >= 30) {
      cb('王三炸了');
    } else {
      cb(null);
    }

  }

}

module.exports = UserController;
