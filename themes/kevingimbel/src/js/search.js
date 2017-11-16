'use strict';
// Wait for DOM load
document.addEventListener('DOMContentLoaded', function() {

  // Select the search box, this is where the user types in words
  // and the result container
  var searchBox = document.querySelector('#search');
  var output = document.querySelector('#results');
  // initialize an empty searchData variable
  var searchData = null;
  // create an empty response set for "not found" - shown if nothing matches
  var emptySet = [{"title": "Nothing found!", "content": "", "permalink": "/archive/", "date": ""}];

  // Load the JSON on page load with `fetch`. This will return a Promise which we
  // then use to get the JSON data into the `searchData` variable
  (function(window, document) {
    fetch('/search/index.json').then(function (response) {
      return response.json();
    }).then(function(data) {
      searchData = data.splice(0, data.length - 1);
    });
  }(window, document));

  // `debounce` is used to delay the execution of functions so that we do not trigger
  // a search too often. Instead we delay it a bit.
  function debounce(func, wait, immediate) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };

  // THIS IS IT. This function implements the "stupid" search. It just tries to match
  // for a lowercase word in either the `title` or `content` field and on match
  // returns the dataset.
  function findPosts(searchString) {
    var term = searchString.toLowerCase();
    return searchData.filter( function(data) {
      return data.title.indexOf(term) > -1 || data.content.indexOf(term) > -1;
    });
  }

  // doSearch is triggered from the event and will execute the findPosts function
  // when something is written in the input field
  var doSearch = debounce(function(e) {
    var term = e.target.value;
    var data;

    // If nothing is written into the input, I display the empty set ("Nothing found!")
    if(term == "" || term.length == 0) {
      data = emptySet;
    } else {
      data = findPosts(term);
    }
    // Whatever is in `data` will be passed to the `renderResults` function
   renderResults(data);
  }, 200);

  // renderResults takes an data array and renders each element to the page
  function renderResults(data) {
    // first, we clear the output
    output.innerHTML = null;
    // if we got an empty set, set `data` to the empty "Nothing found" set.
    if(data.length == 0) {
      data = emptySet
    }

    // Loop through the array and create `li` elements for each item
    data.map(function(set) {
      var liNode = document.createElement('li');
      var linkNode = document.createElement('a');
      var dateNode = document.createElement('span');

      linkNode.href = set.permalink;
      linkNode.textContent = set.title;
      dateNode.textContent = set.date;

      liNode.classList.add('search__item');
      dateNode.classList.add('search__item-date');
      liNode.appendChild(linkNode);
      liNode.appendChild(dateNode);
      output.appendChild(liNode);
    });
  }
  // Listen for keyup events on the search input.
  searchBox.addEventListener('keyup', doSearch);
});
