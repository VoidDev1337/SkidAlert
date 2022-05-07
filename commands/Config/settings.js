const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const guilds = require('../../models/guildSchema.js');
const moment = require('moment');

module.exports = {
  name: "settings",
  category: "Config",
  description: "Shows The Config Of The Server!",
  run: async (client, message, args, prefix) => {
    
    let emoji = { "enabled": "<:ah_n_disabled:903498774666678273><:ah_y_enabled:903498805998129183> | \`Enabled\`", "disabled": "<:ah_y_disabled:903498795839537152><:ah_n_enabled:903498784963711007> | \`Disabled\`"}
    guilds.findOne({ GuildID: message.guild.id}, async (err, guild) => { 

        if(!guild) {
         const newGuild = new guilds({ GuildID: message.guild.id, Middlemans: [], Sellers: [], Trusteds: [], SellerRole: 0, TrustedRole: 0, MiddlemanRole: 0, ticketactive: false, mmactive: false, TicketChannel: 0, MiddlemanTick: 0, TrustedGuild: false })
         newGuild.save().catch(e => console.log(e));
         let owner = await message.guild.fetchOwner()
         console.log(owner)

         let embed = new MessageEmbed().setAuthor(`Guilds's Config`, message.guild.iconURL({ size: 1024, dynamic: true })) .setDescription(`> **Guild Name** : \`${message.guild.name}\`\n> **Guild Owner** : \`${owner.user.tag}\`\n> **Created On** : \`${moment(message.guild.createdAt).format('MMM DD YYYY')}\`\n> **Trusted Guild** : \`false\`\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**<:2slashcmd:966664706418966568> Ticket System**\n> Buying/Selling : ${emoji.disabled}\n> Middleman : ${emoji.disabled}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**<:S_Role:966660448319598652> Roles Management**\n> Middlemans : \`None\`\n>  Sellers : \`None\`\n> Trusteds : \`None\``) .setThumbnail(ee.footericon) .setColor(ee.color)
         message.channel.send({ embeds: [embed] })
        } else {

            let sellingticket;
            if(guild.ticketactive) sellingticket = `${emoji.enabled} | Channel : <#${guild.TicketChannel}>`
            else sellingticket = emoji.disabled

            let middlemanchannel;
            if(guild.mmactive) middlemanchannel = `${emoji.enabled} | Channel : <#${guild.TicketChannel}>`
            else middlemanchannel = emoji.disabled

            let middlemans;
            if (guild.Middlemans.length <= 0) middlemans = `\`0 Middlemans\``
            else {
                guild.Middlemans.forEach(user => {
                    middlemans += `<@${user}> | `
                });
            }

            let sellers;
            if (guild.Sellers.length <= 0) sellers = `\`0 Sellers\``
            else {
                guild.Sellers.forEach(user => {
                    sellers += `<@${user}> | `
                });
            }

            let trusteds;
            if (guild.Trusteds.length <= 0) trusteds = `\`0 Trusteds\``
            else {
                guild.Trusteds.forEach(user => {
                    trusteds += `<@${user}> |  `
                });
            }

            let owner = await message.guild.fetchOwner()
            let embed = new MessageEmbed().setAuthor(`Guilds's Config`, message.guild.iconURL({ size: 1024, dynamic: true })) .setDescription(`
> **Guild Name** : \`${message.guild.name}\`
> **Guild Owner** : \`${owner.user.tag}\`
> **Created On** : \`${moment(message.guild.createdAt).format('MMM DD YYYY')}\`
> **Trusted Guild** : \`${guild.TrustedGuild}\`

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
**<:2slashcmd:966664706418966568> Ticket System**
> Buying/Selling : ${sellingticket}
> Middleman : ${middlemanchannel}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
**<:S_Role:966660448319598652> Roles Management**
> Middlemans : ${middlemans}
>  Sellers : ${sellers}
> Trusteds : ${trusteds}
            `) .setThumbnail(ee.footericon) .setColor(ee.color)
            message.channel.send({ embeds: [embed] })
        }

    })

  }
}