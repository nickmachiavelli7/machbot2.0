module.exports = {
	name: 'shutdown',
	description: 'Turns off the bot.',
	execute(message, args) {
		if( UserID == process.env.DEVID)
		{
		process.exit();
		}
	},
};