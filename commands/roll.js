module.exports = {
	name: 'roll',
	description: 'Rolls the dice. Format: "roll NdS (+/-M)" where N is the number of dice and S is the size of those dice. M is an optional modifier to the roll. A space must be included before the modifier. You can also just call the command with a single number to roll one die of that size.',
	args: true,
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
			sum= sum + (args[1] / 1);
			message.channel.send('You rolled '+ rolls +' '+ sides +'-sided dice and got a total of '+ sum +'.');
			
		}
		else if(!isNaN(request.includes('d'))){
			sides = args[0] / 1;
		roll = (Math.floor(Math.random() * (sides - 1 + 1) ) + 1);
			if((roll == 1) && (sides = 20)){
				message.channel.send('CRITICAL FAILURE - you rolled a nat 1!');
			}
			else if((roll == 20) && (sides = 20)){
				message.channel.send('CRITICAL SUCCESS! - you rolled a nat 20!');
			}
			else{
				message.channel.send('You rolled a ' + roll + '.');
			}
		}
		else
			message.channel.send('Something you did was bad. Try not being bad.');
	},

};