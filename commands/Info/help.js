const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "help",
  category: "Info",
  description: "Shows The Help Menu Ig",
  run: async (client, message, args, prefix) => {

    const mainmenu = new MessageEmbed()
    .setAuthor("Skid Alert Help Panel", ee.footericon)
    .setThumbnail(ee.footericon)
    .setDescription(`A Shop/Vouch Bot Which Manages Your Shop And Saves You From Skids/Scammers.`)
    .addField(`● Guild [7]`, `\`addmiddleman\`, \`addseller\`, \`addtrusted\`, \`removetrusted\`, \`removeseller\`, \`removemm\`, \`settings\``)
    .addField(`● Tickets [4]`, `\`setbuychannel\`, \`setmmchannel\`, \`adduser\`, \`removeuser\``)
    .addField(`● Public [7]`, `\`profile\`, \`setdiscord\`, \`setforum\`, \`setbanner\`, \`setshop\`, \`vouches\`, \`addproduct\``)
    .addField(`● Vouch Command [2]`, `\`vouch\`, \`report\``)
    .addField(`● Info [5]`, `\`help\`, \`invite\`, \`ping\`, \`stats\`, \`uptime\``)
    .addField(`● Owner [5]`, `\`eval\`, \`setrank\`, \`trustedguild\`, \`reload\`, \`exec\``)
    .addField(`● Links [2]`, `[\`Support Server\`](https://discord.gg/skidalert) | [\`Invite Me\`](https://discord.com/api/oauth2/authorize?client_id=965556119676268544&permissions=8&scope=bot) | [\`Source Code\`](https://github.com/VoidDev1337/SkidAlert)`)
    .setColor(ee.color)
    .setFooter(`Total Commands : 28`)

  message.channel.send({ embeds: [mainmenu] })
  }
}