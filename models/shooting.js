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
//search by victim gender or perp gender
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
  var incidentlist = [];
    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
      console.log(rows[i].incident_key.trim());
      console.log(incident_key.trim());
        if(rows[i].incident_key == incident_key){
          incident = new incident(rows[i].incident_key, rows[i].occur_date, rows[i].boro, rows[i].death, rows[i].perp_age_group, rows[i].perp_sex, rows[i].perp_race, rows[i].vic_age_group, rows[i].vic_sex, rows[i].vic_race,rows[i].latitude,rows[i].longitude);
          console.log("incident display test:" + incident);
          incidentlist.push(Object.entries(incident));
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
          incidentlist.push(Object.entries(incident));
        }
    }
     if(isEmpty(incident)){
      console.log("incident does not exist1");
      callback(null);
    }else
		 callback(incidentlist);
});
}



exports.getbyDeath = function(yesno,callback){
  var incidentlist = [];
  var incident = {};

    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
      console.log(rows[i].boro.trim());
      console.log(borough.trim());
        if(rows[i].death == yesno){
          incident = new incident(rows[i].incident_key, rows[i].occur_date, rows[i].boro, rows[i].death, rows[i].perp_age_group, rows[i].perp_sex, rows[i].perp_race, rows[i].vic_age_group, rows[i].vic_sex, rows[i].vic_race,rows[i].latitude,rows[i].longitude);
          console.log("incident display test:" + incident);
    //cant use .push look into using object.entries
            incidentlist.push(Object.entries(incident));
        }
    }
     if(isEmpty(incident)){
      console.log("incident does not exist1");
      callback(null);
    }else
     callback(incidentlist);
    });
}

exports.vicGender = function(gender ,callback){
  var incidentlist = [];
  var incident = {};

    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
    //  console.log(rows[i].boro.trim());
    //  console.log(borough.trim());
        if(rows[i].vic_sex == agegroup){
          incident = new incident(rows[i].incident_key, rows[i].occur_date, rows[i].boro, rows[i].death, rows[i].perp_age_group, rows[i].perp_sex, rows[i].perp_race, rows[i].vic_age_group, rows[i].vic_sex, rows[i].vic_race,rows[i].latitude,rows[i].longitude);
          console.log("incident display test:" + incident);
    //cant use .push look into using object.entries
          incidentlist.push(Object.entries(incident));
        }
    }
     if(isEmpty(incident)){
      console.log("incident does not exist1");
      callback(null);
    }else
     callback(incidentlist);
    });
}

exports.perpGender = function(gender ,callback){
  var incidentlist = [];
  var incident = {};

    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
    //  console.log(rows[i].boro.trim());
    //  console.log(borough.trim());
        if(rows[i].perp_sex == agegroup){
          incident = new incident(rows[i].incident_key, rows[i].occur_date, rows[i].boro, rows[i].death, rows[i].perp_age_group, rows[i].perp_sex, rows[i].perp_race, rows[i].vic_age_group, rows[i].vic_sex, rows[i].vic_race,rows[i].latitude,rows[i].longitude);
          console.log("incident display test:" + incident);
    //cant use .push look into using object.entries
          incidentlist.push(Object.entries(incident));
        }
    }
     if(isEmpty(incident)){
      console.log("incident does not exist1");
      callback(null);
    }else
     callback(incidentlist);
    });
}


function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)){
      return false;
    }
  }
  return true;
}
