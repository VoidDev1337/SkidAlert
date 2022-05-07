const users = require('../../models/userSchema.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const moment = require('moment');

module.exports = {
  name: "profile",
  category: "Public",
  description: "Shows Profile Of The User",
  run: async (client, message, args, prefix) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
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
            .setAuthor(`User's Profile`, user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setDescription(`
**User ID** : \`${user.id}\`
**Created** : ${moment(user.user.createdAt).format('MMM DD YYYY')}
**Mention** : <@${user.id}>
**Ranks** : \`None\`
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
**<:bravery:903499146592415764> Vouch Information**
> Positive : \`0\` Negative : \`0\` Total : \`0\`
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
**<:rules:903501136504438804> Services and Products**
> Shop : \`Set this!\`
> Discord : \`Set this!\`
> Forum : \`Set this!\`
> Products : \`Add your products!\`
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
**<:ah_success:903498816362258462> Past 5 Vouches**
> \`No Comments Available\`
`)
            .setThumbnail(ee.footericon)
            .setColor(ee.color)
            message.channel.send({ embeds: [embed] })
        } else {

            let products;
            console.log(u.products.length)
            if (u.products.length === 0) {
                products = `\`Add your products!\``
            } else if (u.products.length === 1 ) {
                products = `\n> \`${u.products[0]}\``
            } else if (u.products.length === 2 ) {
                products = `\n> \`${u.products[0]}\`\n> \`${u.products[1]}\``
            } else if (u.products.length === 3 ) {
                products = `\n> \`${u.products[0]}\`\n> \`${u.products[1]}\`\n> \`${u.products[2]}\``
            } else if (u.products.length === 4 ) {
                products = `\n> \`${u.products[0]}\`\n> \`${u.products[1]}\`\n> \`${u.products[2]}\`\n> \`${u.products[3]}\``
            } else if (u.products.length === 5 || u.products.length >= 5 ) {
                products = `\n> \`${u.products[0]}\`\n> \`${u.products[1]}\`\n> \`${u.products[2]}\`\n> \`${u.products[3]}\`\n> \`${u.products[4]}\``
            }
            let past5;
            if (u.vouches.length === 0) {
                past5 = '> \`No Comments Available\`'
            } else if (u.vouches.length === 1 ) {
                past5 = `\n> \`${u.vouches[0]}\``
            } else if (u.vouches.length === 2 ) {
                past5 = `\n> \`${u.vouches[0]}\`\n> \`${u.vouches[1]}\``
            } else if (u.vouches.length === 3 ) {
                past5 = `\n> \`${u.vouches[0]}\n> \`${u.vouches[1]}\n> \`${u.vouches[2]}\``
            } else if (u.vouches.length === 4 ) {
                past5 = `\n> \`${u.vouches[0]}\`\n> \`${u.vouches[1]}\`\n> \`${u.vouches[2]}\`\n> \`${u.vouches[3]}\``
            } else if (u.vouches.length === 5 || u.vouches.length >= 5 ) {
                past5 = `\n> \`${u.vouches[0]}\`\n> \`${u.vouches[1]}\`\n> \`${u.vouches[2]}\`\n> \`${u.vouches[3]}\`\n> \`${u.vouches[4]}\``
            }

            let rank;
            rank = ""
            if (u.developer) rank += '<:2discordbotdev:966629270602547240> \`Developer\` '
            if (u.supporter) rank += '<:2earlysupporter:966629172875247638> \`Supporter\` ' 
            if (u.trusted) rank += '<:2colorserververified:966629455466491904> \`Trusted\` '
            if (u.middleman) rank += '<:2vip:966629822929469440> \`Middleman\`'
            if (u.member) rank += '<:2join:966630026017648690> \`Member\`'
            if (u.owner) rank += '<:owner_crown:966630103872311346> \`Bot Owner\`'
            else rank += "`None`"

            let shop;
            if (!u.shop) shop = `\`No Shop Name Set!\``
            else shop = `\`${u.shop}\``;

            let discord;
            if (!u.discord) discord = `\`No Discord Link Set!\``
            else discord = `[\`Click Me\`](${u.discord})`;

            let forum;
            if (!u.forum) forum = `\`No Forum Link Set!\``
            else forum = `[\`Click Me\`](${u.forum})`;

            let embed = new MessageEmbed()
            .setAuthor(`User's Profile`, user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setDescription(`
**User ID** : \`${user.id}\`
**Created** : ${moment(user.user.createdAt).format('MMM DD YYYY')}
**Mention** : <@${user.id}>
**Ranks** : ${rank}
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
**<:bravery:903499146592415764> Vouch Information**
> Positive : \`${u.positive}\` Negative : \`${u.negative}\` Total : \`${u.total}\`
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
**<:rules:903501136504438804> Services and Products**
> Shop : ${shop}
> Discord : ${discord}
> Forum : ${forum}
> Products : ${products}
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
**<:ah_success:903498816362258462> Past 5 Vouches**
${past5}
`)
            .setThumbnail(ee.footericon)
            .setImage(u.banner)
            .setColor(ee.color)
            message.channel.send({ embeds: [embed] })
        }
    })
  }
}