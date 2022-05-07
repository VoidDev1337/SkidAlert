const users = require('../../models/userSchema.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const moment = require('moment');

module.exports = {
  name: "vouches",
  category: "Public",
  description: "Shows The Vouches Of The User",
  run: async (client, message, args, prefix) => {
    let shop = args.join(' ')

        
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
                banner: ''
            });
            newUser.save().catch(e => console.log(e));
            let embed = new MessageEmbed()
            .setAuthor("Skid Alert | Vouches", ee.footericon)
            .setColor(ee.color)
            .setDescription(`<:ah_error:903498826688655381> | You Have \`0\` Vouches`)
            message.channel.send({ embeds: [embed]})
        } else {
            if (u.vouches.length === 0) {
                let embed = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`<:ah_error:903498826688655381> | You Have \`0\` Vouches`)
                message.channel.send({ embeds: [embed]})
            } else {
                const mainmenu = new MessageEmbed()
                .setAuthor("Skid Alert | Vouches", ee.footericon)
                .setDescription(`<:ah_success:903498816362258462> | You Have \`${u.vouches.length}\` Vouches. [Click Me](https://skidalert.org/vouches?userid=${user.id}) To Export All Vouches!`)
                .setColor(ee.color)
                message.channel.send({ embeds: [mainmenu] })
            }
        }
    })
  }
}
