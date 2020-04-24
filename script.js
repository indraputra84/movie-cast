var pages = 1;

function searchMovie() {
	$('#movie-list').html('');
	$.ajax({
		url : 'https://omdbapi.com',
		type : 'get',
		dataType : 'JSON',
		data : {
			apikey : '8eeb747f',
			// s : $('#search-input').val(),
			s : $('#search-input').val(),
			page : pages,
		},
		success : function(result) {
			if (result.Response === "True") {
				let movies = result.Search;
				console.log(movies);

				$('#api-title').html(`
					<div class="col">
						<h1 class="text-center">`+$('#search-input').val()+`</h1>
						<h1 class="text-center">`+result.totalResults+`</h1>
					</div>
				`);

				$.each(movies,function(i,data) {
					$('#movie-list').append(`
						<div class="col-md-4 mb-3">	
							<div class="card">
							  <img src="`+ data.Poster +`" class="card-img-top" alt="...">
							  <div class="card-body">
							    <h5 class="card-title">`+data.Title+`</h5>
							    <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
							    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							    <a href="#" data-id="`+data.imdbID+`" data-toggle="modal" data-target="#exampleModal" class="card-link see-detail">See Detail</a>
							  </div>
							</div>
						</div>	
					`);
				});
			}

			else{
				console.log(result);
				$('#movie-list').html(`
					<div class="col">
						<h1 class="text-center">`+$('#search-input').val()+`</h1>
						<h1 class="text-center">`+result.Error+`</h1>
					</div>
				`);
			}

			
		}
	});
}

window.onload = function exampleFunction() { 
	console.log('The Script will load now.');
	$('#movie-list').html('');


	$.ajax({
		url : 'https://omdbapi.com',
		type : 'get',
		dataType : 'JSON',
		data : {
			apikey : '8eeb747f',
			// s : $('#search-input').val(),
			s : "batman",
			page : pages,
		},
		success : function(result) {
			if (result.Response === "True") {
				let movies = result.Search;
				console.log(movies);
				console.log(result);
				$('#api-title').html(`
					<div class="col">
						<h1 class="text-center">`+$('#search-input').val()+`</h1>
					</div>
				`);
				$.each(movies,function(i,data) {
					$('#movie-list').append(`
						<div class="col-md-4 mb-3">	
							<div class="card">
							  <img src="`+ data.Poster +`" class="card-img-top" alt="...">
							  <div class="card-body">
							    <h5 class="card-title">`+data.Title+`</h5>
							    <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
							    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							    <a href="#" class="card-link">See Detail</a>
							  </div>
							</div>
						</div>	
					`);
				});
			}

			else{
				console.log(result);
				$('#movie-list').html(`
					<div class="col">
						<h1 class="text-center">`+$('#search-input').val()+`</h1>
						<h1 class="text-center">`+result.Error+`</h1>
					</div>
				`);
			}

			
		}
	}); 
}

$("#search-button").on("click",function() {
	searchMovie();
});



$('#next').on("click",function() {
	pages ++;
	console.log(pages);
	searchMovie();
})

$('#search-input').on("keyup",function(e) {
	if (e.which == 13) {
		searchMovie();
	}
})

$('#previous').on("click",function() {
	pages --;
	console.log(pages);
	searchMovie();
})

$('#movie-list').on('click','.see-detail',function () {
	console.log($(this).data('id'));
	$.ajax({
		url : 'http://omdbapi.com',
		type : 'get',
		dataType : 'JSON',
		data : {
			apikey : '8eeb747f',
			// s : $('#search-input').val(),
			i : $(this).data('id'),
			page : pages,
		},
		success : function(movie) {
			if (movie.Response == "True") {
				$('#modal-body').html(`
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4">
								<img src="`+movie.Poster+`" class="img-fluid">
							</div>
							<div class="col-md-8">
								<ul class="list-group">
								  <li class="list-group-item"><h3>`+movie.Title+`</h3></li>
								</ul>
							</div>
						</div>
					</div>
				`)
			}
		}
	})
})