window.addEventListener('load', 
  () => {
    [].forEach.call(
        document.querySelectorAll('.delay_button'), 
        (el) => {
          el.addEventListener('click', sendAjaxRequest);
        });
  }
);

let sendAjaxRequest = (e) => {
  console.log(e);
  let request_type = e.target.dataset.req;
  let box = e.currentTarget.parentElement.querySelector('.box');
  let button = e.currentTarget;
  button.disabled = true;
  let url = '/send_delayed_response?delay=' + e.target.dataset.delay;
  fetch(url,
    { 
      method: request_type
    }).then(function(response) {
      return response.json();
    }).then ((data) => {
      console.log(data);
      console.log("Adding class  " + data.color);
      box.classList.add(data.color);
      console.log(box);
      setInterval(function () {
        box.classList.toggle(data.color);
        button.disabled = false;
      }, e.target.dataset.delay * 1000);
    });
}

