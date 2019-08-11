const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Du hast keine Berechtigungen für diesen Befehl.");
    if(!args[0]) return message.channel.send("Bitte als Argument angegeben, wie viele Nachrichtne glöscht werden sollen.");
    message.channel.bulkDelete(args[0]+2).then(() => {
        message.channel.send(`Es wurden ${args[0]} Nachrichten gelöscht.`).then(msg => msg.delete(5000));
    });
}

module.exports.help = {
    name: "clear"
}