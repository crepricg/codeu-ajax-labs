// Event association.
let pageSetup = () => {
  console.log('setting up page');
  document.getElementById('sort_btn').addEventListener('click', sortSongs);
}

// Sorts songs based on seletor value.
let sortSongs = (e) => {
}

// Initial setup.
window.addEventListener('load', page_setup);
