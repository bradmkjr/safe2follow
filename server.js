/*!
 * Safe2Follow
 *
 * Copyright(c) 2017 Bradford Knowlton
 * MIT Licensed
 *
 * Version 1.1.5
 */

// 'use strict';

Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }

const accounts = {
"Visa":1,
"Mastercard":1,
"TheXFactorUSA":1,
"VisaNews":1,
"AmericanExpress":1,
"Citi":1,
"katyperry": 1,
"justinbieber": 1,
"BarackObama": 1,
"taylorswift13": 1,
"rihanna": 1,
"TheEllenShow": 1,
"ladygaga": 1,
"YouTube": 2,
"Cristiano": 1,
"jtimberlake": 1,
"Twitter": 2,
"KimKardashian": 1,
"britneyspears": 1,
"ArianaGrande": 1,
"selenagomez": 1,
"cnnbrk": 2,
"ddlovato": 1,
"jimmyfallon": 1,
"shakira": 1,
"JLo": 1,
"realDonaldTrump": 1,
"BillGates": 1,
"nytimes": 2,
"Oprah": 1,
"KingJames": 1,
"instagram": 2,
"CNN": 2,
"MileyCyrus": 1,
"BrunoMars": 1,
"narendramodi": 1,
"Drake": 1,
"NiallOfficial": 1,
"BBCBreaking": 2,
"neymarjr": 1,
"SportsCenter": 2,
"KevinHart4real": 1,
"espn": 2,
"wizkhalifa": 1,
"LilTunechi": 1,
"onedirection": 1,
"Harry_Styles": 1,
"Pink": 1,
"SrBachchan": 1,
"iamsrk": 1,
"Louis_Tomlinson": 1,
"LiamPayne": 1,
"aliciakeys": 1,
"KAKA": 1,
"Adele": 1,
"BeingSalmanKhan": 1,
"ActuallyNPH": 1,
"realmadrid": 3,
"danieltosh": 1,
"EmmaWatson": 1,
"NASA": 2,
"NBA": 2,
"ConanOBrien": 1,
"pitbull": 1,
"FCBarcelona": 3,
"zaynmalik": 1,
"khloekardashian": 1,
"KendallJenner": 1,
"coldplay": 1,
"chrisbrown": 1,
"NFL": 2,
"KylieJenner": 1,
"kourtneykardash": 1,
"PMOIndia": 3,
"TheEconomist": 2,
"akshaykumar": 1,
"aamir_khan": 1,
"davidguetta": 1,
"BBCWorld": 2,
"deepikapadukone": 1,
"Eminem": 1,
"AvrilLavigne": 1,
"sachin_rt": 1,
"NICKIMINAJ": 1,
"POTUS": 3,
"NatGeo": 2,
"iHrithik": 1,
"blakeshelton": 1,
"priyankachopra": 1,
"edsheeran": 1,
"imVkohli": 1,
"MohamadAlarefe": 3,
"ricky_martin": 1,
"HillaryClinton": 1,
"andresiniesta8": 1,
"MesutOzil1088": 1,
"MariahCarey": 1,
"Google": 2,
"Reuters": 2,
"ChampionsLeague": 3,
"aplusk": 1,
"LeoDiCaprio": 1,
"AlejandroSanz": 1,
"Dr_alqarnee": 3,
"arrahman": 1,
"SnoopDogg": 1,
"shugairi": 3,
"agnezmo": 1,
"KDTrey5": 1,
"ParisHilton": 1,
"AlArabiya_Brk": 3,
"JimCarrey": 1,
"3gerardpique": 1,
"TwitterVideo": 2,
"RyanSeacrest": 1,
"xtina": 1,
"WayneRooney": 1,
"10Ronaldinho": 1,
"premierleague": 3,
"FoxNews": 2,
"CNNEE": 2,
"radityadika": 1,
"StephenAtHome": 1,
"VineCreators": 2,
"ivetesangalo": 1,
"DalaiLama": 1,
"WhiteHouse": 2,
"ManUtd": 3,
"MTV": 2,
"GarethBale11": 1,
"TwitterLatAm": 2,
"TwitterSports": 2,
"POTUS44": 3,
"ZacEfron": 1,
"ShawnMendes": 1,
"Pontifex_es": 1,
"Beyonce": 1,
"FALCAO": 1,
"WSJ": 2,
"elonmusk": 1,
"RafaelNadal": 1,
"PlayStation": 2,
"Pontifex": 1,
"TIME": 2,
"maroon5": 1,
"SHAQ": 1,
"tyrabanks": 1,
"jamesdrodriguez": 1,
"salman_alodah": 3,
"tomhanks": 1,
"camerondallas": 1,
"UberFacts": 2,
"aliaa08": 1,
"funnyordie": 2,
"Forbes": 2,
"facebook": 2,
"ashleytisdale": 1,
"ObamaWhiteHouse": 3,
"virendersehwag": 1,
"9GAG": 2,
"paulocoelho": 1,
"enriqueiglesias": 1,
"iamwill": 1,
"UberSoc": 2,
"Alafasy": 3,
"SethMacFarlane": 1,
"BigSean": 1,
"voguemagazine": 2,
"diddy": 1,
"AnushkaSharma": 1,
"jk_rowling": 1,
"karanjohar": 1,
"CHANEL": 2,
"pewdiepie": 1,
"CalvinHarris": 1,
"kobebryant": 1,
"SergioRamos": 1,
"TreySongz": 1,
"stephenfry": 1,
"victoriabeckham": 1,
"AJArabic": 3,
"LucianoHuck": 1,
"rickygervais": 1,
"ABC": 2,
"ArvindKejriwal": 1,
"elissakh": 1,
"juniorbachchan": 1,
"SimonCowell": 1,
"Usher": 1,
"sabqorg": 3,
"aguerosergiokun": 1,
"FCBarcelona_es": 3,
"nickjonas": 1,
"Xbox": 2,
"SamsungMobile": 2,
"LuisSuarez9": 1,
"charliesheen": 1,
"Arsenal": 3,
"rustyrockets": 1,
"TwitterMusic": 2,
"NancyAjram": 1,
"TheRock": 1,
"SarahKSilverman": 1,
"Ludacris": 1,
"kelly_clarkson": 1,
"AP": 2,
"katyperry":1,
"justinbieber":1,
"BarackObama":1,
"taylorswift13":1,
"rihanna":1,
"TheEllenShow":1,
"ladygaga":1,
"YouTube":1,
"Cristiano":1,
"jtimberlake":1,
"Twitter":1,
"KimKardashian":1,
"britneyspears":1,
"ArianaGrande":1,
"selenagomez":1,
"cnnbrk":1,
"ddlovato":1,
"jimmyfallon":1,
"shakira":1,
"realDonaldTrump":1,
"JLo":1,
"BillGates":1,
"nytimes":1,
"Oprah":1,
"KingJames":1,
"instagram":1,
"BrunoMars":1,
"CNN":1,
"MileyCyrus":1,
"narendramodi":1,
"NiallOfficial":1,
"Drake":1,
"BBCBreaking":1,
"neymarjr":1,
"SportsCenter":1,
"KevinHart4real":1,
"espn":1,
"wizkhalifa":1,
"LilTunechi":1,
"onedirection":1,
"SrBachchan":1,
"Pink":1,
"Harry_Styles":1,
"iamsrk":1,
"Louis_Tomlinson":1,
"LiamPayne":1,
"aliciakeys":1,
"KAKA":1,
"Adele":1,
"BeingSalmanKhan":1,
"realmadrid":1,
"ActuallyNPH":1,
"EmmaWatson":1,
"danieltosh":1,
"NASA":1,
"ConanOBrien":1,
"NBA":1,
"pitbull":1,
"FCBarcelona":1,
"zaynmalik":1,
"coldplay":1,
"KendallJenner":1,
"khloekardashian":1,
"chrisbrown":1,
"NFL":1,
"KylieJenner":1,
"kourtneykardash":1,
"PMOIndia":1,
"akshaykumar":1,
"TheEconomist":1,
"aamir_khan":1,
"deepikapadukone":1,
"davidguetta":1,
"BBCWorld":1,
"sachin_rt":1,
"Eminem":1,
"AvrilLavigne":1,
"POTUS":1,
"NICKIMINAJ":1,
"NatGeo":1,
"iHrithik":1,
"imVkohli":1,
"priyankachopra":1,
"blakeshelton":1,
"HillaryClinton":1,
"MohamadAlarefe":1,
"edsheeran":1,
"andresiniesta8":1,
"MesutOzil1088":1,
"ricky_martin":1,
"MariahCarey":1,
"Google":1,
"ChampionsLeague":1,
"Reuters":1,
"aplusk":1,
"LeoDiCaprio":1,
"AlejandroSanz":1,
"Dr_alqarnee":1,
"arrahman":1,
"SnoopDogg":1,
"Love_McD":1,
"akiko_lawson":1,
"Favstar_Bot":1,
"ElNacionalWeb":1,
"urbandictionary":1,
"t_hisashi":1,
"jalannet":1,
"711SEJ":1,
"XboxSupport":1,
"suntory":1,
"emiri":1,
"TandMProdCo":1,
"STCcare":1,
"SparVolltreffer":1,
"ronfeir":1,
"CaraotaDigital":1,
"MovistarArg":1,
"ENTORNOi":1,
"ReadersGazette":1,
"Ramdog1980":1,
"Tesco":1,
"PersonalAr":1,
"IndieGameDevBot":1,
"JobFairUSA":1,
"hectorarturo":1,
"SabuesoDigital_":1,
"missb62":1,
"Channel_MARS":1,
"RevoarInfo":1,
"mnnww3":1,
"googlenewsjp":1,
"MARS_ON_Spotify":1,
"Reporte24VE":1,
"ikamusume_chan":1,
"oursounds":1,
"La_Sopa_Digital":1,
"nine_oh":1,
"mutfaell1":1,
"GersGirls":1,
"famichikisenpai":1,
"favstar1000favs":1,
"072AvialCDMX":1,
"TomthunkitsMind":1,
"paul_cude":1,
"TMobileHelp":1,
"Story_terror":1,
"yukinki2":1,
"dipfox":1,
"072CDMX":1,
"JapanNewsFeeds":1,
"okezonenews":1,
"Info24US":1,
"mgt_":1,
"dirtysouthradio":1,
"e_saudia5":1,
"GNews_Center":1,
"KITKATJapan":1,
"ekidencom_pref":1,
"The_News_DIVA":1,
"camelcamelcamel":1,
"JohnRosePutnam":1,
"UNoticias":1,
"ZSCoban":1,
"EnkiVzla":1,
"detikcom":1,
"marcylauren":1,
"TomWellborn":1,
"bpm8":1,
"NS_online":1,
"sprintcare":1,
"nytimesBrasil":1,
"VINTAGE4MOMS":1,
"JAL_Official_jp":1,
"underdeskloser":1,
"ShinobiNinja":1,
"xxDCArt":1,
"marshawright":1,
"gerfingerpoken":1,
"mutfaill23":1,
"asahiinryo_jp":1,
"DailyGawk":1,
"liputan6dotcom":1,
"ArkangelScrap":1,
"O2":1,
"yosikisi":1,
"JamesRoy":1,
"Alm3asr":1,
"Panasonic_cp":1,
"SFR_SAV":1,
"TELMEXSoluciona":1,
"manuvfm97":1,
"republikaonline":1,
"jurylady5":1,
"ThreeUKSupport":1,
"flashnewsportal":1,
"1063atl":1,
"M7Drsh":1,
"MikkiL":1,
"friendmoscow":1,
"startupcrunch":1
};

