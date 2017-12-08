/*!
 * Safe2Follow
 *
 * Copyright(c) 2017 Bradford Knowlton
 * MIT Licensed
 *
 * Version 1.1.5
 */

'use strict';

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


client.connect(function(err, res){
	
	if(err){
		console.log(err);
	}else{
		end();
	}

 });	


function end(){
	process.exit();
}