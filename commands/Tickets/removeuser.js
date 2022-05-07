const users = require('../../models/userSchema.js');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions} = require("discord.js");
const ee = require("../../botconfig/embed.json");
const moment = require('moment');

module.exports = {
  name: "removeuser",
  category: "Tickets",
  description: "Removes A User From, The Ticket/Channel",
  run: async (client, message, args, prefix) => {
    const mainmenu = new MessageEmbed() .setAuthor("Error!", ee.footericon) .setDescription(`<a:ah_ping:903498951586631680> | You Dont Have Enough Permissions To Run This : \`MANAGE_CHANNELS\`.`) .setColor(ee.color)
    if (!message.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])) return message.channel.send({ embeds: [mainmenu] })
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) {
        return message.reply('Perhaps, You Forgot To Mention A User ?')
    }

    message.channel.permissionOverwrites.create(user, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
    })
  .then(channel => console.log(channel.permissionOverwrites.cache.get(message.author.id)))
    const uwu = new MessageEmbed()
    .setAuthor("Skid Alert | Remove User", ee.footericon)
    .setDescription(`<:ah_success:903498816362258462> | Successfully Removed ${user} From This Ticket/Channel`)
    .setColor(ee.color)
    message.channel.send({ embeds: [uwu] })
   }
}