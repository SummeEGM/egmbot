const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./command/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("[Error] Es wurden keine Commands (./command) geladen.")
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./command/${f}`);
        console.log(`${f} wurde geladen.`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    console.log('------------------------');
    console.log('EGM Bot ist nun online!');
    bot.user.setActivity("https://einfach-gaming.de");
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    if(cmd === `${prefix}hello`){
        return message.channel.send("Hello!");
    }


});

bot.on('guildMemberAdd', member => {
    console.log(member.user.username + ' hat den Server betreten.')

    var role = member.guild.roles.find('name', 'Benutzer');
    member.addRole(role)

    member.send("Herzlich willkommen auf dem offiziellen Discord-Server der **Einfach-Gaming Community**! Bitte lese dir zuerst die Regeln im Informationschannel durch. Viel Spaß!");
});

bot.login(botconfig.token);