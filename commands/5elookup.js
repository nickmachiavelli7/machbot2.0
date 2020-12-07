module.exports = {
	name: '5elookup',
	description: 'Looks up a value in the D&D 5e database. Specify "spell", "item", "monster", or "ability". If spaces are needed, use dashes instead. Example command would be >5elookup ability lay-on-hands.',
	args: true,
	execute(message, args) {
		var url = 'https://api.open5e.com/';
		const https = require("https");
		if (args[0] == 'spell')
		{
			var SpellName = args[1].replace('-','+');
			url = url + 'spells/?name=' + SpellName;
			https.get(url, res => {
			res.setEncoding("utf8");
			let body = "";
			res.on("data", data => {
			body += data;
			});
			res.on("end", () => {
			body = JSON.parse(body);
			console.log(body);
			var stringify = ' ';
			stringify = JSON.stringify(body);
			message.channel.send(body);
			});
			});
			console.log('Lookup success.');
			

		}
		
}
};