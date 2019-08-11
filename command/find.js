const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let users = bot.users;

    let searchTerm = args[0];
    if(!searchTerm) return message.channel.send("Bitte ein Argument angeben.");

    let matches = users.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    message.channel.send(matches.map(u => u.tag));

}

module.exports.help = {
    name: "find"
}