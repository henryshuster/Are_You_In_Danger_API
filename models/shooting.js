var fs = require("fs");
var creds = require('./client_secret.json')
var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('1Wza7_z_51t9EsYeaNqEy0kah7Cpn9ypvwdUh1E5fihg');


class incident{
  constructor(incident_key,occur_date,boro,death,perp_age_group,perp_sex,perp_race,vic_age_group,vic_sex,vic_race,Latitude,Longitude){
    this.incident_key = incident_key;
    this.occur_date = occur_date;
    this.boro = boro;
    this.death = death;
    this.perp_age_group = perp_age_group;
    this.perp_sex = perp_sex;
    this.perp_race = perp_race;
    this.vic_age_group = vic_age_group;
    this.vic_sex = vic_sex;
    this.vic_race = vic_race;
    this.latitude = latitude;
    this.longitude = longitude;

}}

//get all rows so you can load the map
//search by incident id
//search by borough
//search by death (if died or not)
//search by age group
//authenticate api key

// Authenticate with the Google Spreadsheets API.

exports.rows = function(callback){
  doc.useServiceAccountAuth(creds, function (err) {

    var rows = doc.getRows(1, function (err, rows) {

    //  console.log(rows);

   		if (callback) {
			callback(rows);
		}
    });

  });
}



exports.getbyID = function(incident_key, callback){
  var incident = {};
    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
      console.log(rows[i].incident_key.trim());
      console.log(incident_key.trim());
        if(rows[i].incident_key == incident_key){
          incident = new incident(rows[i].incident_key, rows[i].occur_date, rows[i].boro, rows[i].death, rows[i].perp_age_group, rows[i].perp_sex, rows[i].perp_race, rows[i].vic_age_group, rows[i].vic_sex, rows[i].vic_race,rows[i].latitude,rows[i].longitude);
          console.log("incident display test:" + incident);

        }
    }
     if(isEmpty(incident)){
      console.log("incident does not exist1");
      callback(null);
    }else
		 callback(incident);
});
}

exports.getbyBoro = function(borough, callback){
    var incidentlist = [];
    var incident = {};

    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
      console.log(rows[i].boro.trim());
      console.log(borough.trim());
        if(rows[i].boro == borough){
          incident = new incident(rows[i].incident_key, rows[i].occur_date, rows[i].boro, rows[i].death, rows[i].perp_age_group, rows[i].perp_sex, rows[i].perp_race, rows[i].vic_age_group, rows[i].vic_sex, rows[i].vic_race,rows[i].latitude,rows[i].longitude);
          console.log("incident display test:" + incident);
//cant use .push look into using object.entries
        }
    }
     if(isEmpty(incident)){
      console.log("incident does not exist1");
      callback(null);
    }else
		 callback(incident);
});
}



exports.getUsername = function(name,callback){
	var userExist;
	exports.rows(function(rows){

	  for(var i = 0; i <rows.length; i++){
       //   console.log("dddd" + rows[i].name.trim());
     //   console.log("ddddd" + name.trim());
		  if(rows[i].name.trim() == name.trim()){
      //        console.log("nametrim" + name.trim());
			userExist = name.trim();
		  }
	  }



	 if(isEmpty(userExist)){
      console.log("user does not exist");
      callback(null);

    }else
        callback(userExist);
    });
}

exports.getUsernamePassword = function(name,callback){
//  var user_file = fs.readFileSync('data/users.csv','utf8');
//  var rows = user_file.split('\n');
//  var rows = doc.getRows(1);
exports.rows(function(rows){
  var user = {};

  for(var i = 0; i <rows.length; i++){
      if(rows[i].name.trim() == name.trim()){
        user.name = name.trim();
        user.password = rows[i].password.trim();
      //  return(user);
      }
  }

  if(isEmpty(user)){
      console.log("user does not exist");
      callback(null);
  }else
    callback(user);
  });
}

exports.getUsernamePasswordFirstLast = function(name,callback){

exports.rows(function(rows){
  var user = {};

  for(var i = 0; i <rows.length; i++){
      if(rows[i].name.trim() == name.trim()){
        user.name = name.trim();
        user.password = rows[i].password.trim();
        user.accountcreate = rows[i].accountcreate;
        user.lastupdate = rows[i].lastupdate;
        if(!rows[i].firstname){
          user.firstName = "";
        }

        else{
          user.firstName = rows[i].firstname.trim();
        }

        if(!rows[i].lastname){
          user.lastName = "";
        }

        else{
          user.lastName = rows[i].lastname.trim();
        }
		 callback(user);
      }
  }

  if(isEmpty(user)){
      console.log("user does not exist");
      callback(null);
  }
  });
}

exports.updateUD = function(ou,user,callback){
        exports.rows(function(rows){
            console.log(ou);
              for(var i = 0; i <rows.length; i++){ //check to see if this needs to be -1
                console.log(rows[i].name.trim())
                console.log(ou.user);
                  if(rows[i].name.trim() == ou.name && rows[i].password.trim() == ou.password){
                    console.log("user found and updated");
                                rows[i].name = user.name;
                                rows[i].password = user.password;
                                rows[i].firstname = user.firstName;
                                rows[i].lastname = user.lastName;
					            rows[i].lastupdate = getTime();
                                user.lastupdate = getTime();
                                if(!rows[i].freq){
                                  rows[i].freq = 0;
                                }
                                rows[i].freq = JSON.parse(rows[i].freq)+1;
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
        user.accountcreate = getTime();
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

                                rows[i].name = udata[0];0
                                rows[i].paper = udata[1];
                                rows[i].scissor = udata[2];
                                rows[i].rock = udata[3];
                                rows[i].tg = udata[4];
                                rows[i].tl = udata[5];
                                rows[i].tw = udata[6];
                                rows[i].password = udata[7];
                                rows[i].firstname = udata[8];
                                rows[i].lastname = udata[9];
                                rows[i].lastupdate = getTime();
                                if(!rows[i].freq){
                                  rows[i].freq = 0;
                                }
                                rows[i].freq = JSON.parse(rows[i].freq)+1;
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


function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)){
      return false;
    }
  }
  return true;
}
function getTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}
