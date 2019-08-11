const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Du hast keine Berechtigungen für diesen Befehl.");
    let botmessage = args.join(" ");

    message.delete().catch();
    message.channel.send(botmessage);
}

module.exports.help = {
    name: "say"
}