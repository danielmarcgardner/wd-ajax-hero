(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
let button = document.querySelector('button');
let search = document.getElementById('search')

button.addEventListener('click', function() {
    event.preventDefault()
    if (search.value.length === 0) {
        throw new Error("Please enter a movie!")
    }
    else {
      fetch(`http://www.omdbapi.com/?s=${search.value}`)
          .then(function(res) {
            return res.json()
          })
          .then(function(movieJSON) {
            function movieClear(clear) {
              while (clear.length > 0) {
                clear.pop();
              }
              return clear;
            }
            movieClear(movies);
            class Omdb {
              constructor(id, poster, title, year) {
                this.id = id;
                this.poster = poster;
                this.title = title;
                this.year = year;
              }
            }
            for (var i = 0; i < movieJSON.Search.length; i++) {
              let omdb = new Omdb(movieJSON.Search[i].imdbID, movieJSON.Search[i].Poster, movieJSON.Search[i].Title, movieJSON.Search[i].Year);
              movies.push(omdb)
            }
            renderMovies()
          })
    }
})

})();
