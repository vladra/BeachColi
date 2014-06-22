// $( document ).ready(function() {
//   load_map();
// });
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
  var beaches_data = $('#beaches_data').data('beaches');

  if(beaches_data.length > 1){
    var mapOptions = {
      center: new google.maps.LatLng(43.585563, -79.540732),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: map_style
    };
  }else{
    var lon = beaches_data[0].long;
    var lat = beaches_data[0].lat;
    var mapOptions = {
      center: new google.maps.LatLng(lat, lon),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: map_style,
      draggable: false
    };
  };

  var map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);

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

$( document ).ready(function() {
  var beach_this_summer = $('#beaches_this_summer').data('table-summer');
  var this_summer_dates = beach_this_summer.dates
  var this_summer_ecoli = beach_this_summer.ecoli

  var ctx = document.getElementById("myChart").getContext("2d");
  ctx.canvas.width = 1000;
  ctx.canvas.height = 300;
  var data = {
    labels : this_summer_dates,
    datasets : [
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : this_summer_ecoli
      }
    ]
  };
  function chart() {
    new Chart(ctx).Line(data);
  };
  chart();
  load_map();
});
