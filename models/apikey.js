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
  var generator= RandomNumberGenerator.Create();
      generator.GetBytes(key);

    user.key = Convert.ToBase64String(key);

    exports.addRow(1,user);
    console.log("new row has been added to csv");
    //return;
    callback(user);
}


exports.checkKey = function(user, callback){
  var r = {};
    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
      console.log(rows[i].key.trim());
      console.log(user.key.trim());
        if(rows[i].key == user.key && rows[i].mail == user.mail && rows[i].password == user.password){
          r = new user(user.mail,user.key);

        }
    }
     if(isEmpty(r)){
      console.log("keydoesnotexist");
      callback(null);
    }else
		 callback(r);
});
}


exports.updateUD = function(user,callback){
        exports.rows(function(rows){
            console.log(ou);
              for(var i = 0; i <rows.length; i++){ //check to see if this needs to be -1
                console.log(rows[i].name.trim())
                  if(rows[i].name.trim() == user.name && rows[i].password.trim() == user.password){
                    console.log("user found and updated");
                                rows[i].name = user.name;
                                rows[i].password = user.password;
                                rows[i].email = user.email;
                                rows[i].save();

                         if (callback) {
                             console.log("callback");
                            callback(user);
                        }

                  }
              }

      });
}
exports.updateUser = function(user,callback){
      var udata = Object.values(user);
      console.log(user.password);
      console.log("updating user csv with these values:" + udata);

      if(udata[4] == 0){
        console.log("adding a new row to the csv because its a new user");
        exports.addRow(1,user,function(){
          		 if (callback) {
          			callback();
          		}
                  console.log("new row has been added to csv");
                  //return;
          });
      }

      else{
          exports.rows(function(rows){
              for(var i = 0; i <rows.length; i++){ //check to see if this needs to be -1

                  if(rows[i].name.trim() == udata[0].trim() && rows[i].password.trim() == udata[7].trim()){
					console.log(rows[i]);
                    console.log("user found and updated");

                                rows[i].name = user.name;
                                rows[i].password = user.password;
                                rows[i].email = user.email];

					            rows[i].save();
				 if (callback) {
					callback();
				}

                  }
              }

      });
    }

}



exports.createUser = function(user,callback){
    exports.addRow(1,user);
    console.log("new row has been added to csv");
    //return;
    callback(user);
}
