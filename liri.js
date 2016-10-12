// var twitterKeys = require('./keys.js').twitterKeys;
var Twitter = require('twitter');
var keys = require('./keys.js');

var fs = require('fs');
var imdb = require("request");

var Spotify = require('spotify');
var arg2 = process.argv[2];
var arg3 = process.argv[3];
var arg4 = process.argv[4];

//*********************************************

// At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.

/*

// console.log(client);
console.log(client.twitterKeys.consumer_key);
console.log(client.twitterKeys.consumer_secret);
console.log(client.twitterKeys.access_token_key);
console.log(client.twitterKeys.access_token_secret);
*/

//*********************************************

// Make it so liri.js can take in one of the following commands:


if (arg2 == 'my-tweets')
	{twitter();}

else if(arg2 == 'spotify-this-song'){
	
	if(process.argv[4]!==undefined){
		var arg3 = arg3 + " " + arg4;
		spotifyThis(arg3);
	}

	else if(process.argv[4]==undefined){
		spotifyThis(arg3);
	};

} // End else if spotify-this-song statement


else if(arg2 == 'movie-this'){
	
	if(process.argv[4]!==undefined){
		var arg3 = arg3 + " " + arg4;
		omdb(arg3);
	}

	else{omdb(arg3);}
}

else if (arg2 == 'do-what-it-says')
	{dowhatitsays();}




//*********************************************
//*********************************************
//*********************************************

// What Each Command Should Do

// node liri.js my-tweets

// This will show your last 20 tweets and when they were created at in your terminal/bash window.


function twitter(){

var params = {screen_name: '@MichaelFKogan',
				count: 20};

var client = new Twitter ({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret

	});

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	console.log("------------------------------------------------");
  	for(var x=0;x<tweets.length;x++){
  	console.log(tweets[x].text);}
  	console.log("------------------------------------------------");
  }
});
} // End twitter function


//*********************************************
//*********************************************
//*********************************************

/*
node liri.js spotify-this-song '<song name here>'

This will show the following information about the song in your terminal/bash window

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
if no song is provided then your program will default to

"The Sign" by Ace of Base
*/

function spotifyThis(passedTrack){

if(passedTrack == undefined){

Spotify.search({ type: 'track', query: 'I saw the sign'}, function(err, data) {
    
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
		var spotifyData = data.tracks.items[0];
		var artist = spotifyData.artists[0].name;
		var nameOfSong = spotifyData.name;
		var previewUrl = spotifyData.preview_url;
		var album = spotifyData.album.name;

		console.log("------------------------------------------------");
		console.log("ARTIST: " + artist);
		console.log("NAME OF SONG: " + nameOfSong);
		console.log("PREVIEW URL: " + previewUrl);
		console.log("ALBUM: " + album);
		console.log("------------------------------------------------");

	}); //End Spotify.search
}// End if(passedTrack)


else if(passedTrack !== undefined){

Spotify.search({type: 'track', query: passedTrack}, function(err, data){
		if ( err ) {console.log('Error occurred: ' + err);
        return;
	}
		var spotifyData = data.tracks.items[0];
		var artist = spotifyData.artists[0].name;
		var nameOfSong = spotifyData.name;
		var previewUrl = spotifyData.preview_url;
		var album = spotifyData.album.name;

		console.log("------------------------------------------------");
		console.log("ARTIST: " + artist);
		console.log("NAME OF SONG: " + nameOfSong);
		console.log("PREVIEW URL: " + previewUrl);
		console.log("ALBUM: " + album);
		console.log("------------------------------------------------");

	
	}); //End Spotify.search
}// End if(passedTrack)

} // End spotifyThis

//*********************************************
//*********************************************
//*********************************************
/*

node liri.js movie-this '<movie name here>'

This will output the following information to your terminal/bash window:

Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.
Rotten Tomatoes Rating.
Rotten Tomatoes URL.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
It's on Netflix!
*/

function omdb(title){

	if(title==undefined)
		{title='Mr. Nobody'}
	
	imdb('http://www.omdbapi.com/?type=movie&t='+title+'  &y=&plot=short&r=json&tomatoes=true&', function(err,response,body){

		if(err) {
			return console.log('Error while getting data from omdb ' +err);
		}
		body = JSON.parse(body);
		console.log("------------------------------------------------");
		console.log('Title: ' + body.Title);
		console.log('Year: ' + body.Year);
		console.log('Rated: ' + body.Rated);
		console.log('Plot: ' + body.Plot);
		console.log('Actors: ' + body.Actors);
		console.log('Language: ' + body.Language);
		console.log('Country: ' + body.Country);
		console.log('Rotten Tomatoes Rating: ' + body.tomatoRating);
		console.log('Rotten Tomatoes URL: ' + body.tomatoURL);
		console.log("------------------------------------------------");
		 // console.log(body);
	});//End imdb function

} //End OMDB Function

/*
//*********************************************
//*********************************************
//*********************************************

node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

Feel free to change the text in that document to test out the feature for other commands.
*/

function dowhatitsays(){

	fs.readFile("random.txt", "utf8", function(error, data){
	
		if(error){
			console.log(error);
		}

	else if(data.split(',')[0] == 'spotify-this-song'){
			
			arg3 = data.split(',')[1]
			spotifyThis(arg3);
			}

	});//Close readfile

}//Close dowhatitsays

/*
//*********************************************
//*********************************************
//*********************************************

BONUS
In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.

Make sure you append each command you run to the log.txt file.

Do not overwrite your file each time you run a command.

//*********************************************
//*********************************************
//*********************************************

One More Thing

If you have any questions about this project or about the material we covered, the instructor and your TAs are only a Slack message away.
*/