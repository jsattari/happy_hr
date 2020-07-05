// const cli = '36ILiza7g0juyp2mb5PzwA'
const key = 'bFmfZ54Nt_Zuj_tI_RLPxGDpBv4IyzZd4ibHqM45tiqF0Farkqe4_QijjFnByX_iuR19V98RihzB8SlB3egX2Sb2KNU3T7Jz_edWMRsb7gT1vi6OyF3utN-7597vXnYx'

function httpGet(theUrl) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + key)
    xmlHttp.responseType = '';
    xmlHttp.onload = function () {
      if (xmlHttp.readyState === xmlHttp.DONE) {
          if (xmlHttp.status === 200) {
            var junk = xmlHttp.response;
            var shiny = JSON.parse(junk);
            console.log(shiny)
            //document.getElementById('map').innerHTML = 'Location: ' + street + ', ' + city;
          };
        };
      };
      xmlHttp.send(null);
  };
  
  function main() {
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      // console.log(position);
      
      const url = 'https://api.yelp.com/v3/businesses/search?term=happy%20hour' + '&latitude='+ position.coords.latitude + '&longitude=' + position.coords.longitude + '&radius=5';
      
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