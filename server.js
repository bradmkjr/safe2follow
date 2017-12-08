/*!
 * Safe2Follow
 *
 * Copyright(c) 2017 Bradford Knowlton
 * MIT Licensed
 *
 * Version 1.1.5
 */

// 'use strict';

const { Client } = require('pg');
const client = new Client();

const Twit = require('twit');

const T = new Twit( {
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token: process.env.twitter_access_token,
  access_token_secret: process.env.twitter_access_token_secret
} );

// default age for active cache entries
const cacheLifetime = '168 hours';


async function run(){

	await client.connect();
	
	const text = "SELECT user_name FROM account OFFSET floor( random() * ( SELECT reltuples FROM pg_class WHERE relname = 'account' ) ) LIMIT 1;";
	
	const values = [];
	
	const res = await client.query(text, values);	

	if( res == undefined ){
		console.log('Fail');
	}else{
		console.log(res.rows[0].user_name);
		
		// do stuff
		
		
	}

	await client.end();
	
}

run();


// define the class
var Rating = function() {
  this.screen_name = '';
  this.data = {};
  this.result = {};
  
  this.conception_timestamp = '';
  
  this.now = new Date().getUnixTime();
  	
};

Rating.prototype.init = function(data){

	this.data = data;
	
	this.screen_name = this.data.screen_name;
		  	
	console.log();
	console.log('Screenname: '+this.screen_name);
	console.log();
	// console.log(this.data);
	// console.log();
			
	return this;
}

Rating.prototype.output = function(){
	
	console.log();
	console.log(this.result);
	console.log();
	
	return this;

}

Rating.prototype.ghost = function(){

	this.ghost = {};
	
	// Load into Result from Data
	this.ghost.created_at = this.data.created_at;
	
	this.ghost.timestamp = new Date( this.ghost.created_at ).getUnixTime();
	
	if( this.data.status != undefined ){
		
		// Load into Result from Data
		this.ghost.status = {};
		this.ghost.status.created_at = this.data.status.created_at;
		this.ghost.status.timestamp = new Date( this.ghost.status.created_at ).getUnixTime();	
		this.ghost.active_lifetime = Math.max( ( this.ghost.status.timestamp - this.ghost.timestamp ), 0);
		this.ghost.last_active = Math.max( ( ( this.now ) - ( this.ghost.status.timestamp ) ), 0);
			
	}else{
		// never tweeted		
		this.ghost.active_lifetime = 0;		
	}
	
	this.ghost.profile_percentage = 1;
	if(this.data.default_profile_image){
		this.ghost.profile_percentage += .25;	
	}
	
	this.ghost.account_age =  Math.max( (this.now - this.ghost.timestamp), 0);	
	this.ghost.age_percentage = (this.now - this.ghost.timestamp )/(this.now - this.conception_timestamp);
	this.ghost.active_percentage = 1 - ( this.ghost.active_lifetime / ( this.ghost.account_age ) );
	this.ghost.tweet_percentage =  1 - ( this.data.statuses_count / max_statuses_count );
	this.ghost.ghost_percentage = Math.min( this.ghost.active_percentage * 
											this.ghost.age_percentage * 
											this.ghost.profile_percentage * 
											this.ghost.tweet_percentage, 1 );
	
	console.log('Ghost Rating: '+ Math.round(this.ghost.ghost_percentage * 10000)/100+'%' );

	this.result.ghost = this.ghost.ghost_percentage;
	
	return this;
}

Rating.prototype.virgin = function(){

	this.virgin = {};
	
	this.virgin.created_at = this.data.created_at;
	
	this.virgin.timestamp = new Date( this.ghost.created_at ).getUnixTime();
	
	this.virgin.age_percentage = 1 - ((this.now - this.virgin.timestamp )/(this.now - this.conception_timestamp));
	
	if( this.data.status != undefined ){
		
		// Load into Result from Data
		this.virgin.status_created_at = this.data.status.created_at;
		this.virgin.status_timestamp = new Date( this.virgin.status_created_at ).getUnixTime();	
		
		this.virgin.active_percentage = 1 - ( ( this.virgin.status_timestamp - this.virgin.timestamp )/(this.now - this.virgin.timestamp) );
			
	}else{
		// never tweeted		
		this.virgin.active_lifetime = 1;		
	}
		
	this.virgin.virgin_percentage = this.virgin.age_percentage * this.virgin.active_percentage;
	
	// console.log(this.virgin);
	
	console.log('Virgin Rating: '+ Math.round(this.virgin.virgin_percentage * 10000)/100+'%' );
	
	this.result.virgin = this.virgin.virgin_percentage;
	
	return this;
}


