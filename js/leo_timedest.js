var stops_count = 0;
var totaltimetaken=0;
var totalmiles=0;
var homeaddress;
var totalkm=0;
var stopfaresingle=0;
var totaldurr=0;
var markerBounds = new google.maps.LatLngBounds();
var geocoder = new google.maps.Geocoder();
var markers = new Array();
var directionsDisplay;
var directionsService;
var map;
var lats = '';
var lngs = '';
geocoder = new google.maps.Geocoder();
//var taxi_type;
var baby_count = 0;
var tootalfare=0;
var taxi_type_m;
var taxi_type_s;
var base_url=window.location.origin;
var dest = base_url+"/wp-content/plugins/leo-travel-distance-time-manager/img/dest.png";
var pick = base_url+"/wp-content/plugins/leo-travel-distance-time-manager/img/pick.png";
var stop = base_url+"/wp-content/plugins/leo-travel-distance-time-manager/img/stop.png";
count_markers = 0;
var waypoints = new Array();
var first_time = true;
function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
  directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({suppressMarkers: true});
    // code for google auto suggestion address for pick up location
    var input = document.getElementById('source');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    // code for Google auto suggestion address for destination location
    var drop = document.getElementById('destination');
    var drop_autocomplete = new google.maps.places.Autocomplete(drop);
    drop_autocomplete.bindTo('bounds', map);
}
google.maps.event.addDomListener(window, 'load', initialize);
function getstopaddress(id)
{  
    var input = document.getElementById(id);
    var autocomplete = new google.maps.places.Autocomplete(input);
}
function doCalculation()
{   
    totalmiles=0;
    totalkm=0;
    stopfaresingle=0;
	totaltimetaken=0;
	jQuery(".stopdiv").empty();
    jQuery('#po').empty();
    totaldurr=0;
    jQuery('.stops').each(function() {
    if(this.value=="")
    {
        jQuery(this).parent().get(0).remove();
            count = count - 1;
    }
});
    homeaddress = document.getElementById('source').value;
    var destination = document.getElementById('destination').value;
    if (homeaddress.trim() == '') {
        alert("Please Enter Pickup Address");
        return false;
    }
    if (destination.trim() == '') {
        alert("Please Enter Drop Off Address");
        return false;
    }
     else {
        sourceAddress();
    }
}
function sourceAddress() {
    clear();
    waypoints = new Array();
    var address = document.getElementById('source').value;
    var destination = document.getElementById('destination').value;
    geocoder.geocode({'address': address}, function(results, status) {
        console.log(results);
        if (status == google.maps.GeocoderStatus.OK) {
            var lat = document.getElementById("latitude").value = results[0].geometry.location.lat();
            var lng = document.getElementById("longitude").value = results[0].geometry.location.lng();
            var lng = document.getElementById("dest_latitude").value = results[0].geometry.location.lng();
            var lng = document.getElementById("dest_longitude").value = results[0].geometry.location.lng();
            var marker = new google.maps.Marker({
                map: map,
                icon: pick,
                position: results[0].geometry.location
            });
            markers[count_markers++] = marker;
            destinationAddress();
        }
        else {
            alert('Result was not successful for the following reason: ' + status);
        }
    });
}
function destinationAddress() {
    var source = document.getElementById("source").value;
    var address = document.getElementById('destination').value;
    if (address.trim() == '') {
        alert("Please Enter Drop Off Address");
        address = '';
        return false;
    }
    var st_cnt = 0;
    jQuery('.text').each(function() {
        geocoder.geocode({'address': this.value}, function(results, status) {
            console.log(results);
            if (status == google.maps.GeocoderStatus.OK) {
                var marker = new google.maps.Marker({
                    map: map,
                    icon: stop,
                    position: results[0].geometry.location
                });
                markers[count_markers++] = marker;
            }
            else {
                alert('Result was not successful for the following reason: ' + status);
            }
        });
        waypoints[st_cnt++] = {location: this.value, stopover: true};
    });
    var request = {
        origin: source,
        destination: address,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
    geocoder.geocode({'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var lat = document.getElementById("dest_latitude").value = results[0].geometry.location.lat();
            var lng = document.getElementById("dest_longitude").value = results[0].geometry.location.lng();
            var marker = new google.maps.Marker({
                map: map,
                icon: dest,
                position: results[0].geometry.location
            });
            markers[count_markers] = marker;
            var picLatLng = new google.maps.LatLng(jQuery('#latitude').val(), jQuery('#longitude').val());
            var dropLatLng = new google.maps.LatLng(jQuery('#dest_latitude').val(), jQuery('#dest_longitude').val());
            markerBounds.extend(picLatLng);
            markerBounds.extend(dropLatLng);
            map.fitBounds(markerBounds);
            calc();
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
//....
function calc() {
    var source = document.getElementById("source").value;
    //var stops_counts = document.getElementById("stops_count").value;
    var destination = document.getElementById("destination").value;
    // changes...
    var extratitles = document.getElementsByName('stopd');
    var mohisnids = document.getElementsByName('stopdiv');
  //  var mohisnids = document.getElementsByClass('stopdiv');
    //....changes
    if(extratitles.length!=0)
    {
            var str = '';
            var ids = ''
          for (var i = 0; i < extratitles.length; i++) { 
            if(ids=="")
            {
          str = extratitles.item(i).value;
          ids = mohisnids.item(i).id;
          }
          else
          {
             str = str + '|' + extratitles.item(i).value;
          //alert(mohisnids.item(i).id);
            ids = ids + '|' + mohisnids.item(i).id;
          }
        }
        var addresses=str.split('|');
        var allids=ids.split('|');
        for(var i=0; i<addresses.length;i++)
        {
            var singlid=allids[i];
            if(i==0)
            {
            var destdrop=addresses[i];
            farecalc(source,destdrop,singlid);
            }
            else
            {
                var j=i-1;
               source1=addresses[j];
               var destdrop=addresses[i];
               farecalc(source1,destdrop,singlid);
              
            }
        }
        var leng=addresses.length;
        leng=leng-1;
        farecalc(addresses[leng],destination,'stoplast')
    }
    else
    {
        farecalc(source,destination,'');
    }
}
function farecalc(source,destination,singlid)
{
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
            {
                origins: [source],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                avoidHighways: false,
                avoidTolls: false
            }, callback);
    function callback(response, status) {
        console.log(status);
        if (status == google.maps.DistanceMatrixStatus.OK) {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    if (element.status == "NOT_FOUND") {
                       //document.getElementById("source").value = '';
                        //alert("Please enter valid pickup address.");
                        //return 0;
                    }
                    if (element.status == "ZERO_RESULTS") {
                        //document.getElementById("destination").value = '';
                        //document.getElementById("source").value = '';
                        //alert("Please enter valid addresses.");
                        //return 0;
                    }
                    var distance = element.distance.text;
                    var duration = element.duration.text;
                    var m_distance = 0.00, mile_distance = 0.00, ft_distance = 0.00, km_distancetot = 0.00,km_distance = 0.00, cal_fare=0;
                    var distance_array = distance.split(" ");
                    distance_array[0] = distance_array[0].replace(/\,/g, ''); // 1125, but a string, so convert it to number
                    distance_array[0] = parseFloat(distance_array[0]);
                    if (distance_array[1] == 'm') {
                        m_distance = distance_array[0] / 1000;
                        mile_distance = parseFloat(m_distance) / 1.6;
                    } else if (distance_array[1] == 'ft') {
                        ft_distance = distance_array[0];
                        mile_distance = parseFloat(ft_distance) / 5280;
                    } else if (distance_array[1] == 'km') {
                        km_distance = parseFloat(distance_array[0]);
                        mile_distance = parseFloat(km_distance) / 1.6;
                    } else if (distance_array[1] == 'mi') {
                        mile_distance = distance_array[0];
                    }
                    dur_mins = 0;
                    var dur_array = duration.split(" ");
                    if (dur_array.length == 2) {
                        if (dur_array[1] == "mins") {
                            dur_mins = dur_array[0];
                        } else if (dur_array[1] == "hours" || dur_array[1] == "hour") {
                            dur_mins = parseFloat(dur_array[0]) * 60;
                        }
                    } else if (dur_array.length == 4) {
                        dur_mins = parseFloat(dur_array[2]);
                        dur_mins = dur_mins + parseFloat(dur_array[0]) * 60;
                    }
                    km_distancetot=parseFloat(km_distance).toFixed(2);
                    mile_distancetot=parseFloat(mile_distance).toFixed(2);
                    document.getElementById("distance").value =km_distancetot + ' Km';
                    document.getElementById("distancemile").value = mile_distancetot + ' Miles';
                    totaldurr=totaldurr + +dur_mins;
                     if(+dur_mins<60)
                    {
                      dur_mins =dur_mins +' min ';  
                    }
                    else
                    {
                    var totalhr=dur_mins/60;
                    totalhr=totalhr.toString();
                    var peace=totalhr.split(".");
                    totalhr=peace[0];
                    totalmin=dur_mins%60;
                    dur_mins = totalhr +' Hours '+ totalmin +' min ';
                    }
                    if(+totaldurr<60)
                    {
                      totaldurr2 =totaldurr +' min ';  
                    }
                    else
                    {
                    var totalhrs=totaldurr/60;
                    totalhrs=totalhrs.toString();
                    var peaceh=totalhrs.split(".");
                    totalhrs=peaceh[0];
                    totalminh=totaldurr%60;
                    totaldurr2 = totalhrs +' Hours '+ totalminh;
                    }
				    totalmiles=totalmiles + +km_distancetot;
                    totalkm = totalkm + +mile_distancetot;
                    document.getElementById("duration").value = dur_mins;                   
                    dsp();
                    jQuery("#"+singlid).append('<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="border: 1px solid #00BCD4;margin: 8px 0;"><div class="clearfix"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div><span class="fa fa-location-arrow icon"><span style="padding: 5px;font-size: 15px;">'+jQuery("#distancemile").val()+'</span>'+
																'</span>|<span class="fa fa-location-arrow icon" style=""><span style="padding: 5px;font-size: 15px;">'+jQuery("#distance").val()+'</span></span>|<span class="fa fa-clock-o icon"><span style="padding: 5px;font-size: 15px;">'+jQuery("#duration").val()+'</span></span></div></div></div><div><div><div style="width: 43%;    margin: 5px;height: 18px;overflow: hidden;float: left;text-align: center;"><span class="fa fa-map-marker icon">'+source+'</span></div>'+
															    '<div style="float: left">To</div><div style="margin: 5px;width: 43%;height: 18px;overflow: hidden;float: left;text-align: center;"><span class="fa fa-map-marker icon" style="">'+destination+'</span></div></div></div></div>');
                    jQuery("#stoplast").html('<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="border: 1px solid #00BCD4;margin: 8px 0;"><div class="clearfix"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div><span class="fa fa-location-arrow icon"><span style="padding: 5px;font-size: 15px;">'+jQuery("#distancemile").val()+'</span>'+
																'</span>|<span class="fa fa-location-arrow icon" style=""><span style="padding: 5px;font-size: 15px;">'+jQuery("#distance").val()+'</span></span>|<span class="fa fa-clock-o icon"><span style="padding: 5px;font-size: 15px;">'+jQuery("#duration").val()+'</span></span></div></div></div><div><div><div style="width: 43%;    margin: 5px;height: 18px;overflow: hidden;float: left;text-align: center;"><span class="fa fa-map-marker icon">'+source+'</span></div>'+
															    '<div style="float: left">To</div><div style="margin: 5px;width: 43%;height: 18px;overflow: hidden;float: left;text-align: center;"><span class="fa fa-map-marker icon" style="">'+destination+'</span></div></div></div></div>');
                   jQuery("#po").html('<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="border: 1px solid #00BCD4;    text-align: center;margin: 8px 0;padding: 5px;"><div class="clearfix"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><h4><span class="fa fa-location-arrow icon"><span style="padding: 5px;font-size: 15px;">'+totalkm+' Miles</span>'+
																'</span>|<span class="fa fa-location-arrow icon"><span style="padding: 5px;font-size: 15px;">'+totalmiles+' KM</span></span>|<span class="fa fa-clock-o icon"><span style="padding: 5px;font-size: 15px;">'+totaldurr2+' Minunts</span></span></h4></div></div><div><div><span class="fa fa-map-marker icon"><span style="padding: 5px;font-size: 15px;">'+homeaddress+'</span></span><div class="clearfix"></div>'+
															    '<span>To</span><div class="clearfix"></div><span class="fa fa-map-marker icon"><span style="padding: 5px;font-size: 15px;">'+destination+'</span></span></div></div></div>');  
                    jQuery("#tdistance").text(totalmiles+' KM');
                    jQuery("#tttime").text(totaldurr2);
                    jQuery("#summarydiv").css('display','block');
                }
            }
        }
    }
}
function clear() {
    map = new google.maps.Map(document.getElementById('googleMap'),
    {center: new google.maps.LatLng(40.7141667, -74.0063889), zoom: 10});
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({suppressMarkers: true});
    var input = document.getElementById('source');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    var drop = document.getElementById('destination');
    var drop_autocomplete = new google.maps.places.Autocomplete(drop);
    drop_autocomplete.bindTo('bounds', map);
}
drops_auto = [];
drops = [];
count = 0;
var database_phone;
function move(listBoxTo, optionValue, optionDisplayText) {
    var newOption = document.createElement("option");
    newOption.value = optionValue;
    newOption.text = optionDisplayText;
    listBoxTo.add(newOption, null);
    return true;
}
function dsp() {
    if (jQuery("#po").is(":hidden")) {
    }
    else {
        jQuery("#po").hide();
    }
    jQuery("#po").slideDown("slow", function() {
    });
}
function set_stops() {
    var baby = document.getElementById("stops");
    if (baby.checked) {
        document.getElementById("stops_count").value = 0;
        textInput = document.getElementById("stops_count").value;
    }
    else {
        document.getElementById("stops_count").value = '';
    }
}
var s = "";
var count = 0;
var id = 0;
function addcontrol() {
    if (count != 5) {
        count = count + 1;
        id = id + 1;
        divS = document.getElementById('stops_div');
        var text = document.createElement('div');
        text.id = 'mydiv' + id;
        text.innerHTML = "<div class='extra_stop' style='margin-top: 10px;'><div class='stopdiv' id='stopdiv" + id + "' name='stopdiv'></div><div class='input-group' style='text-align:center;margin:0 auto;'><input class='text' name='stopd' onclick='getstopaddress(this.id);'  placeholder='Type Stop Address' id='stop" + id + "' type='text'><span class='input-group-btn'><a herf='' class='stopx' onclick='remove_control(\"" + id + "\")'><button style='border-radius: 0px;'' class='btn btn-primary' type='button'>X</button></a></span></div></div>";
        divS.appendChild(text);
        drops[id] = document.getElementById('stop' + id);
        drops_auto[id] = new google.maps.places.Autocomplete(drops[id]);
        drops_auto[id].bindTo('bounds', map);
    }
}
function remove_control(e) {
    count = count - 1;
    var element = document.getElementById("mydiv" + e);
    element.parentNode.removeChild(element);
}
function clear_form_elements(ele) {
    clear();
    count=0;
    first_time = true;
    document.getElementById('source').value="";
    document.getElementById('destination').value="";
    jQuery(".extra_stop").remove();
    jQuery(".stops_result").remove();
    jQuery(".stopdiv").remove();
    jQuery(".stopx").remove();
     jQuery("#stoplast").html("");
    jQuery("#po").html("");
    jQuery("#po").hide();
    jQuery("#googleMap").hide();
    tags = ele.getElementsByTagName('input');
    for (i = 0; i < tags.length; i++) {
        switch (tags[i].type) {
            case 'password':
            case 'text':
                tags[i].value = '';
                break;
            case 'checkbox':
            case 'radio':
                tags[i].checked = false;
                break;
        }
    }
    document.getElementById("stops_div").value = "";
}
function checkTextField(field) {
    if (field.value == '') {
        alert("Field is empty");
    }
}