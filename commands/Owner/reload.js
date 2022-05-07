const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
module.exports = {
    name: `reload`,
    category: `Owner`,
    description: `Reloads a command`,
    run: async (client, message, args) => {

      if (!config.ownerIDS.includes(message.author.id)) {
        const nop = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`You are not allowed to run this command! Only Developers Are allowed to run this command`)
        return message.channel.send({embeds: [nop]})
      }

        let reload = false;
        for (let i = 0; i < client.categories.length; i += 1) {
          let dir = client.categories[i];
          try {
            if (!args[0]) {
              const opp = new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setDescription(`${emoji.msg.ERROR} Please include an argument`)
              return message.channel.send({embeds: [opp]})
            }

            delete require.cache[require.resolve(`../../commands/${dir}/${args[0]}.js`)] // usage !reload <name>
            client.commands.delete(args[0])
            const pull = require(`../../commands/${dir}/${args[0]}.js`)
            client.commands.set(args[0], pull)
            reload = true;
          } catch {}
        }

        if (reload) {  const op = new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`Reloaded \`${args[0]}\``)
          return message.channel.send({embeds: [op]})
        }
        const notop = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`Could not reload: \`${args[0]}\``)
      
    },
  };