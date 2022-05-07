const users = require('../../models/userSchema.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const moment = require('moment');

module.exports = {
  name: "setdiscord",
  category: "Public",
  description: "Sets The Discord Of The User",
  run: async (client, message, args, prefix) => {
    let discord = args[0]
    if (!discord) {
        let embed = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`<:ah_error:903498826688655381> | Please Enter A Discord Link. Ex : \`!setdiscord https://discord.gg/skidalert\``)
        message.channel.send({ embeds: [embed]})
    } else {
        
    const user = message.member;
    users.findOne({ userID: user.id }, async (err, u) => { 
        if (!u) {
            const newUser = new users({
                userID: user.id,
                isskid: false,
                isscammer: false,
                reason: '',
                reportby: '',
                developer: false,
                supporter: false,
                trusted: false,
                middleman: false,
                member: false,
                owner: false,
                vouches: [],
                products: [],
                positive: 0,
                negative: 0,
                total: 0,
                shop: '',
                forum: '',
                discord: discord,
                banner: ''
            });
            newUser.save().catch(e => console.log(e));
            const mainmenu = new MessageEmbed()
            .setAuthor("Skid Alert | Set Discord", ee.footericon)
            .setDescription(`<:ah_success:903498816362258462> | Successfully Set The Discord To \`${discord}\``)
            .setColor(ee.color)
            message.channel.send({ embeds: [mainmenu] })
        } else {
            u.discord = discord;
            u.save()
            const mainmenu = new MessageEmbed()
            .setAuthor("Skid Alert | Set Discord", ee.footericon)
            .setDescription(`<:ah_success:903498816362258462> | Successfully Set The Discord To \`${discord}\``)
            .setColor(ee.color)
            message.channel.send({ embeds: [mainmenu] })

        }
    })
    }
  }
}