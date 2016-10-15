var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'AArLmhSIq6z7c5FM3GI0mpcMI',
  consumer_secret: '2KscIzHCEKSRVpUJPYOwvrh4GlfBhkiPho31G7W2EGlYUE1NFN',
  access_token_key: '787282221686099968-6lakPJVHZINTnMCliTzCLE5WdSD6sb2',
  access_token_secret: '8C9zUM0buVWYdSc1WBznwdEIVzzmiBYMjgR1hqMik5Z7X'
});
 
var params = {screen_name: 'amadecode'};
var one_way_following = [];
var users_to_display = [];

client.get('followers/ids', params, function(error, followers_result, response) {
	if (error) throw error;
	var followers = followers_result.ids;
	console.log("followers: ",followers.length);
	client.get('friends/ids', params, function(error, following_result, response) {
		if (error) throw error;
		var following = following_result.ids;
		console.log("following: ",following.length);
		following.forEach(function(person){
			//if someone you follow doesn't follow you
			if(followers.indexOf(person) === -1){
				one_way_following.push(person);
			}
		});

		//Only take the first hundred users
		one_way_following = one_way_following.slice(0,99);

		//Turn array into a string
		var one_way_following_string = one_way_following.join();
		console.log(one_way_following_string);

		client.get('users/lookup', {user_id: one_way_following_string}, function(error, users_result, response) {
			users_result.forEach(function(user){
				var userObject = {
					name: user.name,
					screen_name: user.screen_name,
					avatar: user.profile_image_url
				};

				users_to_display.push(userObject);
			});

			console.log(users_to_display);
		});			
	}); 
});


/*
client.get('followers/ids', params, function(error, users, response) {
  if (!error) {
    console.log(users.ids.length);
  }
});
*/

/*
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
*/

/*
	https://twitter.com/nodejs
	https://www.npmjs.com/package/twitter
	https://dev.twitter.com/rest/reference/get/followers/ids
*/