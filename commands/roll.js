module.exports = {
	name: 'roll',
	description: 'Rolls the dice. Format: "roll NdS" where N is the number of dice and S is the size of those dice. You can also just call the command with a single number to roll one die of that size.',
	cooldown: 5,
	execute(message, args) {
		const request = args[0];
		if (request.includes('d')){
			rolls = args[0].split('d')[0] / 1;
			sides = args[0].split('d')[1] / 1;
			let sum = 0;
			let i = 0;
			for(i=0;i<rolls;i++){
				sum = (Math.floor(Math.random() * (sides - 1 + 1) ) + 1) + sum;
			}
			message.channel.send('You rolled '+ rolls +' '+ sides +'-sided dice and got a total of '+ sum +'.');
			
		}
	},
};