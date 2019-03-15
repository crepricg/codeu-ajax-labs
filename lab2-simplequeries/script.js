document.addEventListener('load')
  document.querySelector('.delay_button').click(sendAjaxRequest);
});

let sendAjaxRequest = (e) => {
  console.log('Send button clicked: ' + e);
}
