const Twit = require('twit');

const T = new Twit( {
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token: process.env.twitter_access_token,
  access_token_secret: process.env.twitter_access_token_secret
} );

// default age for active cache entries
const cacheLifetime = '168 hours';

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

let counter = 0;

class TwitCache {

    /**
     * Ebay API Client
     * @param {string} token - Private token
     */
    constructor() {
		
    }
    
    getCache( command, options){
		return new Promise((resolve, reject) => {
		// query database for data based on key with date within lifetime
		const text = "SELECT command, options, data FROM twitapicache WHERE command = $1 AND options = $2 AND date_updated > now() - interval '"+cacheLifetime+"' ;";
		const values = [command, options];
		
		client.query(text, values)
				  .catch(e => reject(e.stack))
				  .then(res => resolve(res.rows[0]));
		});
	} // end getCache
    
    writeCache( command, options, data ){
		return new Promise((resolve, reject) => {
		const text = "WITH upsert AS (UPDATE twitapicache SET data = $3, date_updated = now() WHERE command = $1 AND options = $2 RETURNING *) INSERT INTO twitapicache ( command, options, data, date_created, date_updated ) SELECT $1, $2, $3, now(), now() WHERE NOT EXISTS (SELECT * FROM upsert);";
		const values = [ command, options, data ];
		
		client.query(text, values)
			  .catch(e => reject(e))
			  .then(res => resolve(res.rows[0]));
		});			  
	} // end writeCache
	
	recordAccount(data){
		// return new Promise((resolve, reject) => {
		const text = "WITH upsert AS (UPDATE account SET data = $3, date_updated = now() WHERE user_id = $1 RETURNING *) INSERT INTO account ( user_id, user_name, data, date_created, followers_count, friends_count, statuses_count, created_at, status_created_at ) SELECT $1, $2, $3, now(), $4, $5, $6, $7, $8 WHERE NOT EXISTS (SELECT * FROM upsert);";
		const values = [ data.id_str, data.screen_name, data, data.followers_count, data.friends_count, data.statuses_count, data.created_at, (data.status != undefined && data.status.created_at != undefined)?data.status.created_at:null ];
		
		client.query(text, values);
		//	  .then(res => resolve())
		//	  .catch(e => reject(e.stack));
		// });	
	} // end recordAccount
	
	recordSuggestion(data){
		return new Promise((resolve, reject) => {
		
		// console.log(data.screen_name);
		// console.log(data.id_str);
		// console.log(data.name);
		// console.log(data.slug);
		
		// const text = "WITH upsert AS (UPDATE suggestion SET screen_name = $1, date_updated = now() WHERE id_str = $2 AND slug = $3 RETURNING *) INSERT INTO suggestion ( screen_name, id_str, slug, name, date_created, date_updated ) SELECT $1, $2, $3, $4, now(), now() WHERE NOT EXISTS (SELECT * FROM upsert);";
		
		// const text = "INSERT INTO suggestion ( screen_name, id_str, slug, name, date_created, date_updated ) SELECT $1, $2, $3, $4, now(), now();";
		const text = "WITH upsert AS (UPDATE suggestion SET screen_name = $1, date_updated = now() WHERE id_str = $2 AND slug = $3 RETURNING *) INSERT INTO suggestion ( screen_name, id_str, slug, name, date_created, date_updated ) SELECT $1, $2, $3, $4, now(), now() WHERE NOT EXISTS (SELECT * FROM upsert);";
		const values = [ data.screen_name, data.id_str, data.slug,  data.name ];
		
		client.query(text, values)
			  .then(res => resolve())
			  .catch(e => reject(e.stack));
		 });	
	} // end recordAccount

        
    rateLimitStatus(){
		return new Promise((resolve, reject) => {    
		
			T.get('application/rate_limit_status', {})
			  .catch(function (err) {
			    console.log('caught error', err.stack)
			    reject(err);
			  }).then(function (result) {
			    // `result` is an Object with keys "data" and "resp".
			    // `data` and `resp` are the same objects as the ones passed
			    // to the callback.
			    // See https://github.com/ttezel/twit#tgetpath-params-callback
			    // for details.
			
			    resolve(result.data);
			  })     
		});
    } // end rateLimitStatus
    
    verifyCredentials(){
		return new Promise((resolve, reject) => {    
		
			T.get('account/verify_credentials', {})
			  .catch(function (err) {
			    console.log('caught error', err.stack)
			    reject(err);
			  }).then(function (result) {
			    // `result` is an Object with keys "data" and "resp".
			    // `data` and `resp` are the same objects as the ones passed
			    // to the callback.
			    // See https://github.com/ttezel/twit#tgetpath-params-callback
			    // for details.
			
			    resolve(result.data);
			  })			
		});
    } // end verifyCredentials
    
