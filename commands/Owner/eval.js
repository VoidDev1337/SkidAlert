const { MessageEmbed, splitMessage } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { inspect } = require(`util`);


module.exports = {
    name: `eval`, category: `Owner`, aliases: [`evaluate`], description: `eval Command`,
    run: async (client, message, args) => {

      if (!config.ownerIDS.includes(message.author.id)) { const nope = new MessageEmbed() .setColor(ee.wrongcolor) .setDescription(`You are not allowed to run this command! Only Developers are allowed to run this command`); return message.channel.send({embeds: [nope]}) }
      const code = args.join(" ");

      if (!code) return message.channel.send("What do you want to evaluate?");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(`\`\`\`${evaled}\`\`\``)
          
  
    },
  };