const conception = '2006-03-21 00:00:00';

const conception_timestamp = new Date( conception ).getUnixTime();

const max_statuses_count = '10343344';

const max_followers_count = '106578515';

var s = 0;

var status_data;

var phrases = {};
var hashtags = {};
var urls = 0;
var total_words = 0;
var unique_words = 0;

var retweets = 0;

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

	let screen_name, command, options, text, values, res, user_id;
	
	await client.connect();
	
	for( var account in accounts ){
		// console.log(account);
		
		// console.log(account);
		
		screen_name = account;
		
		// console.log(screen_name);
		
		command = 'users/show';
		options = { "screen_name": screen_name, "include_entities": false  };	
		
		
		
		/*
		await T.get(command, options)
		.catch(function (err) {
		    console.log('caught error', err.stack)
		})
		.then(async function (result) {
			// console.log(result.data);
		
			text = "WITH upsert AS (UPDATE account SET data = $3, date_updated = now() WHERE user_id = $1 RETURNING *) INSERT INTO account ( user_id, user_name, data, date_created, date_updated, followers_count, friends_count, statuses_count, created_at, status_created_at ) SELECT $1, $2, $3, now(), now(), $4, $5, $6, $7, $8 WHERE NOT EXISTS (SELECT * FROM upsert);";
			values = [ result.data.id_str, result.data.screen_name, result.data, result.data.followers_count, result.data.friends_count, result.data.statuses_count, result.data.created_at, (result.data.status != undefined && result.data.status.created_at != undefined)?result.data.status.created_at:null ];

			// callback
			await client.query(text, values).catch(e => console.error(e.stack));
		});
*/

		
		// query database for data based on key with date within lifetime
		text = "SELECT command, options, data FROM twitapicache WHERE command = $1 AND options = $2 AND date_updated > now() - interval '"+cacheLifetime+"' ;";
		values = [command, options];
		
		// callback
		res = await client.query(text, values).catch(e => console.error(e.stack));
		
		if( res == undefined ){
			// Cache Miss!!
			console.log('Cache Miss: user/show '+screen_name);
			// twitterApi(command, options, process_user);
			res = await T.get(command, options)
			.catch(function (err) {
			    console.log('caught error', err.stack)
			})
			.then(async function (result) {
				text = "WITH upsert AS (UPDATE account SET data = $3, date_updated = now() WHERE user_id = $1 RETURNING *) INSERT INTO account ( user_id, user_name, data, date_created, date_updated, followers_count, friends_count, statuses_count, created_at, status_created_at ) SELECT $1, $2, $3, now(), now(), $4, $5, $6, $7, $8 WHERE NOT EXISTS (SELECT * FROM upsert);";
				values = [ result.data.id_str, result.data.screen_name, result.data, result.data.followers_count, result.data.friends_count, result.data.statuses_count, result.data.created_at, (result.data.status != undefined && result.data.status.created_at != undefined)?result.data.status.created_at:null ];
	
				// callback
				await client.query(text, values).catch(e => console.error(e.stack));
			});
			
			
		}else{
			// Cache HIT						
			console.log('Cache Hit: user/show '+screen_name);			
		}			
		
		// console.log(account);
		
		
		text = "SELECT * FROM account WHERE user_name = $1 LIMIT 1;";
		
		values = [account];
		
		res = await client.query(text, values).catch(e => console.error(e.stack));
	
		if( res == undefined || res.rows.length == 0 ){
			console.log('FAILED');
			//console.log(res);
		}else{
			// console.log(res.rows[0].user_name);
			
			// do stuff
			
			user_id = res.rows[0].user_id;
			
			await loadStatuses(user_id);
			
			await rateAccount(account);
			
			// var rating = new Rating();
			// rating.init(res.rows[0]).ghost().virgin().celebrity().bot().company().output(); // .status()
			
			console.log('Finished');
			console.log();			
		}
	}

	await client.end();
	
	process.exit();
}

