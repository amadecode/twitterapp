var Twitter = require('twitter');

module.exports = function(res, screen_name) {
	var client = new Twitter({
	  consumer_key: '',
	  consumer_secret: '',
	  access_token_key: '',
	  access_token_secret: ''
	});
	 
	var params = {screen_name: screen_name};
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

				// console.log(users_to_display);
				res.render('list',{users: users_to_display});
			});			
		}); 
	});	
}


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