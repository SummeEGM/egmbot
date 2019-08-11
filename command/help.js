const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Du hast keine Berechtigungen für diesen Befehl.");

    let version = botconfig.version;
    let botname = botconfig.displayfootername;
    let helpEmbed = new Discord.RichEmbed()
    .setAuthor('Moderative Commands', 'https://i.imgur.com/TvqIM9N.png')
    .setColor("#C5CAE9")
    .addField("Verwarnen", "!warn @Name Grund")
    .addField("Anzahl an Verwarnungen", "!warnings @Name")
    .addField("Vom Server kicken", "!kick @Name Grund")
    .addField("Vom Server bannen", "!ban @Name Grund")
    .addField("Muten", "!mute @Name Dauer(1s/1m/h/1d)")
    .addBlankField()
    .addField("Chat löschen", "!clear Nachrichtenanzahl")
    .addField("Als Bot schreiben", "!say Nachricht")
    .addField("Benutzer suchen", "!find Buchstabe(n)/ID")
    .addField("Informationen", "!info")
    .setFooter(`${botname} ${version}`, 'https://i.imgur.com/ahXkALq.png');

    return message.channel.send(helpEmbed);

}

module.exports.help = {
    name: "help"
}

//TO-DO: Commandliste schreiben