async function rateAccount(account){

	let text, values, res, rating, data, statuses;
	
	text = "SELECT * FROM account WHERE user_name = $1 LIMIT 1;";

	values = [account];
		
	res = await client.query(text, values);	
	
	rating = new Rating();
	
	data = res.rows[0].data;
	
	statuses = await loadStatusesFromDb(res.rows[0].user_id);
	
	// console.log(statuses);
	
	// rating.init(data).ghost().virgin().celebrity().company().output(); // .status() .bot()
	
	rating.init(data, statuses).celebrity().company().output(); // .status() .bot() .ghost() .virgin()
	
}

async function loadStatuses(user_id){

	let text, values, res, command, options, data, max_id; 
	
	text = "SELECT * FROM status WHERE user_id = $1 ORDER BY status_id DESC;";
	
	values = [user_id];
	
	res = await client.query(text, values).catch(e => console.error(e.stack));	

	// console.log(res);

	if( res.rows != undefined && res.rows.length > 0 ){
		console.log('Starting Statuses: '+res.rows.length);
		
		// get NEWER statuses
		command = 'statuses/user_timeline';
		options = { "user_id": user_id, "count": 200, since_id: res.rows[0].status_id }; 
		// , "exclude_replies": false, "include_rts": false, "include_entities": false
		
		data = await T.get(command, options).catch(function (err) {
		    console.log('caught error', err.stack)
		  })
		  .then(function (result) {
		    return result.data;
		  });
		
		if( data.length > 0 ){ for(var row of data){ storeStatus(row); } }		
		
		/////
		
		max_id = res.rows[res.rows.length - 1].status_id;
		
		// Load OLDER statuses
		command = 'statuses/user_timeline';
		options = { "user_id": user_id, "count": 200, max_id: max_id }; 
		// , "exclude_replies": false, "include_rts": false, "include_entities": false
		
		data = await T.get(command, options).catch(function (err) {
		    console.log('caught error', err.stack)
		  })
		  .then(function (result) {
		    return result.data;
		  });
		
		if( data.length > 0 ){ for(var row of data){ storeStatus(row); } }	
			
	}else{
		console.log('Load Some Statuses');
		
		command = 'statuses/user_timeline';
		options = { "user_id": user_id, "count": 200  }; 
		// , "exclude_replies": false, "include_rts": false, "include_entities": false
		
		data = await T.get(command, options).catch(function (err) {
		    console.log('caught error', err.stack)
		  })
		  .then(function (result) {
		    return result.data;
		  });
		
		if( data != undefined && data.length > 0){
			
			for(var row of data){
				storeStatus(row);									
			}
			
			max_id = data[data.length-1].id_str;
			
			command = 'statuses/user_timeline';
			options = { "user_id": user_id, "count": 200, max_id: max_id }; 
			// , "exclude_replies": false, "include_rts": false, "include_entities": false
			
			data = await T.get(command, options).catch(function (err) {
			    console.log('caught error', err.stack)
			  })
			  .then(function (result) {
			    return result.data;
			  });
			
			if( data.length > 0 ){ for(var row of data){ storeStatus(row); } }					
		}		
	}
	
	text = "SELECT * FROM status WHERE user_id = $1 ORDER BY status_id DESC;";
	
	values = [user_id];
	
	res = await client.query(text, values).catch(e => console.error(e.stack));	

	if( res.rows != undefined ){
		console.log('Total Statuses: '+res.rows.length);
	}else{
		console.log('No Statuses');
	}
	
	// return an array of tweets
	return res;
}



