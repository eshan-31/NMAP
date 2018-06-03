
var client= 'IUYLCPXEUKUAZFY0Q0HME4VCKNFDW3P1PZRCY0W1WQSWOGYX'
var secret= 'NSDMOB5ZI2VFAAMEIJ1ICZWBWBK3PDI42LQGM1Y4E5C0II00'
var urlReq = "https://api.foursquare.com/v2/venues/search?client_id=" + client + "&client_secret=" + secret + "&v=20180604&ll=";
export const requestFoursqureApi = (lat, lng) =>
    fetch(urlReq + lat + "," + lng, {})
        .then(res => res.json())
        .then(data => data);
