/**
 * REST API : representational state transfer
 * how the internet work
 * 1/ http : hyper text transfer protocol : it sends a get request to the server and receive back a response (html file) ==> web protocol
 *
 */

//XMLHttpRequest
const request = new XMLHttpRequest();
request.open("GET", "https://jsonplaceholder.typicode.com/users");
request.send();
request.onload = () => {
  if (request.status === 200) {
    console.log("using XMLHttpRequest", JSON.parse(request.response));
  } else {
    console.log(request);
    console.log(`error ${request.status}`);
  }
};

//fetch api
//first approach
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log("using fetch simple promise", json);
  });

//second approach
async function getUsers() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let data = await response.json();
  return data;
}

getUsers().then((response) => {
  console.log("using fetch with async", response);
});

//axios = third party js library
//first step is to link axios (import) in the html file so it will be installed globaly on my project then :

axios.get("https://jsonplaceholder.typicode.com/users").then(
  (response) => {
    console.log("using axios", response.data);
  },
  (err) => {
    console.log(err);
  }
);

//jQuery

$(document).ready(function () {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    type: "GET",
    success: function (result) {
      console.log("using jQuery", result);
    },
    error: function (err) {
      console.log(err);
    },
  });
});
