module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them. This may not yet work.',
	guildOnly: true,
	execute(message) {
if(message.member.roles.some(r=>["Admin", "Mod", "Server Staff", "Proficient"].includes(r.name)) ) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();
		const member = message.guild.member(taggedUser);
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
      if (member) {

        member.kick('Optional reason that will display in the audit logs').then(() => {
        message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          message.reply('I was unable to kick the member');
          console.error(err);
		          });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
}
else{
message.channel.send('Access denied.');
}
	},
};