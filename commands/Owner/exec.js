const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { inspect } = require(`util`);
const util = require('util');
const exec = util.promisify(require('child_process').exec);
  
  module.exports = {
    name: `execute`, category: `Owner`, description: `exec Command`,
    run: async (client, message, args) => {

      if (!config.ownerIDS.includes(message.author.id)) { const nope = new MessageEmbed() .setColor(ee.wrongcolor) .setDescription(`You are not allowed to run this command! Only Developers are allowed to run this command`); return message.channel.send({embeds: [nope]}) }

      let command = args.join(' ');
      const { stdout } = await exec(command);
      message.reply(stdout.toString())
  
      }
} 
  