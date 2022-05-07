const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { cpu, os } = require('node-os-utils');
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "stats",
  category: "Info",
  description: "Shows The Stats Of The Bot",
  run: async (client, message, args, prefix) => {


    // Infos/Variables xD
    let totalSeconds = message.client.uptime / 1000; let days = Math.floor(totalSeconds / 86400); totalSeconds %= 86400; let hours = Math.floor(totalSeconds / 3600); totalSeconds %= 3600; let minutes = Math.floor(totalSeconds / 60); let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days}:${hours}:${minutes}:${seconds}`;
    let users = 0;
    client.guilds.cache.forEach(guild => { users += guild.memberCount; })
    let memusage = process.memoryUsage();
    let systemstats = `\`\`\`\n> Node.js    :: v16.6.13\n> Memory     :: ${Math.round(memusage.heapUsed / 1024 / 1024)}/${Math.round(memusage.heapTotal / 1024 / 1024)}mb\n> Platform   :: ${await os.oos()}\n> CPU        :: ${cpu.model()}\`\`\``
    let generalstats = `\`\`\`\n> Version    :: v0.1.0\n> Servers    :: ${message.client.guilds.cache.size.toLocaleString()}\n> Users      :: ${users.toLocaleString()}\n> Uptime     :: ${uptime}\n\`\`\``
    let developers = `\`\`\`\n> Developer  :: Void.#1337\n> Owners     :: Terminal#3974\n> Founder    :: - ZGoD.៹🖤#0069\n\`\`\``
    
    const mainmenu = new MessageEmbed()
    .setAuthor(client.user.tag, ee.footericon)
    .addField(`<:slash:905900735387037707> General Stats :`, `${systemstats}`)
    .addField(`<:a_moderation:903499023602819102> System Stats:`, `${generalstats}`)
    .addField(`<:botdev:903499064086241310> SkidAlert Team :`, `${developers}`)
    .setFooter(ee.footertext, ee.footericon)
    .setColor(ee.color)

    message.channel.send({ embeds: [mainmenu] })
  }
}