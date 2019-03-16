// Dictionary to map selector value and sorting criteria.
const sorting_params = {
  'by_pos' : {
    selector: '.billboard_pos',
    numeric: true,
    message: 'Sorted by billboard position',
  },
  'by_artist' : {
    selector: '.artist',
    numeric: false,
    message: 'Sorted by billboard artist',
  },
  'by_song' : {
    selector: '.song',
    numeric: false,
    message: 'Sorted by song title',
  }
}

// Event association.
let pageSetup = () => {
  console.log('setting up page');
  document.getElementById('sort_btn').addEventListener('click', sortSongs);
}

// Sorts songs based on seletor value.
let sortSongs = (e) => {
  console.log('Sort Button CLicked');
  // querySelectorAll gives us a NodeList, which is like an array,
  // but does not have some of the array functions, like forEach() or sort()
  let songs_node_list = document.querySelectorAll('#billboard > li');
  // So we are going to convert it to an Array.
  let songs_array = [].slice.call(songs_node_list);
  // Based on the selection by the user, let's find the sorting parameters.
  let sorting_criterion =
    document.querySelector('#sort_selector').selectedOptions[0].value;
  // Array.sort() sorts the aray in place, but in our case it needs a dedicated
  // sorting function, since we're not simply sorting the <li> items
  // alphabeticallly
  songs_array.sort((first, second) => {
    return compareSongs(first, second, sorting_params[sorting_criterion]);
  });
  clearList();
  rebuildList(songs_array);
  let sorted_description =
    sorting_params[sorting_criterion].message;
  document.querySelector('#sorted_desc').innerText = sorted_description;
}

// Removes all elements from the LI
let clearList = () => {
  document.querySelector('#billboard').innerHTML = '';
}

// This is not the best way to build an HTML element in JS, but given the small
// size of it, we can create an HTML string. Ideally, we would use
// createElement() and appendChild() as demonstrated below.
let buildListItemHtml = (pos, artist, song) => {
  return '<span class="billboard_pos">' + pos + '</span> - ' + 
         '<span class="artist">' + artist + '</span> - ' + 
         '<span class="song">' + song + '</span>';
}

// After clearing the list, we use the sorted array to rebuild it in the right
// order.
let rebuildList = (new_list) => {
  let list = document.querySelector('#billboard');
  new_list.forEach((element) => {
    // Extract the fields for the song.
    let song_pos =
      element.querySelector(sorting_params['by_pos'].selector).innerText;
    let artist =
      element.querySelector(sorting_params['by_artist'].selector).innerText;
    let song =
      element.querySelector(sorting_params['by_song'].selector).innerText;
    // Create a new LI item.
    let new_item =
      document.createElement('li');
    // Fill the HTML inside the LI element.
    new_item.innerHTML =
      buildListItemHtml(song_pos, artist, song);
    // Add the element to the List.
    list.appendChild(new_item);
  });
}

// This is the function that sort() uses to compare songs based on the selected
// criterion.
let compareSongs = (first, second, criterion) => {
  let first_field = first.querySelector(criterion.selector).innerText;
  let second_field = second.querySelector(criterion.selector).innerText;
  if (criterion.numeric) {
    return first_field - second_field;
  }
  if (first_field === second_field) {
    return 0;
  } else if (first_field < second_field) {
    return -1;
  } else {
    return 1;
  }
}

// Initial setup.
window.addEventListener('load', pageSetup);
