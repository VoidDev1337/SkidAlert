const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "ping",
  category: "Info",
  description: "Shows The Latency Of The Bot",
  run: async (client, message, args, prefix) => {

    const mainmenu = new MessageEmbed()
    .setAuthor("Skid Alert's Ping!", ee.footericon)
    .setDescription(`<a:ah_ping:903498951586631680> | Bot Ping : \`${Date.now() - message.createdTimestamp}ms\` | Discord Ping : \`${Math.round(client.ws.ping)}ms\``)
    .setColor(ee.color)
    message.channel.send({ embeds: [mainmenu] })
  }
}