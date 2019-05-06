var fs = require("fs");
var creds = require('./client_secret.json')
var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('1Wza7_z_51t9EsYeaNqEy0kah7Cpn9ypvwdUh1E5fihg');


class incident{
  constructor(arrest_key,arrest_date,pd_desc,ofns_desc,law_code,boro,death,perp_age_group,perp_sex,perp_race,Latitude,Longitude){
    this.arrest_key = arrest_key;
    this.arrest_date = arrest_date;
    this.pd_desc = pd_desc;
    this.ofns_desc = ofns_desc;
    this.law_code = law_code;
    this.boro = boro; //B K Q M S
    this.death = death;
    this.perp_age_group = perp_age_group;
    this.perp_sex = perp_sex;
    this.perp_race = perp_race;
    this.latitude = latitude;
    this.longitude = longitude;

}}

//get all rows so you can load the map
//search by incident id
//search by borough
//search by race
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



exports.getbyID = function(arrest_key, callback){
  var incident = {};
  var incidentlist = [];
    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
      console.log(rows[i].arrest_key.trim());
      console.log(arrest_key.trim());
        if(rows[i].arrest_key == arrest_key){
          incident = new incident(rows[i].arrest_key, rows[i].arrest_date, rows[i].pd_desc, rows[i].ofns_desc, rows[i].law_code, rows[i].boro, rows[i].death, rows[i].perp_age_group, rows[i].perp_sex, rows[i].perp_race, rows[i].latitude,rows[i].longitude);
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
          incident = new incident(rows[i].arrest_key, rows[i].arrest_date, rows[i].pd_desc, rows[i].ofns_desc, rows[i].law_code, rows[i].boro, rows[i].death, rows[i].perp_age_group, rows[i].perp_sex, rows[i].perp_race, rows[i].latitude,rows[i].longitude);
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



exports.getbyRace = function(race,callback){
  var incidentlist = [];
  var incident = {};

    exports.rows(function(rows){
    for(var i = 0; i <rows.length; i++){
    //  console.log(rows[i].boro.trim());
  //    console.log(borough.trim());
        if(rows[i].perp_race == race){
          incident = new incident(rows[i].arrest_key, rows[i].arrest_date, rows[i].pd_desc, rows[i].ofns_desc, rows[i].law_code, rows[i].boro, rows[i].death, rows[i].perp_age_group, rows[i].perp_sex, rows[i].perp_race, rows[i].latitude,rows[i].longitude);
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
          incident = new incident(rows[i].arrest_key, rows[i].arrest_date, rows[i].pd_desc, rows[i].ofns_desc, rows[i].law_code, rows[i].boro, rows[i].death, rows[i].perp_age_group, rows[i].perp_sex, rows[i].perp_race, rows[i].latitude,rows[i].longitude);
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
          incident = new incident(rows[i].arrest_key, rows[i].arrest_date, rows[i].pd_desc, rows[i].ofns_desc, rows[i].law_code, rows[i].boro, rows[i].death, rows[i].perp_age_group, rows[i].perp_sex, rows[i].perp_race, rows[i].latitude,rows[i].longitude);
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
