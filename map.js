function initMap(lat, lng) {
    var myLatLng = { lat: lat, lng: lng };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: myLatLng,
    });

    new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "The map of the selected country",
    });
}

function getPosition(countryName) {
    var request = new XMLHttpRequest();
    request.open("GET", `https://nominatim.openstreetmap.org/search?format=json&q=${countryName}`);
    request.send();

    request.addEventListener("load", function () {
        var response = JSON.parse(request.responseText);
        var lat = parseFloat(response[0].lat);
        var lon = parseFloat(response[0].lon);
        initMap(lat, lon);  
    });
}

document.getElementById("selectcountry").addEventListener("change", function () {
    var selectedCountry = this.value;
    getPosition(selectedCountry);  
    
});
