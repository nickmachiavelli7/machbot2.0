module.exports = {
	name: 'flirt',
	description: 'MachBot will flirt with you!',
	args: true,
	cooldown: 5,
	execute(message, args) {
            var flirt = getRandomInt(11);
            switch (flirt) {
              case 1:
              bot.sendMessage({
                to: channelID,
                message: 'Are you cake? Cause I want a piece of that.'
              });
                break;
              case 2:
              bot.sendMessage({
                  to: channelID,
                  message: 'My lips are like skittles. Wanna taste the rainbow?'
                });
                  break;
              case 3:
              bot.sendMessage({
                  to: channelID,
                  message: 'Hi, my name is Microsoft. Can I crash at your place tonight?'
                });
                  break;
              case 4:
              bot.sendMessage({
                  to: channelID,
                  message: 'Damn, girl, you are hotter than Chicago in 1871.'
                });
                  break;
              case 5:
              bot.sendMessage({
                  to: channelID,
                  message: 'Baby, you make my floppy disk turn into a hard drive.'
                });
                  break;
              case 6:
              bot.sendMessage({
                to: channelID,
                message: 'Are you an exception? I bet I can catch you.'
              });
                break;
              case 7:
              bot.sendMessage({
                  to: channelID,
                  message: 'You have the nicest syntax I have ever seen.'    
              });
                  break;
              case 8:
              bot.sendMessage({
                  to: channelID,
                  message: 'You are so hot, my server fans are functioning at 253%.'
              });
                  break;
              case 9:
              bot.sendMessage({
                  to: channelID,
                  message: 'I want to be DNA helicase, so I can unzip those genes!'
              });
                  break;
              case 10:
              bot.sendMessage({
                  to: channelID,
                  message: 'You must be Medusa because you make me rock hard.'
              });
                  break;
              case 11:
              bot.sendMessage({
                  to: channelID,
                  message: 'Good thing I have my library card, because I am checking that ass out!'
              });
                  break;

	},

};