const Discord = require("discord.js");
const botconfig = require("../botconfig.json");



module.exports.run = async (bot, message, args) => {

    let version = botconfig.version;
    let botname = botconfig.displayfootername;
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#18FFFF")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Erstellt am", message.guild.createdAt)
    .addField("Beitritt", message.member.joinedAt)
    .addField("Mitglieder", message.guild.memberCount)
    .setFooter(`${botname} ${version}`, 'https://i.imgur.com/ahXkALq.png');


    return message.channel.send(serverembed);}

module.exports.help = {
    name: "dis1"
}