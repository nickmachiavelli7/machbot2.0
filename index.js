require('dotenv').config(); 											//enables the .env hidden config file for secure token storage
const fs = require('fs');												//enables native node filestructure
const Discord = require('discord.js');									//enables discord.js library
const client = new Discord.Client();									//initializes client 
client.commands = new Discord.Collection();								//initializes collection of all command files
const { prefix} = require('./config.json');								//pulls prefix from configuration file 

<<<<<<< HEAD

<<<<<<< HEAD
<<<<<<< HEAD

=======
const connection = joinVoiceChannel({									//
	channelId: 291051686557122570
	guildId: 291051685931909130,
	adapterCreator: channel.guild.voiceAdapterCreator,
});
>>>>>>> parent of 9bd4869 (missing comma)
=======
const connection = joinVoiceChannel({									//
	channelId: 291051686557122570
	guildId: 291051685931909130,
	adapterCreator: channel.guild.voiceAdapterCreator,
});
>>>>>>> parent of 65cc8fd (attempting a move to see if the code runs here)

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));		//initialize the command handler files
=======
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
>>>>>>> parent of 19eec67 (Attempt to add a voice channel connection)

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

var mysql = require('mysql');

//SQL connection is broken. Need to attempt a different method: https://discordjs.guide/sequelize/#beta-creating-the-model
/*var con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBU,
  password: process.env.DBPASS,
  database: process.env.DBN
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/

const cooldowns = new Discord.Collection();

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