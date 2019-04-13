$(document).ready(function () {
	var movies = ["Ironman", "Step Brothers", "The Other Guys", "Rambo", "John Wick", "I am Legend", "Hitch", "a night at the roxbury"];

	
	function renderButtons() {
		$("#moviebuttons").empty();
		for (i = 0; i < movies.length; i++) {
			$("#moviebuttons").append("<button class='btn btn-success' datamovie='" + movies[i] + "'>" + movies[i] + "</button>");
		}
	}

	renderButtons();

	
	$("#addmovie").on("click", function () {
		event.preventDefault();
		var movie = $("#movieinput").val().trim();
		movies.push(movie);
		renderButtons();
		return;
	});


	
	$("button").on("click", function () {
		var movie = $(this).attr("datamovie");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			movie + "&api_key=y3b4Pho0OvxCi7qTJwLqLFZhOYdaBrF6&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#movies").empty();
			for (var i = 0; i < results.length; i++) {
				var movieDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var movieImg = $("<img>");

				movieImg.attr("src", results[i].images.original_still.url);
				movieImg.attr("data-still", results[i].images.original_still.url);
				movieImg.attr("data-animate", results[i].images.original.url);
				movieImg.attr("data-state", "still");
				movieImg.attr("class", "gif");
				movieDiv.append(p);
				movieDiv.append(movieImg);
				$("#movies").append(movieDiv);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
    }
    
	$(document).on("click", ".gif", changeState);

});