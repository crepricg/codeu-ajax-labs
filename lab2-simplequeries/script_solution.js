// This object hold the pointers to the functions started by "setInterval".
// Having this pointers allows us to stop them when we want.
let running_intervals = {};

// Initial setup for the buttons.
let pageSetup =  () => {
  [].forEach.call(
       document.querySelectorAll('.delay_button'), 
      (el) => {
        el.addEventListener('click', sendAjaxRequest);
      });
  [].forEach.call(
       document.querySelectorAll('.stop_button'), 
      (el) => {
        el.addEventListener('click', cancelTimer);
      });

}

// Sends a request to the server, to receive a new color.
let sendAjaxRequest = (e) => {
  console.log('Handling Event Send');
  // "dataset" is a collection of all properties starting with data- in the
  // HTML tag.
  let request_type = e.target.dataset.req;
  let request_delay = e.target.dataset.delay * 1000;

  let box = e.currentTarget.parentElement.querySelector('.box');
  // It's a good idea to disable the button during the request so we don't
  // risk the user clicking more than once concurrently.
  let button = e.currentTarget;
  button.disabled = true;

  // Forming the request now. If GET the parameters go in the URL, if POST
  // They are added in the body of the request.
  let url = 'http://boxes.codeu-ajax-labs.appspot.com/send_delayed_response';
  let request_init = {};
  if (request_type == 'get') {
    url += '?delay=' + request_delay;
  } else if (request_type == 'post') {
    // There are many formats for the data in a post request, our server
    // expect the same format a regular HTML form would produce.
    let formdata = new FormData();
    formdata.append('delay', request_delay);
    request_init['body'] = formdata;
  } else {
    console.log('Only GET and POST are supported');
  }
  request_init['method'] = request_type;
  request = new Request(url, request_init);

  // We execute the request now.
  fetch(request).then(
    // When the request receive a response, we parse it, knowing that the
    // result is stored in a JSON object (this we know from the API
    // documentation).
    (response) => {
      return response.json();
    }
  ).then (
    // When the conversion to JSON is complete, analyze the reply and
    // start the flashing.
    (data) => {
      console.log(data);
      if (data.request_type !== request_type) {
        // This is a check to make sure that your request used the correct
        // method as specified in the request_type var.
        console.log("Error, request type mismatch");
      }
      box.classList.add(data.color);
      // Start the blinking.
      let handler = setInterval(function () {
        box.classList.toggle(data.color);
      }, request_delay);
      // We store the handler under a unique key identifying this box, so we
      // can retrieve it later when the user clicks on STOP.
      let key = request_type + " " + request_delay;
      running_intervals[key] = handler;
      // Execution is complete, let's re-enable the button that we disabled
      // when we started the execution.
      button.disabled = false;
    });
}

let cancelTimer = (e) => {
  console.log('Handling Event Stop');
  // We need to build the KEY exactly like we did when we stored the
  // setInterval handler.
  let delay_btn = e.currentTarget.parentElement.querySelector('.delay_button');
  let request_type = delay_btn.dataset.req;
  let request_delay = delay_btn.dataset.delay * 1000;
  let key = request_type + " " + request_delay;
  // We can stop the periodic function now.
  clearInterval(running_intervals[key]);
  // Let's also remove any additional class and restore the original state of
  // the box.
  let box = e.currentTarget.parentElement.querySelector('.box');
  box.classList = ['box'];
}

window.addEventListener('load', pageSetup); 
