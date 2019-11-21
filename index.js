require('dotenv').config(); 											//enables the .env hidden config file for secure token storage
const fs = require('fs');												//enables native node filestructure
const Discord = require('discord.js');									//enables discord.js library
const client = new Discord.Client();									//initializes client 
client.commands = new Discord.Collection();								//initializes collection of all command files
const { prefix} = require('./config.json');								//pulls prefix from configuration file 
const Sequelize = require('sequelize');
const mysql2 = require('mysql2');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


const sequelize = new Sequelize(process.env.DBN, process.env.DBU, process.env.DBPASS, {
	host: process.env.DBHOST,
	dialect: 'mysql',
	dialectModule: mysql2,
	logging: false,
});


const Profiles = sequelize.define('profiles', {
	profileID: {
		type: Sequelize.STRING,
		unique: true,
	},
	MessageID: Sequelize.TEXT,
	ServerID: Sequelize.STRING,
	UserID: Sequelize.STRING,
	TagID:	Sequelize.INTEGER
	},
);											//UNTESTED Sequelize table definition

sequelize.authenticate().complete(function (err) {
 if (err) {
    console.log('There is connection in ERROR');	//if there's an error, throw the error. Also, build an error handler at some point, so you know what broke, you fuck.
 } else {
    console.log('Connection has been established successfully');
 }
});

client.once('ready', () => {
	Profiles.sync();							//UNTESTED Sequelize table creation
	console.log("Table created, database ready.")
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)		//boots client
});


client.on('message', message => {
	
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command! If you believe this is a valid command, please contact the developer.');
	}
});

client.login(process.env.BOT_TOKEN);