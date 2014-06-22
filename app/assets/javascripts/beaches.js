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

var images = ['/assets/icons/frown.png','/assets/icons/mehsmall.png','/assets/icons/smile.png']

function load_map() {
  var beaches_data = $('#beaches_data').data('beaches');

  if(beaches_data.length > 1){
    var mapOptions = {
      center: new google.maps.LatLng(43.585563, -79.540732),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: map_style,
      scrollwheel: false
    };
  }else{
    var lon = beaches_data[0].long;
    var lat = beaches_data[0].lat;
    var mapOptions = {
      center: new google.maps.LatLng(lat, lon),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: map_style,
      draggable: false,
      scrollwheel: false
    };
  };

  var map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);

  var prev;

  beaches_data.forEach(function(beach) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(beach.lat,beach.long),
      map: map,
      title: beach.name,
      icon: ''
    });
    if (beach.ecoli > 100) {
      marker.icon = images[0]
    } else if (beach.ecoli < 80) {
      marker.icon = images[2]
    } else {
      marker.icon = images[1]
    }

    console.log(marker.icon);
    var infowindow = new google.maps.InfoWindow({
      content: "<h3 style='text-align:center'>"+beach.name+"</h3>"+
      "<p style='text-align:center'><u>Ecoli level</u>: <b>"+beach.ecoli+"</b></p>"+
      "<p style='text-align:center;'><u>Message</u>: "+ecoli_text(beach.ecoli)+"</p>"+
      "<p style='text-align:center'><a href=/beaches/"+beach.id+">Details</a></p>",
      maxWidth: 300
    });
    google.maps.event.addListener(marker, 'click', function() {
      if (prev) {
        prev.setMap(null);
      }
      infowindow.open(map,marker);
      prev = infowindow;
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
  // CHART THIS SUMMER
  // insert this to html to show table -> <canvas id="chart_this_summer"></canvas>
  var beach_this_summer = $('#beaches_this_summer').data('table-summer');
  // CHART LAST SUMMER
  // insert this to html to show table -> <canvas id="chart_last_summer"></canvas>
  var beach_last_summer = $('#beaches_last_summer').data('table-summer');
  if (beach_this_summer) {
      var this_summer_dates = beach_this_summer.dates;
      var this_summer_ecoli = beach_this_summer.ecoli;
      var ctx = document.getElementById("chart_this_summer").getContext("2d");
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
      function chart_this_summer() {
        new Chart(ctx).Line(data);
    };
    chart_this_summer();
  }
  if (beach_last_summer) {
    var last_summer_dates = beach_last_summer.dates;
    var last_summer_ecoli = beach_last_summer.ecoli;
    var ctx = document.getElementById("chart_last_summer").getContext("2d");

    var data = {
      labels : last_summer_dates,
      datasets : [
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : last_summer_ecoli
        }
      ]
    };
    function chart_last_summer() {
      new Chart(ctx).Line(data);
    };
    chart_last_summer();
  }

  load_map();
});










