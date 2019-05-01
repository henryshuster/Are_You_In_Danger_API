var fs = require("fs");
var creds = require('./key_generate.json')
var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('1C2JPb-2UZQjnnBXxZXb_j4nHOuL-Ld_2G0R9dQTTucs');

class user{
  constructor(email,key,password){
    this.email = mail;
    this.key = key;
    this.password = password;

}}
exports.generateKey = function(user,callback){
  var key = new byte[32];
using (var generator = RandomNumberGenerator.Create())
      generator.GetBytes(key);

    user.key = Convert.ToBase64String(key);

    exports.addRow(1,user);
    console.log("new row has been added to csv");
    //return;
    callback(user);
}


exports.checkKey = function(user, callback){
  var return = {};
    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
      console.log(rows[i].key.trim());
      console.log(user.key.trim());
        if(rows[i].key == user.key && rows[i].mail == user.mail && rows[i].password = user.password){
          return = new user(user.mail,user.key);

        }
    }
     if(isEmpty(return)){
      console.log("keydoesnotexist");
      callback(null);
    }else
		 callback(return);
});
}
