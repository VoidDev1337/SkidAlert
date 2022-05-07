const config = require("../../botconfig/config.json"); //loading config file with token and prefix, and settings
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const emoji = require(`../../botconfig/emojis.json`);
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const {
  MessageEmbed
} = require(`discord.js`);
const { escapeRegex } = require("../../handlers/functions.js")
//here the event starts
module.exports = async (client, message) => {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild || !message.channel) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();
    // if the message  author is a bot, return aka ignore the inputs
    if (message.author.bot) return;
    // Gets guild data
    //get the current prefix from the database
    let prefix = "!";
    //if not in the database for some reason use the default prefix
    if (prefix === null) prefix = config.prefix;
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);

    let not_allowed = false;
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift().toLowerCase();
    //if no cmd added return error
    if (cmd.length === 0){

      if(matchedPrefix.includes(client.user.id)){
        const fff = new Discord.MessageEmbed()
        .setAuthor(`Gettting Started | SkidAlert`, client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`To See My Commands Simply Type \`!help\`, To Report A \`Scammer/Skid\` [\`Join Here\`](https://discord.gg/skidalert)\n**Links :** [\`Support Server\`](https://discord.gg/skidalert) | [\`Invite Me\`](https://discord.com/api/oauth2/authorize?client_id=965556119676268544&permissions=8&scope=bot) | [\`Source Code\`](https://github.com/VoidDev1337/SkidAlert)`)
  		  .setColor("#FFFF00")
        .setFooter(`Developed with <3 By Void.#1337`)
        return message.reply({embeds: [fff]});

      }
      not_allowed = true;
      return;
    }
    //get the command from the collection
    let command = client.commands.get(cmd);
try {
        //run the command with the parameters:  client, message, args, user, text, prefix,
        if(not_allowed) return;
        command.run(client, message, args , prefix);
        console.log(`${message.author.tag} ran ${command.name}`)
      } catch (e) {
        return console.log(e)
      }

}