const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js");
const guilds = require('../../models/guildSchema.js');
const ee = require("../../botconfig/embed.json");

module.exports = {
  name: "removemiddleman",
  category: "Config",
  description: "Removes A Middleman From The Guild Middleman List!",
  run: async (client, message, args, prefix) => {
    function arrayRemove(arr, value) { return arr.filter(function(geeks) { return geeks != value; }); }

    const mainmenu = new MessageEmbed() .setAuthor("Error!", ee.footericon) .setDescription(`<a:ah_ping:903498951586631680> | You Dont Have Enough Permissions To Run This : \`ADMINISTRATOR/MANAGE_ROLES\`.`) .setColor(ee.color)
    if (!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR, Permissions.FLAGS.MANAGE_ROLES])) return message.channel.send({ embeds: [mainmenu] })
    
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let embed = new MessageEmbed() .setColor(ee.wrongcolor) .setDescription(`<:ah_error:903498826688655381> Please Mention A User, Ex : \`!removemiddleman @Discord\``)
    if (!user) return message.channel.send({ embeds: [embed]})

    guilds.findOne({ GuildID: message.guild.id}, async (err, guild) => { 
         if(!guild) {
          const newGuild = new guilds({ GuildID: message.guild.id, Middlemans: [], Sellers: [], Trusteds: [], SellerRole: 0, TrustedRole: 0, MiddlemanRole: 0, ticketactive: false, mmactive: false, TicketChannel: 0, MiddlemanTick: 0, TrustedGuild: false })
          newGuild.save().catch(e => console.log(e));

          const mainmenu = new MessageEmbed() .setAuthor("Skid Alert | Remove Middleman", ee.footericon) .setDescription(`<:ah_success:903498816362258462> | Successfully Removed <@${user.id}> From The Middleman List`) .setColor(ee.color)
          return message.channel.send({ embeds: [mainmenu] })

         } else {
              array = arrayRemove(guild.Middlemans, user.id)
              guild.Middlemans = array
              guild.save()

              const mainmenu = new MessageEmbed() .setAuthor("Skid Alert | Remove Middleman", ee.footericon) .setDescription(`<:ah_success:903498816362258462> | Successfully Removed <@${user.id}> From The Middleman List`) .setColor(ee.color)
              return message.channel.send({ embeds: [mainmenu] })
         }
     })
  }
}