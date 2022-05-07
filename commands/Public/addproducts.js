const users = require('../../models/userSchema.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const moment = require('moment');

module.exports = {
  name: "addproduct",
  category: "Public",
  description: "Adds A Product To The User's Database",
  run: async (client, message, args, prefix) => {
    let product = args.join(' ')
    if (!product) {
        let embed = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`<:ah_error:903498826688655381> | Please Enter A Product. Ex : \`!addproduct Gaypal Logs\``)
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
                products: [product],
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
            .setAuthor("Skid Alert | Product", ee.footericon)
            .setColor(ee.color)
            .setDescription(`<:ah_success:903498816362258462> | Successfully Added \`${product}\` To Your Product List`)
            message.channel.send({ embeds: [embed]})
        } else {
            u.products.push(product)
            u.save()
                const mainmenu = new MessageEmbed()
                .setAuthor("Skid Alert | Product", ee.footericon)
                .setDescription(`<:ah_success:903498816362258462> | Successfully Added \`${product}\` To Your Product List`)
                .setColor(ee.color)
                message.channel.send({ embeds: [mainmenu] })
        }
    })
  }
 }
}
