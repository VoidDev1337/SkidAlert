const users = require('../../models/userSchema.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const config = require("../../botconfig/config.json");
const moment = require('moment');

module.exports = {
  name: "setrank",
  category: "Owner",
  description: "Adds A Rank To The User",
  run: async (client, message, args, prefix) => {
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      let rank = args[1]

      if (!config.ownerIDS.includes(message.author.id)) { const nope = new MessageEmbed() .setColor(ee.wrongcolor) .setDescription(`You are not allowed to run this command! Only Developers are allowed to run this command`); return message.channel.send({embeds: [nope]}) }
      if (!user) return message.reply(`Perhaps, You Forgot To Mention an User ?`)
      if (!rank) return message.reply(`Perhaps, You Forgot To Mention a Rank ?`)

      switch (rank) {
          case "developer":
            users.findOne({ userID: user.id }, async (err, u) => {  if (!u) { const newUser = new users({ userID: user.id, isskid: false, isscammer: false, reason: '', reportby: '', developer: true, supporter: false, trusted: false, middleman: false, member: false, owner: false, vouches: [], products: [], positive: 0, negative: 0, total: 0, shop: '', forum: '', discord: '', banner: '' }); newUser.save().catch(e => console.log(e)); } else { u.developer = true; u.save() } })
              break;
          case "supporter":
            users.findOne({ userID: user.id }, async (err, u) => {  if (!u) { const newUser = new users({ userID: user.id, isskid: false, isscammer: false, reason: '', reportby: '', developer: false, supporter: true, trusted: false, middleman: false, member: false, owner: false, vouches: [], products: [], positive: 0, negative: 0, total: 0, shop: '', forum: '', discord: '', banner: '' }); newUser.save().catch(e => console.log(e)); } else { u.supporter = true; u.save() } })
                break;
          case "trusted":
            users.findOne({ userID: user.id }, async (err, u) => {  if (!u) { const newUser = new users({ userID: user.id, isskid: false, isscammer: false, reason: '', reportby: '', developer: false, supporter: false, trusted: true, middleman: false, member: false, owner: false, vouches: [], products: [], positive: 0, negative: 0, total: 0, shop: '', forum: '', discord: '', banner: '' }); newUser.save().catch(e => console.log(e)); } else { u.trusted = true; u.save() } })
                break;
          case "middleman":
            users.findOne({ userID: user.id }, async (err, u) => {  if (!u) { const newUser = new users({ userID: user.id, isskid: false, isscammer: false, reason: '', reportby: '', developer: false, supporter: false, trusted: false, middleman: true, member: false, owner: false, vouches: [], products: [], positive: 0, negative: 0, total: 0, shop: '', forum: '', discord: '', banner: '' }); newUser.save().catch(e => console.log(e)); } else { u.middleman = true; u.save() } })
                break;
          case "member":
            users.findOne({ userID: user.id }, async (err, u) => {  if (!u) { const newUser = new users({ userID: user.id, isskid: false, isscammer: false, reason: '', reportby: '', developer: false, supporter: false, trusted: false, middleman: false, member: true, owner: false, vouches: [], products: [], positive: 0, negative: 0, total: 0, shop: '', forum: '', discord: '', banner: '' }); newUser.save().catch(e => console.log(e)); } else { u.member = true; u.save() } })
                break;
          case "owner":
            users.findOne({ userID: user.id }, async (err, u) => {  if (!u) { const newUser = new users({ userID: user.id, isskid: false, isscammer: false, reason: '', reportby: '', developer: false, supporter: false, trusted: false, middleman: false, member: false, owner: true, vouches: [], products: [], positive: 0, negative: 0, total: 0, shop: '', forum: '', discord: '', banner: '' }); newUser.save().catch(e => console.log(e)); } else { u.owner = true; u.save() } })
                break;
          case "skid":
            users.findOne({ userID: user.id }, async (err, u) => {  if (!u) { const newUser = new users({ userID: user.id, isskid: true, isscammer: false, reason: '', reportby: '', developer: false, supporter: false, trusted: false, middleman: false, member: false, owner: false, vouches: [], products: [], positive: 0, negative: 0, total: 0, shop: '', forum: '', discord: '', banner: '' }); newUser.save().catch(e => console.log(e)); } else { u.isskid = true; u.save() } })
                break;
          case "scammer":
            users.findOne({ userID: user.id }, async (err, u) => {  if (!u) { const newUser = new users({ userID: user.id, isskid: false, isscammer: true, reason: '', reportby: '', developer: false, supporter: false, trusted: false, middleman: false, member: false, owner: false, vouches: [], products: [], positive: 0, negative: 0, total: 0, shop: '', forum: '', discord: '', banner: '' }); newUser.save().catch(e => console.log(e)); } else { u.isscammer = true; u.save() } })
                break;
      }
      
      const mainmenu = new MessageEmbed()
      .setAuthor("Skid Alert | Set Discord", ee.footericon)
      .setDescription(`<:ah_success:903498816362258462> | Successfully added the role to the user`)
      .setColor(ee.color)
      return message.channel.send({ embeds: [mainmenu] })

  }
}