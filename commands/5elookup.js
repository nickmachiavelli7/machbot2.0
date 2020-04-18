module.exports = {
	name: '5elookup',
	description: 'Looks up a value in the D&D 5e database. Specify "spell", "item", "monster", or "ability". If spaces are needed, use dashes instead. Example command would be >5elookup ability lay-on-hands.',
	args: true,
	execute(message, args) {
		var url = 'http://www.dnd5eapi.co/api/';
		if (args[0] == 'spell')
		{
			url.get(url, res => {
			res.setEncoding("utf8");
			let body = "";
			res.on("data", data => {
			body += data;
			});
			res.on("end", () => {
			body = JSON.parse(body);
			console.log(body);
			});
			});
			console.log('Lookup success.');
		}
		
}
};