run();

async function storeStatus(row){
	let text, values;
	text = "WITH upsert AS (UPDATE status SET data = $3, date_updated = now() WHERE status_id = $1 RETURNING *) INSERT INTO status ( status_id, user_id, data, date_created, date_updated, created_at ) SELECT $1, $2, $3, now(), now(), $4 WHERE NOT EXISTS (SELECT * FROM upsert);";
	values = [ row.id_str, row.user.id_str, row, row.created_at ];
	await client.query(text, values).catch(e => console.error(e.stack)); // end client.query
}

// define the class
var Rating = function() {
  this.screen_name = '';
  this.data = {};
  this.result = {};
  
  this.conception_timestamp = '';
  
  this.now = new Date().getUnixTime();
  	
};

Rating.prototype.init = function(data, statuses){

	this.data = data;
	
	this.statuses = statuses;
	
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

	for(let i=0;i<status_data.length;i++){
	
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
	
	/*
	if( status_data.length != undefined ){
		
		// Load into Result from Data
		this.bot.statuses_count = status_data.length;
			
	}else{
		// never tweeted		
		this.bot.statuses_count = 0;		
	}
	*/
	
	this.bot.statuses_count = 0;		
	
	this.bot.retweet_percentage = (retweets / this.bot.statuses_count );
		
	this.bot.bot_percentage = 1 * this.bot.retweet_percentage;
	
	console.log('Bot Rating: '+ Math.round(this.bot.bot_percentage * 10000)/100+'%' );
	
	this.result.bot = this.bot.bot_percentage;
	
	return this;
}

Rating.prototype.company = function(){

	
	this.company = {};
	
	this.company.retweet_count = 0;
	this.company.favorite_count = 0;
		
	// Load into Result from Data
	this.company.created_at = this.data.created_at;
	
	this.company.timestamp = new Date( this.result.created_at ).getUnixTime();

	// console.log(  this.data.id_str );
	
	// console.log(this.statuses);
	
	console.log('Status Count: '+this.statuses.length);
	
	// console.log(this.statuses);
	
	// console.log(this.statuses[0].data.text);
	
	// console.log('Urls: '+urls);
	// console.log('Statuses Count: '+this.company.statuses_count);
	// console.log( this.data );
	
	// this.company.verified_percentage = (this.data.verified)?1:.5;
	
	for( var status in this.statuses ){
		// console.log(status.data.text);
		// console.log(this.statuses[status].data.text);
		this.company.retweet_count += this.statuses[status].data.retweet_count; 
		this.company.favorite_count += this.statuses[status].data.favorite_count;
		
	}
	
	console.log( 'ReTweet Count: '+this.company.retweet_count );
	console.log( 'Favorite Count: '+this.company.favorite_count );
	
	console.log( 'Average ReTweet Count: '+ ( this.company.retweet_count / this.statuses.length ) );
	console.log( 'Average Favorite Count: '+ ( this.company.favorite_count / this.statuses.length ) );
	
	
	this.company.url_percentage = ( urls / this.company.statuses_count )?( urls / this.company.statuses_count ):1;
	
	// console.log('URL Percentages: '+this.company.url_percentage);
	
	// console.log('Verified Percentages: '+this.company.verified_percentage);
		
	this.company.company_percentage = this.company.url_percentage;
	
	console.log('Company Rating: '+ Math.round(this.company.company_percentage * 10000)/100+'%' );
	
	this.result.company = this.company.company_percentage;
	
	return this;

}


async function loadStatusesFromDb( user_id ){

	let text, values, res; 

	text = "SELECT * FROM status WHERE user_id = $1;";
	
	values = [ user_id ];
	
	res = await client.query(text, values).catch(e => console.error(e.stack));	

	// console.log(res);

	if( res.rows != undefined && res.rows.length > 0 ){
		// console.log(res.rows);
		return res.rows;
		
	}else{
	
		return null;		
		
	}
	
}
