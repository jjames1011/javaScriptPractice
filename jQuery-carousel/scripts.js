//Create an XMLHTTP Request object
var xhr = new XMLHttpRequest();
//Create the callback function
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4) {
    docuement.getElementById('ajax').innerHTML = xhr.responseText;
  }
};
//Open a request
xhr.open('GET', 'sidebar.html');
//send the request
xhr.send();
