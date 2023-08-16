$(".search-button").on("click", function () {
  $.ajax({
    url: "https://www.omdbapi.com/?apikey=dca61bcc&s=" + $(".input-keyword").val(),
    success: (result) => {
      const movie = result.Search;
      let card = "";
      movie.forEach((element) => {
        card += showCard(element);
      });
      $(".movie-container").html(card);

      // ketika tombol detail diklik
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url: "https://www.omdbapi.com/?apikey=dca61bcc&i=" + $(this).data("imdbid"),
          success: (element) => {
            const movieDetail = showModal(element);
            $(".modal-body").html(movieDetail);
          },
        });
      });
    },
  });
});

function showCard(element) {
  return `<div class="col-md-3 my-3 mx=2">
                <div class="card">
                    <img src="${element.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${element.Title}</h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">${element.Year}</h6>
                      <a href="#" class="btn btn-primary modal-detail-button btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid="${element.imdbID}">Details</a>
                    </div>
                  </div>
            </div>`;
}

function showModal(element) {
  return `<div class="row">
                <div class="col-md-5">
                    <img src="${element.Poster}" alt="">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item">${element.Title} (${element.Year})</li>
                        <li class="list-group-item">Director : ${element.Director}</li>
                        <li class="list-group-item">Writer : ${element.Writer}</li>
                        <li class="list-group-item">Actor: ${element.Actors}</li>
                        <li class="list-group-item">Genre : ${element.Genre}</li>
                        <li class="list-group-item">Duration : ${element.Runtime}</li>
                        <li class="list-group-item">Country: ${element.Country}</li>
                        <li class="list-group-item">Languange : ${element.Languange}</li>
                        <li class="list-group-item">Rating : ${element.imdbRating}</li>
                        <li class="list-group-item">Total Season : ${element.totalSeasons}</li>
                      </ul>
                </div>
              </div>
              <div class="row">
              <div class="col mt-3">
                  <h5>Description :</h5>
                  <p>${element.Plot}</p>
              </div>
              </div>`;
}
