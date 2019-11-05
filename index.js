require('dotenv').config(); 											//enables the .env hidden config file for secure token storage
const fs = require('fs');													//enables native node filestructure
const Discord = require('discord.js');						//enables discord.js library
const client = new Discord.Client();						//initializes client 
client.commands = new Discord.Collection();	//initializes collection of all command files
const { prefix} = require('./config.json');				//pulls prefix from configuration file 

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBU,
  password: process.env.DBPASS,
  database: process.env.DBN
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)		//boots client
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(process.env.BOT_TOKEN);