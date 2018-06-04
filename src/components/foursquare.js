// client id and secret key generated from Fouresquare
var client = 'IUYLCPXEUKUAZFY0Q0HME4VCKNFDW3P1PZRCY0W1WQSWOGYX'
var secret = 'NSDMOB5ZI2VFAAMEIJ1ICZWBWBK3PDI42LQGM1Y4E5C0II00'

//to get the venue details
var urlReq = "https://api.foursquare.com/v2/venues/search?client_id=" + client + "&client_secret=" + secret + "&v=20180604&ll=";
export const requestFoursqureApi = (lat, lng) =>
    fetch(urlReq + lat + "," + lng, {})
    .then(res => res.json()).catch(function(err) {
        alert("Fouresquare content not available");
        window.location.reload();
    }) //if there is error in fethcing the promise
    .then(data => data).catch(function(err) {
        alert("Fouresquare content not available");
        window.location.reload();
    });