Rating.prototype.celebrity = function(){

	this.celebrity = {};
	
	// 1 if verified 0 if not
	this.celebrity.verified_percentage = (this.data.verified)?1:.5;
	
	this.celebrity.friends_count = this.data.friends_count;
	
	this.celebrity.followers_count = this.data.followers_count;
	
	// ratio of friends to followers
	this.celebrity.friend_to_follower_percentage =  Math.max( ( 1 - ( this.data.friends_count / this.data.followers_count ) ), 0);	
	
	// percentages of followers compared to max
	this.celebrity.followers_percent = (3/4) + ( this.celebrity.followers_count / max_followers_count )/4;

	// results of all factors
	this.celebrity.celebrity_percentage = this.celebrity.verified_percentage * this.celebrity.friend_to_follower_percentage * this.celebrity.followers_percent;

	console.log('Celebrity Rating: '+ Math.round(this.celebrity.celebrity_percentage * 10000)/100+'%' );
	
	// console.log(this.celebrity);
	
	this.result.celebrity = this.celebrity.celebrity_percentage;
	
	return this;
}

Rating.prototype.status = function(){

	var unqiue_word_list = new Array;

	for(i=0;i<status_data.length;i++){
	
		// console.log(status_data[i]);
		
		if( status_data[i].retweeted_status != undefined ){
			retweets++;
		}
		
		if( status_data[i].entities.hashtags != undefined && status_data[i].entities.hashtags.length > 0 ){
			// console.log(status_data[i].entities.hashtags);
			for( h=0; h < status_data[i].entities.hashtags.length; h++ ){
				if( hashtags[status_data[i].entities.hashtags[h].text] == undefined ){
					hashtags[status_data[i].entities.hashtags[h].text] = 1;
				}else{
					hashtags[status_data[i].entities.hashtags[h].text]++;	
				}
				
			}
			// console.log(hashtags);
		}
	
		var words = status_data[i].text;
		words = words.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
		for(x=0;x<words.length;x++){
			if(ValidURL(words[x])){
				urls++;
			}		
		}
		

		words = status_data[i].text;
		words = words.toLowerCase();
		words = words.removeStopWords();		
		words = words.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );				
		for(x=0;x<words.length;x++){
			if( words[x] == ' ' || words[x] == '  ' || words[x] == '\n' || words[x] == '\t' ){
				continue;
			}
			
			var word = words[x];
			if( phrases[word] == undefined ){
				phrases[word] = 1;				
			}else{
				// console.log(phrases[words[x]]);
				phrases[word]++;
			}
		}
		
		
	}
	
	console.log(hashtags);
	
	
	
	var sortable = [];
	for (var phrase in phrases) {
	    sortable.push([phrase, phrases[phrase]]);
	    if( phrases[phrase] > 1 ){
			total_words = total_words + phrases[phrase];    
			unique_words = unique_words + 1;
			unqiue_word_list.push(phrase);
	    }
	    
	}
	
	// console.log(unqiue_word_list);
	
	
	
	console.log('Total Words: '+total_words);
	console.log('Unique Words: '+unique_words);
	
	sortable.sort(function(a, b) {
	    return b[1] - a[1];
	});
	
	console.log(sortable);

	// console.log(sortable);
	// console.log('URLS: '+urls);
	
	// console.log('Retweets: '+retweets);
	
	return this;
}

Rating.prototype.bot = function(){

	this.bot = {};
	
	// Load into Result from Data
	this.bot.screen_name = this.data.screen_name;
	this.bot.created_at = this.data.created_at;
	
	this.bot.timestamp = new Date( this.result.created_at ).getUnixTime();
	
	if( status_data.length != undefined ){
		
		// Load into Result from Data
		this.bot.statuses_count = status_data.length;
			
	}else{
		// never tweeted		
		this.bot.statuses_count = 0;		
	}
	
	this.bot.retweet_percentage = (retweets / this.bot.statuses_count );
		
	this.bot.bot_percentage = 1 * this.bot.retweet_percentage;
	
	console.log('Bot Rating: '+ Math.round(this.bot.bot_percentage * 10000)/100+'%' );
	
	this.result.bot = this.bot.bot_percentage;
	
	return this;
}

Rating.prototype.company = function(){

	this.company = {};
		
	// Load into Result from Data
	this.company.created_at = this.data.created_at;
	
	this.company.timestamp = new Date( this.result.created_at ).getUnixTime();
	
	if( status_data.length != undefined ){
		
		// Load into Result from Data
		this.company.statuses_count = status_data.length;
			
	}else{
		// never tweeted		
		this.company.statuses_count = 0;		
	}
	
	// console.log('Urls: '+urls);
	// console.log('Statuses Count: '+this.company.statuses_count);
	// console.log( this.data );
	
	// this.company.verified_percentage = (this.data.verified)?1:.5;
	
	this.company.url_percentage = ( urls / this.company.statuses_count )?( urls / this.company.statuses_count ):1;
	
	// console.log('URL Percentages: '+this.company.url_percentage);
	
	// console.log('Verified Percentages: '+this.company.verified_percentage);
		
	this.company.company_percentage = this.company.url_percentage;
	
	console.log('Company Rating: '+ Math.round(this.company.company_percentage * 10000)/100+'%' );
	
	this.result.company = this.company.company_percentage;
	
	return this;

}



Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }
