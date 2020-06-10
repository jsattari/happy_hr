// var button = document.getElementById("location-button");
// var x = document.getElementById("drop_loc");

$('#location-button').click(function(){
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        $.get("http://open.mapquestapi.com/geocoding/v1/reverse?key=QjBE85QzuwMz0zbwcxl609zYM3BM3VA5&location="+ position.coords.latitude + "," + position.coords.longitude +"&includeRoadMetadata=true&includeNearestIntersection=true", function(data) {
          console.log(data);
        })
        var img = new Image();
        img.src = "http://open.mapquestapi.com/geocoding/v1/reverse?key=QjBE85QzuwMz0zbwcxl609zYM3BM3VA5&location=" + position.coords.latitude + "," + position.coords.longitude + "&includeRoadMetadata=true&includeNearestIntersection=true&thumbMaps=true";
        $('#drop_loc').html(img);
      });
  }
});