    retweet( tweet_id ){
		return new Promise((resolve, reject) => {    
		
			T.get('statuses/retweet/:id', { id: tweet_id })
			  .catch(function (err) {
			    console.log('caught error', err.stack)
			    reject(err);
			  }).then(function (result) {
			    // `result` is an Object with keys "data" and "resp".
			    // `data` and `resp` are the same objects as the ones passed
			    // to the callback.
			    // See https://github.com/ttezel/twit#tgetpath-params-callback
			    // for details.
			
			    resolve(result.data);
			  })			
		});
    } // end retweet
    
    suggestions( ){
		return new Promise((resolve, reject) => {  
			
			let result, command, options;		
			command = "users/suggestions";			
			options = { };
		
			T.get(command, options)
			  .catch(function (err) {
			    console.log('caught error', err.stack)
			    reject(err);
			  }).then(function (result) {
			    // `result` is an Object with keys "data" and "resp".
			    // `data` and `resp` are the same objects as the ones passed
			    // to the callback.
			    // See https://github.com/ttezel/twit#tgetpath-params-callback
			    // for details.
			
			    resolve(result.data);
			  })									
		});
    } // end suggestions

    
    suggestionsSlug( slug ){
		return new Promise((resolve, reject) => {  
		
			let result, command, options;		
			command = 'users/suggestions/:slug';			
			options = { slug: slug };
		
			T.get(command, options)
			  .catch(function (err) {
			    console.log('caught error', err.stack)
			    reject(err);
			  }).then(function (result) {
			    // `result` is an Object with keys "data" and "resp".
			    // `data` and `resp` are the same objects as the ones passed
			    // to the callback.
			    // See https://github.com/ttezel/twit#tgetpath-params-callback
			    // for details.
			
			    resolve(result.data);
			  })		  							
		});
    } // end suggestionsSlug
    
    suggestionsSlugMembers( slug ){
		return new Promise((resolve, reject) => {    
		  
			let result, command, options;		
			command = 'users/suggestions/:slug/members';			
			options = { slug: slug };
		
			T.get(command, options)
			  .catch(function (err) {
			    console.log('caught error', err.stack)
			    reject(err);
			  }).then(function (result) {
			    // `result` is an Object with keys "data" and "resp".
			    // `data` and `resp` are the same objects as the ones passed
			    // to the callback.
			    // See https://github.com/ttezel/twit#tgetpath-params-callback
			    // for details.
			
			    resolve(result.data);
			  })			
		});
    } // end suggestionsSlugMembers


    
    
    statusUpdate( status ){
		return new Promise((resolve, reject) => {    
		
			T.post('statuses/update', { status: status })
			  .catch(function (err) {
			    console.log('caught error', err.stack)
			    reject(err);
			  }).then(function (result) {
			    // `result` is an Object with keys "data" and "resp".
			    // `data` and `resp` are the same objects as the ones passed
			    // to the callback.
			    // See https://github.com/ttezel/twit#tgetpath-params-callback
			    // for details.
			
			    resolve(result.data);
			  })			
		});
    } // end statusUpdate
    
    
    followersIds( screen_name ){
		return new Promise((resolve, reject) => {  
			
			let result, command, options;
		
			command = 'followers/ids';
			
			options = { screen_name: screen_name, count: 200 };
			
			TC.getCache( command, options )
				.catch(function (err) {
				    console.log('caught error', err.stack)
				    reject(err);
				})
				.then(function(data){
					if( data == undefined ){
						console.log("CACHE MISS!!");
						wait(60000);
						T.get( command, options)
						  .catch(function (err) {
						    console.log('caught error', err.stack)
						    reject(err);
						  })
						  .then(function (result) {						  
							  TC.writeCache( command, options, result.data ).then(function(){
								resolve(result);  
							  });  							    
						  })
					
					}else{
						console.log("CACHE HIT!!");
						resolve(data);
					}										
				}) // end TC.getCache 									
		});
    } // end followersIds
    
    followerslist( screen_name, cursor ){
		return new Promise((resolve, reject) => {  
			
			let result, command, options;
		
			command = 'followers/list';
			
			options = { screen_name: screen_name, count: 200, cursor: cursor };
		
			TC.getCache( command, options )
				.catch(function (err) {
				    console.log('caught error', err.stack)
				    reject(err);
				})
				.then(function(data){
					
					if( data == undefined ){
						console.log("CACHE MISS!!");
						wait(60000);
						T.get( command, options)
						  .catch(function (err) {
						    console.log('caught error', err.stack)
						    reject(err);
						  }).then(function (result) {						  
							  TC.writeCache( command, options, result.data ).then(function(){
								resolve(result);  
							  });  							    
						  })					
					}else{
						console.log("CACHE HIT!!");
						resolve(data);
					}					
				}) // end TC.getCache 						
		});
    } // end followerslist
    
