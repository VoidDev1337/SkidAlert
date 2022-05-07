const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "report",
  description: "Uhm.... ",
  run: async (client, message, args) => {

    const mainmenu = new MessageEmbed()
    .setAuthor("Report!", ee.footericon)
    .setDescription(`<a:ah_ping:903498951586631680> | Want To Report A \`Scammer/Skid\` ? [Click Me](https://discord.gg/skidalert)`)
    .setColor(ee.color)
    message.channel.send({ embeds: [mainmenu] })

  }
}