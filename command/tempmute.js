const Discord = require("discord.js");
const ms = require("ms");
const botconfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.channel.send("Der Benutzer wurde nicht gefunden.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Der Benutzer kann nicht gemuted werden.");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Du hast keine Berechtigungen für diesen Befehl.");
    let muterole = message.guild.roles.find(`name`, "muted");
    if (!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "",
                permission:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    
    let mutechannel = message.guild.channels.find(`name`, "logs");
    if(!mutechannel) return message.channel.send("Der Channel logs wurde nicht gefunden.");

    let version = botconfig.version;
    let botname = botconfig.displayfootername;
    let muteEmbed = new Discord.RichEmbed()
    .setDescription("Mute")
    .setColor("#F50057")
    .addField("Benutzer", `${tomute} - ${tomute.id}`)
    .addField("Moderator", `<@${message.author.id}> - ${message.author.id}`)
    .addField("Dauer", args[1])
    .setFooter(`${botname} ${version}`, 'https://i.imgur.com/ahXkALq.png');


    let unmuteEmbed = new Discord.RichEmbed()
    .setDescription("Mute Aufhebung")
    .setColor("#76FF03")
    .addField("Benutzer", `${tomute} - ${tomute.id}`)
    .addField("Moderator", `<@606978332587720704> - 606978332587720704`)
    .addField("Zeitpunkt", message.createdAt)
    .setFooter(`${botname} ${version}`, 'https://i.imgur.com/ahXkALq.png');


    let mutetime = args[1];
    if(!mutetime) return message.channel.send("Du hast keine Zeit festgelegt.");

    await(tomute.addRole(muterole.id));
    mutechannel.send(muteEmbed);
    message.delete().catch(O_o=>{});

    //message.channel.send(`<@${tomute.id}> wurde für ${ms(mutetime)} gemuted.`);

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        mutechannel.send(unmuteEmbed);
        //message.channel.send(`<@${tomute.id}> wurde entmuted.`);

    }, ms(mutetime));

}

module.exports.help = {
    name: "mute"
}