    friendsList( screen_name ){
		return new Promise((resolve, reject) => {    
		
			let result, command, options;
		
			command = 'friends/list';
			
			options = { screen_name: screen_name, count: 200 };
		
			TC.getCache( command, options )
				.catch(function (err) {
				    console.log('caught error', err.stack)
				    reject(err);
				})
				.then(function(data){
					
					if( data == undefined ){
						console.log("CACHE MISS!!");
						wait(60000);
						T.get( command, options)
						  .catch(function (err) {
						    console.log('caught error', err.stack)
						    reject(err);
						  }).then(function (result) {						  
							  TC.writeCache( command, options, result.data ).then(function(){
								resolve(result);  
							  });  							    
						  })
					
					}else{
						console.log("CACHE HIT!!");
						resolve(data);
					}									
				}) // end TC.getCache			
		});
    } // end friendsList
    
    friends( screen_name ){
		return new Promise((resolve, reject) => {    
		
			let result, command, options;
		
			command = 'friends/ids';
			
			options = { screen_name: screen_name, count: 200 };
		
			TC.getCache( command, options )
				.catch(function (err) {
				    console.log('caught error', err.stack)
				    reject(err);
				})
				.then(function(data){
					
					if( data == undefined ){
						console.log("CACHE MISS!!");
						wait(600000);
						T.get( command, options)
						  .catch(function (err) {
						    console.log('caught error', err.stack)
						    reject(err);
						  }).then(function (result) {						  
							  TC.writeCache( command, options, result.data ).then(function(){
								resolve(result);  
							  });  							    
						  })
					
					}else{
						console.log("CACHE HIT!!");
						resolve(data);
					}
					
					
				}) // end TC.getCache			
		});
    } // end friends
    
    friendshipsCreate( screen_name ){
		return new Promise((resolve, reject) => {    
		
			let result, command, options;
		
			command = 'friendships/create';
			
			options = { screen_name: screen_name, friendship: process.env.twitter_handle };
		
			TC.getCache( command, options )
				.catch(function (err) {
				    console.log('caught error', err.stack)
				    reject(err);
				})
				.then(function(data){
					
					if( data == undefined ){
						console.log("CACHE MISS!!");
						// wait(10000);
						T.post( command, options)
						  .catch(function (err) {
						    console.log('caught error', err.stack)
						    reject(err);
						  }).then(function (result) {						  
							  TC.writeCache( command, options, result.data ).then(function(){
								resolve(result.data);  
							  });  							    
						  })
					
					}else{
						console.log("CACHE HIT!!");
						resolve(data);
					}
					
					
				}) // end TC.getCache			
		});
    } // end friendshipsCreate
    
} // end class TwitCache

const TC = new TwitCache();


