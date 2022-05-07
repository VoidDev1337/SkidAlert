const users = require('../../models/userSchema.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const moment = require('moment');

module.exports = {
  name: "vouch",
  category: "Public",
  description: "Adds A Product To The User's Database",
  run: async (client, message, args, prefix) => {
    let argss = args.join(' ')
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (user.id === message.author.id) {
        let embed = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`<:ah_error:903498826688655381> Dumb, You Cant Vouch Yourself`)
        return message.channel.send({ embeds: [embed]})
    }
    const vouch = argss.split('> ')[1]
    console.log(vouch)
    if (!vouch) {
        let embed = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`<:ah_error:903498826688655381> Please Enter A Vouch, Ex : \`!vouch @Discord Legit Gay\``)
        message.channel.send({ embeds: [embed]})
    } else {
    
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
                vouches: [vouch],
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
            .setAuthor("Skid Alert | Vouch", ee.footericon)
            .setColor(ee.color)
            .setDescription(`<:ah_success:903498816362258462> | Successfully Added Vouch : \`${vouch}\``)
            message.channel.send({ embeds: [embed]})
        } else {
            u.vouches.push(vouch)
            u.positive += 1
            u.total += 1
            u.save()
            let embed = new MessageEmbed()
            .setAuthor("Skid Alert | Vouch", ee.footericon)
            .setColor(ee.color)
            .setDescription(`<:ah_success:903498816362258462> | Successfully Added Vouch : \`${vouch}\``)
            message.channel.send({ embeds: [embed]})
        }
    })
    }
  }
}