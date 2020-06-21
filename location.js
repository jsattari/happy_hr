// var button = document.getElementById("location-button");
//var x = document.getElementById('drop_loc');

function httpGet(theUrl) {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
  xmlHttp.responseType = '';
  xmlHttp.onload = function () {
    if (xmlHttp.readyState === xmlHttp.DONE) {
        if (xmlHttp.status === 200) {
          var junk = xmlHttp.response;
          var shiny = JSON.parse(junk);
          var shinier = shiny.results['0'].locations['0'];
          var street = shinier.street;
          var city = shinier.adminArea5;
          document.getElementById('map').innerHTML = 'Location: ' + street + ', ' + city;
        };
      };
    };
    xmlHttp.send(null);
};

function main() {
const key = 'QjBE85QzuwMz0zbwcxl609zYM3BM3VA5';

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    // console.log(position);
    
    const url = 'http://open.mapquestapi.com/geocoding/v1/reverse?key=' + key + '&location='+ position.coords.latitude + ',' + position.coords.longitude + '&outFormat=json';
    
    console.log(httpGet(url));
  });
};
};

function clickHandler(e) {
  setTimeout(main, 1000);
};

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('button').addEventListener('click', clickHandler);
});