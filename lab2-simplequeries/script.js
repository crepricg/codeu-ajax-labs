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
}

let cancelTimer = (e) => {
  console.log('Handling Event Stop');
}

window.addEventListener('load', pageSetup);