async function run(){

	await client.connect()
				.catch(function (err) {
				    console.log('caught error', err.stack)				    
				  })
	
	// output rate limits
	/*
	await TC.rateLimitStatus()
			.then(function(data){
				console.log(data);	
			})
			.catch(function (error) {
				console.log(error.message);
			});
	*/
	
	// Verify Credentials
	/*
	await TC.verifyCredentials()
			.then(function(data){
				console.log(data);	
			})
			.catch(function (error) {
				console.log(error.message);
			});

	*/
	
	// Retweet
	/*
	await TC.retweet("343360866131001345")
			.then(function(data){
				console.log(data);	
			})
			.catch(function (error) {
				console.log(error.message);
			});
	
	*/
	
	// Suggestion Categories
	
	/*
	await TC.suggestions()
		.then(function(data){
			console.log(data);	
		})
		.catch(function (error) {
			console.log(error.message);
		});
	*/
	
	/*
	
	[ { size: 31, slug: 'sports', name: 'Sports' },
  { size: 14, slug: 'entertainment', name: 'Entertainment' },
  { size: 15, slug: 'music', name: 'Music' },
  { size: 15, slug: 'digital-creators', name: 'Digital Creators' },
  { size: 15, slug: 'news', name: 'News' },
  { size: 15, slug: 'gaming', name: 'Gaming' },
  { size: 15, slug: 'government', name: 'Government' },
  { size: 13, slug: 'television', name: 'Television' },
  { size: 14, slug: 'funny', name: 'Funny' },
  { size: 14, slug: 'fashion', name: 'Fashion' },
  { size: 15, slug: 'food-drink', name: 'Food & Drink' },
  { size: 9, slug: 'family', name: 'Family' },
  { size: 9, slug: 'business', name: 'Business' },
  { size: 9, slug: 'books', name: 'Books' },
  { size: 12, slug: 'leaders', name: 'Leaders' },
  { size: 12, slug: 'influencers', name: 'Influencers' } ]
	
	*/
	
	// Suggestion List
	
	/*
	await TC.suggestionsSlug("sports")
		.then(function(data){
			console.log(data);	
		})
		.catch(function (error) {
			console.log(error.message);
		});
	*/
	
	// Suggestion Members
	
	/*
	await TC.suggestionsSlugMembers("sports")
		.then(function(data){
			console.log(data);	
		})
		.catch(function (error) {
			console.log(error.message);
		});
	*/

	
	// Post a Tweet
	/*
	await TC.statusUpdate("funny")
			.then(function(data){
				console.log(data);	
			})
			.catch(function (error) {
				console.log(error.message);
			});
	*/
	
	// Followers
	/*
	await TC.followers("BarackObama")
			.then(function(data){
				console.log(data);	
			})
			.catch(function (error) {
				console.log(error.message);
			});
	
	*/
	// Friends
	/*
	await TC.friends("BarackObama")
			.then(function(data){
				console.log(data);	
			})
			.catch(function (error) {
				console.log(error.message);
			});
	*/
	
	// for (var account of accounts ) {
	
	//	console.log(account);
		
		// friendshipsCreate
		/*
		await TC.friendshipsCreate(account)
				.then(function(data){
					// console.log(data);	
				})
				.catch(function (error) {
					console.log(error.message);
				});
		*/		
		
		/*				
		await TC.friendsList(account)
			.then(function(friends){
				if( friends.data != undefined ){
					for (var friend of friends.data.users ) {
						TC.recordAccount(friend);
						
					}
					console.log('Friends Added: '+friends.data.users.length);
				}								
			})
			.catch(function (error) {
				console.log(error.message);
			});
		*/
		
		/*	
		await TC.followerslist(account)
			.then(function(followers){
				if( followers.data != undefined ){
					for (var follower of followers.data.users ) {
						TC.recordAccount(follower);							
					}
					console.log('Followers Added: '+followers.data.users.length);
				}				
			})
			.catch(function (error) {
				console.log(error.message);
			});	
		*/	
				
	// }
	
	/*
	await TC.suggestions()
		.then(async function(data){
			// console.log(data);	
			for (var category of data ) {
				// let category;
				// category = data[1];
				// console.log(category.slug);
				
				// Suggestion Members
				
				await TC.suggestionsSlugMembers(category.slug)
					.then(async function(data){
						console.log("Category: " + category.name);
						// console.log(data);
						for (var account of data ) {
							account.slug = category.slug;
							account.name = category.name;
							await TC.recordSuggestion(account)
								.catch(function (error) {
									console.log(error);
								});							
							await TC.recordAccount(account);							
						}											
					})
					.catch(function (error) {
						console.log(error.message);
					});	
					
					wait(60000);			
			}
		})
		.catch(function (error) {
			console.log(error.message);
		});
	*/
	
	/*
	
	const text = "SELECT screen_name FROM suggestion;";
	const values = [];
		
	await client.query(text, values)
	      .catch(function (err) {
			    console.log('caught error', err.stack)
			    reject(err);
			  })	  
		.then(async function(result){
			// console.log(result.rows);
			for(let account of result.rows){
				console.log(account.screen_name);
				
				await TC.friendshipsCreate(account.screen_name)
				.then(function(data){
					// console.log(data);	
				})
				.catch(function (error) {
					console.log(error.message);
				});
			}
			
			
			
		})
	*/		  
	
	let account, cursor;
		
	// account = "amazon";
	
	account = process.env.twitter_account;
	
	cursor = -1;
	
	async function getFollowers(account, cursor){

		
		await TC.followerslist(account,cursor)
			  .catch(function (error) {
					console.log(error);
			  })
			  .then(async function(data){
					// console.log(data);
					if( data.data != undefined && data.data.users != undefined && data.data.users.length > 0 ){
						for (var follower of data.data.users ) {
							console.log(follower.screen_name);
							TC.recordAccount(follower);							
						}
						console.log('Followers Added: '+data.data.users.length);
						counter = counter + data.data.users.length;
					}	
					if( data.data != undefined && data.data.next_cursor_str != undefined && data.data.next_cursor_str != 0 ){
						cursor = data.data.next_cursor_str;
						console.log("Next Cursor: "+cursor);
						console.log("Accounts Added: "+counter);
						await getFollowers(account, cursor);					
					}
			  });
						
	};
	
	await getFollowers(account, cursor);
		
	await client.end();
	
	process.exit();
}

run();
		
		
			

// https://coderwall.com/p/rbfl6g/how-to-get-the-correct-unix-timestamp-from-any-date-in-javascript

Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   var seconds = ( ms / 1000 );
   var last = end;
   while(end < start + ms) {
   	 if( 0 == ( end % 1000 ) && last != end ){
	   	 console.log('Waiting: '+ ( --seconds )+' seconds');
   	 }
   	 last = end;
     end = new Date().getTime();
  }
}

