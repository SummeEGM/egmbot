const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const botconfig = require("../botconfig.json");



module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Du hast keine Berechtigungen für diesen Befehl.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.channel.send("Der Benutzer konnte nicht gefunden werden.");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Der Benutzer kann nicht verwarnt werden.");
    let reason = args.join(" ").slice(22);
    
    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;
    message.guild.member(wUser).send("Du wurdest aufgrund eines Regelverstoßes verwarnt. Grund: " + reason);


    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let version = botconfig.version;
    let botname = botconfig.displayfootername;
    let warnEmbed = new Discord.RichEmbed()
    .setAuthor('Erstellte Verwarnung', 'https://i.imgur.com/mBLLoJE.png')
    .setColor("#F44336")
    .addField("Benutzer", `${wUser} - ${wUser.id}`)
    .addField("Verwarnungen", warns[wUser.id].warns)
    .addField("Moderator", `<@${message.author.id}> - ${message.author.id}`)
    .addField("Zeitpunkt", message.createdAt)
    .addField("Grund", reason)
    .setFooter(`${botname} ${version}`, 'https://i.imgur.com/ahXkALq.png');


    let warnchannel = message.guild.channels.find(`name`, "logs");
    if(!warnchannel) return message.channel.send("Der Channel logs wurde nicht gefunden.");

    message.delete().catch(O_o=>{});
    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 2){
        let muterole = message.guild.roles.find(`name`, "muted");
        if(!muterole) return message.reply("Die Rolle muted fehlt.");

        
    let warnEmbed12h = new Discord.RichEmbed()
    .setDescription("Sanktion durch zwei Verwarnungen")
    .setColor("#F44336")
    .addField("Benutzer", `${wUser} - ${wUser.id}`)
    .addField("Typ", "Mute")
    .addField("Dauer", "12 Stunden")
    .setFooter(`${botname} ${version}`, 'https://i.imgur.com/ahXkALq.png');


    let warnchannel1 = message.guild.channels.find(`name`, "logs");
    if(!warnchannel1) return message.channel.send("Der Channel logs wurde nicht gefunden.");

        let mutetime = "12h";
        console.log('Warn für 12h');
        await(wUser.addRole(muterole.id));
        warnchannel1.send(warnEmbed12h);
        //message.channel.send(`${wUser.tag} wurde für 12 Stunden gemuted.`);



        setTimeout(function(){
            wUser.removeRole(muterole.id)
        }, ms(mutetime))
    }

    //if(warns[wUser.id].warns == 2){
        
    //}

}

module.exports.help = {
    name: "warn"
}