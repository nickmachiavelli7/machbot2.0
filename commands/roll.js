module.exports = {
	name: 'roll',
	description: 'Rolls the dice. Format: "roll NdS (+/-M) A/D" where N is the number of dice and S is the size of those dice. M is an optional modifier to the roll. A space must be included before the modifier. You can also just call the command with a single number to roll one die of that size. Adding "A" to the end indicates advantage (higher of two values) and "D" indicates disadvantage (lower of two values).',
	args: true,
	cooldown: 5,
	execute(message, args) {
		let roller = function (rolls, sides, mod) {
			let sum = 0;
			let i = 0;
			for(i=0;i<rolls;i++){
				sum = (Math.floor(Math.random() * (sides - 1 + 1) ) + 1) + sum;
			}
			if (!isNaN(mod))
				sum= sum + mod;
			return sum;
			};
		const request = args[0];
		
		disad = null;
		if(!isNaN(args[1]))
			mod = (args[1] / 1);
		else if(args[1] = null)
		{
			mod = 0;
			disad = args[1];
			
		}
		else
		{
			mod = 0;
			disad = args[2];
		}
		
		if((disad = 'a') || (disad = 'A'))
		{
			if (request.includes('d')){
				rolls = args[0].split('d')[0] / 1;
				sides = args[0].split('d')[1] / 1;

				num1 = roller(rolls,sides,mod);
				num2 = roller(rolls,sides,mod);
				if (num1 >= num2)
					message.channel.send('You rolled '+ rolls +' '+ sides +'-sided dice with advantage and got a total of '+ num1 +'.');
				else
					message.channel.send('You rolled '+ rolls +' '+ sides +'-sided dice with advantage and got a total of '+ num2 +'.');
						
			}
			else if(!isNaN(request.includes('d'))){
				rolls = 1;
				sides = args[0] / 1;
				num1 = roller(1,sides,0);
				num2 = roller(1,sides,0);
				if (num1 >= num2)
					message.channel.send('You rolled '+ rolls +' '+ sides +'-sided dice with advantage and got a total of '+ num2 +'.');

		}
		}
		else if((disad = 'd') || (disad = 'D'))
		{
			if (request.includes('d')){
				rolls = args[0].split('d')[0] / 1;
				sides = args[0].split('d')[1] / 1;
				num1 = roller(rolls,sides,mod);
				num2 = roller(rolls,sides,mod);
				if (num1 <= num2)
					message.channel.send('You rolled '+ rolls +' '+ sides +'-sided dice with disadvantage and got a total of '+ num1 +'.');
				else
					message.channel.send('You rolled '+ rolls +' '+ sides +'-sided dice with disadvantage and got a total of '+ num2 +'.');
						
			}
			else if(!isNaN(request.includes('d'))){
				sides = args[0] / 1;
				num1 = roller(1,sides,0);
				num2 = roller(1,sides,0);

		}

		}
		else if(disad = null){
			if (request.includes('d')){
				rolls = args[0].split('d')[0] / 1;
				sides = args[0].split('d')[1] / 1;
				num1 = roller(rolls,sides, mod);
				message.channel.send('You rolled '+ rolls +' '+ sides +'-sided dice and got a total of '+ num1 +'.');
			}
			else if(!isNaN(request.includes('d')))
			{
				sides = args[0] / 1;
				roll = roller(1,sides,mod);
				if((roll == 1) && (sides == 20)){
					message.channel.send('CRITICAL FAILURE - you rolled a nat 1!');
				}
				else if((roll == 20) && (sides ==20)){
					message.channel.send('CRITICAL SUCCESS! - you rolled a nat 20!');
				}
				else{
					message.channel.send('You rolled a ' + roll + '.');
				}
			}
		}
		else
			message.channel.send('Something you did was bad. Try not being bad.');
	},

};