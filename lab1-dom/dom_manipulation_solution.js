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
  document.getElementById('add_btn').addEventListener('click', addSong);
  document.getElementById('clear_btn').addEventListener('click', clearList);
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

let addSong = () => {
  // Create a new list item using data from the form.
  let song_title = document.querySelector("#new_song_title").value;
  let song_position = document.querySelector("#new_song_pos").value;
  let song_artist= document.querySelector("#new_song_artist").value;
  let new_song_list_item = document.createElement("li");
  new_song_list_item.innerHTML =
      buildListItemHtml(song_position, song_artist, song_title);
  // Attach the new element to the existing list;
  let dom_list_element = document.querySelector('#billboard');
  dom_list_element.appendChild(new_song_list_item);
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
  let sorting_direction_inverse =
    document.querySelector('#chk_inverse').checked;
  // Array.sort() sorts the aray in place, but in our case it needs a dedicated
  // sorting function, since we're not simply sorting the <li> items
  // alphabeticallly
  songs_array.sort((first, second) => {
    return compareSongs(first, second, sorting_params[sorting_criterion],
                        sorting_direction_inverse);
  });
  clearList();
  rebuildList(songs_array);
  let sorted_description =
    sorting_params[sorting_criterion].message;
  document.querySelector('#sorted_desc').innerText = sorted_description;
}

// After clearing the list, we use the sorted array to rebuild it in the right
// order.
let rebuildList = (new_list) => {
  let dom_list_element = document.querySelector('#billboard');
  new_list.forEach((element) => {
    dom_list_element.appendChild(element);
  });
}

// This is the function that sort() uses to compare songs based on the selected
// criterion.
let compareSongs = (first, second, criterion, inverse) => {
  let first_field = first.querySelector(criterion.selector).innerText;
  let second_field = second.querySelector(criterion.selector).innerText;
  if (criterion.numeric) {
    return (first_field - second_field) * (inverse ? -1 : 1);
  }
  if (first_field === second_field) {
    return 0;
  } else if (first_field < second_field) {
    return inverse ? 1 : -1;
  } else {
    return inverse ? -1 : 1;
  }
}

// Initial setup.
window.addEventListener('load', pageSetup);
