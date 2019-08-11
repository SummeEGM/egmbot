const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " Tag" : " Tage") + " online";
    };
    let verifLevels = ["/", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Zentral Europa",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };

    let version = botconfig.version;
    let botname = botconfig.displayfootername;
        let bicon = message.guild.iconURL;
        let botembed = new Discord.RichEmbed()
        .setAuthor('Informationen', 'https://i.imgur.com/1paIZFO.png')
        .setColor("#0097A7")
        .addField('Server-Name', message.guild.name, true)
	    .addField('Server ID', message.guild.id, true)
        .addField('Serverstandort', region[message.guild.region], true)
        .addField("Mitglieder", `${message.guild.members.size}`, true)
        .addField('Clients', `${message.guild.members.filter(member => !member.user.bot).size}`, true)
        .addField('Bots', `${message.guild.members.filter(member => member.user.bot).size}`, true)
        .addField("Verifizierung", verifLevels[message.guild.verificationLevel], true)
        .addField("Channels", message.guild.channels.size, true)
        .addField("Rollen", message.guild.roles.size, true)
        .addField("Botping", bot.ping, true)
        .addField("Erstellungsdatum", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        .setFooter(`${botname} ${version}`, 'https://i.imgur.com/ahXkALq.png');

        return message.channel.send(botembed);
}

module.exports.help = {
    name: "info"
}