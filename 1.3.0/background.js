var jsonOmay;
function getOmayResponse (url){
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send(null);
  var headers = req.getAllResponseHeaders().toLowerCase();
  console.log("Background: ", headers);
  return headers;
}