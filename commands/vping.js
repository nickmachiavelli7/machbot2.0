module.exports = {
	name: 'vping',
	description: 'Testing voice channel connection.',
	execute(message) {
  if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();	
	const dispatcher = connection.play('https://cdn.glitch.com/60a14f49-0846-4bad-b84a-e5f018c2130d%2Fmsn_alert.mp3?1506640405402');
//connection.play('https://cdn.glitch.com/60a14f49-0846-4bad-b84a-e5f018c2130d%2Fmsn_alert.mp3?1506640405402', { volume: 0.1 });
      dispatcher.on('start', () => {
        console.log('audio is now playing!');
      })
      .catch(err => {
        console.log('error:', err);
      });
  };
};