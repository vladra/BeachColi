$( document ).ready(function() {
  load_map();
});
map_style = [
  {
      "featureType": "water",
      "stylers": [
          {
              "color": "#46bcec"
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "landscape",
      "stylers": [
          {
              "color": "#f2f2f2"
          }
      ]
  },
  {
      "featureType": "road",
      "stylers": [
          {
              "saturation": -100
          },
          {
              "lightness": 45
          }
      ]
  },
  {
      "featureType": "road.highway",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#444444"
          }
      ]
  },
  {
      "featureType": "transit",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  }
];
function load_map() {
  var mapOptions = {
    center: new google.maps.LatLng(43.585563, -79.540732),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: map_style
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);
  var beaches_data = $('#beaches_data').data('beaches');
  beaches_data.forEach(function(beach) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(beach.lat,beach.long),
      map: map,
      title: beach.name,
      icon: {
        url: '/assets/icons/mehsmall.png'
      }
    });
    var infowindow = new google.maps.InfoWindow({
      content: "<h3 style='text-align:center'>"+beach.name+"</h3>"+
      "<p style='text-align:center'><u>Ecoli level</u>: <b>"+beach.ecoli+"</b></p>"+
      "<p style='text-align:center;'><u>Message</u>: "+ecoli_text(beach.ecoli)+"</p>"+
      "<p style='text-align:center'><a href=/beaches/"+beach.id+">Details</a></p>",
      maxWidth: 300
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  });
};

function ecoli_text(ecoli_level) {
  if(ecoli_level > 100){
    return "E.coli levels exceed the provincially established safety level of 100. Swim at your own risk"
  }else if(ecoli_level < 80){
    return "Beach meets provincially established safety standards for swimming"
  }else{
    return "Beach meets provincially established safety standards for swimming. However, the E.coli count is approaching dangerous levels"
  }
}
