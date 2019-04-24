var fs = require("fs");
var creds = require('./client_secret.json')
var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('1Wza7_z_51t9EsYeaNqEy0kah7Cpn9ypvwdUh1E5fihg');


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
