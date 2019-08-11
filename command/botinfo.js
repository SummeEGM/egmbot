const Discord = require("discord.js");
const botconfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {

    let version = botconfig.version;
    let botname = botconfig.displayfootername;
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#00ACC1")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Erstellt am", bot.user.createdAt)
        .addField("Author", "Summe")
        .setFooter(`${botname} ${version}`, 'https://i.imgur.com/ahXkALq.png');

        return message.channel.send(botembed);
}

module.exports.help = {
    name: "dis2"
}