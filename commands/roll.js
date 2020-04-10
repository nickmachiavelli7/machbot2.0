module.exports = {
	name: 'roll',
	description: 'Rolls the dice. Format: "roll NdS" where N is the number of dice and S is the size of those dice. You can also just call the command with a single number to roll one die of that size.',
	cooldown: 5,
	execute(message, args) {
		const request = args[0];
		if (request.includes('d')){
			rolls = args[0].split('d')[0] / 1;
			sides = args[0].split('d')[1];
			
		}
		message.channel.send('You asked for '+ rolls +' rolls of a '+ sides +'sided die.');
	},
};