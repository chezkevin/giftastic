var animals = ["dog","cat","arctic fox","turtle","red panda","tiger shark","pelican","owl","flying fish","pigeon"];

window.onload = function(){
    //click events
    giftastic.displayButtons();
    giftastic.switchGifs();
    giftastic.addAnimals();
    //giftastic.findAnimal();
};

var giftastic = {
	displayButtons: function(){
		$('.buttons').empty();
		// Loops through the array of animals
		for (var i = 0; i < animals.length; i++){
			// dynamically generates buttons for each animal in the array
		    var a = $('<button>');
		    a.addClass('btn btn-primary animal');
		    a.attr('data-name', animals[i]);
		    a.text(animals[i]);
		    $('.buttons').append(a);
		}
	},
	findAnimal: function(){
		var animalName = $(this).data('name');
		console.log(animalName);
		giftastic.buildGifs(animalName);
	},
	buildGifs: function(name){
		$('.gifs').text("");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $('<div>');
                animalDiv.addClass('animal-gif');
                
                var p = $('<p>');
                p.text('Rating: ' + results[i].rating);
                
                var animalImageSrc = results[i].images.fixed_height_still.url;
                var animalImage = $('<img />');
                animalImage.attr('src',animalImageSrc);
                animalImage.attr('data-state', 'still');
                animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                animalImage.attr('data-animate', results[i].images.fixed_height.url);

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $('.gifs').prepend(animalDiv);
            }
            giftastic.switchGifs();
        });        
	},
	switchGifs: function(clickData){
		$('img').on('click',function() {
			var newImgSrc;
			var dataState = $(this).attr('data-state');
			console.log('switching GIFs.');
			if (dataState === 'still'){
				var newImgSrc = $(this).data('animate');
				$(this).attr('data-state', 'animate');
				$(this).attr('src',newImgSrc);
			}
			if (dataState === 'animate'){
				var newImgSrc = $(this).data('still');
				$(this).attr('data-state', 'still');
				$(this).attr('src',newImgSrc);
			}
		});
	},
	addAnimals: function(){
		$('#add-animal').on('click', function(){
			var animal = $('#animal-input').val().trim();
			animals.push(animal);
			console.log(animals);
			giftastic.displayButtons();
			// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
			return false;
		});
	}
}

$(document).on('click', '.animal', giftastic.findAnimal);
