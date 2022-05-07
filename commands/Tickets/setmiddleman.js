const users = require('../../models/userSchema.js');
const { MessageEmbed, MessageActionRow, MessageButton, Permissions} = require("discord.js");
const ee = require("../../botconfig/embed.json");
const moment = require('moment');
const guilds = require('../../models/guildSchema.js');

module.exports = {
  name: "setmmchannel",
  category: "Tickets",
  description: "Creates A Ticket System For Buying N Selling",
  run: async (client, message, args, prefix) => {
    let channelid = args[0]
    if(!channelid) return message.channel.send(`Perhaps, You Forgot To Mention A Channel ID!`)
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('mmticket')
        .setLabel('Create Ticket')
        .setStyle('SECONDARY')
        .setEmoji('📩')
    );
    let embed = new MessageEmbed()
    .setColor(ee.color)
    .setDescription(`Wanna Create A Ticket For Middleman ? Click The Button Below To Create One!`)
    .setFooter(`Powered By SkidAlert!`)
    channel = client.channels.cache.get(channelid)
    channel.send({ embeds: [embed], components: [row]})
    message.reply(`Successfully Created Middleman Ticket Channel In ${channel}`)

    guilds.findOne({ GuildID: message.guild.id}, async (err, guild) => {
        if(!guild) {
            const newGuild = new guilds({ GuildID: message.guild.id, Middlemans: [], Sellers: [], Trusteds: [], SellerRole: 0, TrustedRole: 0, MiddlemanRole: 0, ticketactive: false, mmactive: true, TicketChannel: 0, MiddlemanTick: parseInt(channelid), TrustedGuild: false })
            newGuild.save()
        } else {
            guild.mmactive = true
            guild.MiddlemanTick = parseInt(channelid)
            guild.save()
        }
    })
  }
}