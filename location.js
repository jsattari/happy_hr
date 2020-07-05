const mapped = document.getElementById('map');
const curr = document.getElementById('current');

function httpGet(theUrl) {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, true); // false for synchronous request
  xmlHttp.responseType = '';
  xmlHttp.send(null);
  xmlHttp.onload = function () {
    var data = JSON.parse(this.response)
    if (xmlHttp.status === 200) {

      for (let i = 0; i < data.searchResults.length; i++) {
        const container = document.createElement('inside');
        container.setAttribute('class', 'container');
        const p = document.createElement('p')
        p.textContent = `${data.searchResults[i].name + ' - ' + data.searchResults[i].fields.address + ', ' + data.searchResults[i].fields.city + ', ' + data.searchResults[i].fields.postal_code + ' - ' + data.searchResults[i].distance + ' miles away'}`;
        container.appendChild(p);
        mapped.appendChild(container);
      };
    };
  };
};

function httpCurrent(url) {

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, true); // false for synchronous request
  xmlHttp.responseType = '';
  xmlHttp.send(null);
  xmlHttp.onload = function () {
    var data = JSON.parse(this.response)
    if (xmlHttp.status === 200) {

      const container = document.createElement('inside');
      container.setAttribute('class', 'container');
      const p = document.createElement('p')

      var junk = JSON.parse(xmlHttp.response);
      var shinier = junk.results['0'].locations['0'];
      var street = shinier.street;
      var city = shinier.adminArea5;
      p.textContent = 'Location: ' + street + ', ' + city;
      container.appendChild(p);
      curr.appendChild(container);
    };
  };
};

function main() {
  const key = 'QjBE85QzuwMz0zbwcxl609zYM3BM3VA5';

  if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition(function(position){
    
      const url = 'http://www.mapquestapi.com/search/v2/radius?key=' + key + '&maxMatches=5&radius=5&units=m&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581303&origin='+ position.coords.latitude + ',' + position.coords.longitude + '&outFormat=json';
      
      const url2 = 'http://open.mapquestapi.com/geocoding/v1/reverse?key=' + key + '&location='+ position.coords.latitude + ',' + position.coords.longitude + '&outFormat=json';
      
      httpGet(url);
      httpCurrent(url2)
    });
  };
};

function clickHandler(e) {
  setTimeout(main, 1000);
};

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('button').addEventListener('click', clickHandler);
});