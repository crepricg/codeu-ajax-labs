// Event association.
let pageSetup = () => {
  console.log('setting up page');
  document.getElementById('sort_btn').addEventListener('click', sortSongs);
  document.getElementById('add_btn').addEventListener('click', addSong);
  document.getElementById('clear_btn').addEventListener('click', clearList);
}

// Clear the list, removing every song in it.
let clearList = () => {
}

// Add a new song based on the fields entered by the user.
let addSong = () => {
}

// Sorts songs based on seletor value.
let sortSongs = (e) => {
}

// Initial setup.
window.addEventListener('load', page_setup);
