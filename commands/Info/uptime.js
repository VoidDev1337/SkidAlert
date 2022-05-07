const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "uptime",
  category: "Info",
  description: "Shows The Uptime Of The Bot",
  run: async (client, message, args, prefix) => {
    
    let totalSeconds = message.client.uptime / 1000; let days = Math.floor(totalSeconds / 86400); totalSeconds %= 86400; let hours = Math.floor(totalSeconds / 3600); totalSeconds %= 3600; let minutes = Math.floor(totalSeconds / 60); let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    const mainmenu = new MessageEmbed()
    .setAuthor("Skid Alert's Uptime", ee.footericon)
    .setDescription(`<a:ah_uptime:903498972553969694> | \`${uptime}\``)
    .setColor(ee.color)
    message.channel.send({ embeds: [mainmenu] })
    
  }
}