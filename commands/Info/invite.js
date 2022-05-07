const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "invite",
  category: "Info",
  description: "Sends The Invite Link Of The Bot",
  run: async (client, message, args, prefix) => {

    const mainmenu = new MessageEmbed()
    .setAuthor("Invite Skid Alert!", ee.footericon)
    .setThumbnail(ee.footericon)
    .setDescription(`[\`Support Server\`](https://discord.gg/skidalert) | [\`Invite Me!\`](https://discord.com/api/oauth2/authorize?client_id=965556119676268544&permissions=8&scope=bot) | [\`Source Code!\`](https://github.com/VoidDev1337/SkidAlert)`)
    .setColor(ee.color)
    message.channel.send({ embeds: [mainmenu] })
  }
}