const users = require('../../models/userSchema.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const moment = require('moment');

module.exports = {
  name: "setbanner",
  category: "Public",
  description: "Sets The Profile Banner Of The User",
  run: async (client, message, args, prefix) => {
    let banner = args[0]
    if (!banner) {
        let embed = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`<:ah_error:903498826688655381> | Please Enter A Forum Link. Ex : \`!setbanner https://images.google.com/randomimage\``)
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
                discord: '',
                banner: banner
            });
            newUser.save().catch(e => console.log(e));
            const mainmenu = new MessageEmbed()
            .setAuthor("Skid Alert | Set Banner", ee.footericon)
            .setDescription(`<:ah_success:903498816362258462> | Successfully Set The Banner To \`${banner}\``)
            .setColor(ee.color)
            message.channel.send({ embeds: [mainmenu] })
        } else {
            u.banner = banner;
            u.save()
            const mainmenu = new MessageEmbed()
            .setAuthor("Skid Alert | Set Banner", ee.footericon)
            .setDescription(`<:ah_success:903498816362258462> | Successfully Set The Banner To \`${banner}\``)
            .setColor(ee.color)
            message.channel.send({ embeds: [mainmenu] })

        }
    })
    }
  }
}