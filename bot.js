const Discord = require("discord.js"); 
const { Intents, WebhookClient , Collection, MessageButton, MessageActionRow, MessageEmbed, MessageSelectMenu} = require("discord.js");
const colors = require("colors"); 
const fs = require("fs"); 
require('discord-reply'); 
const config = require("./botconfig/config.json");
const ee = require("./botconfig/embed.json");
const fetch = require("node-fetch");
const mongoose = require("mongoose")
const { readdirSync } = require("fs")
const axios = require("axios");
const { channel } = require("diagnostics_channel");

const intents = new Intents([
  "GUILD_MEMBERS" 
]);


// Extented Version Of Client:
const client = new Discord.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_MEMBERS,
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    presence: {
      status: "idle",
      activities: [{
        name: "Void Daddy UwU",
        type: "LISTENING"
      }]
    },
    ws: { intents },
    fetchAllMembers: false,
    restTimeOffset: 0,
    shards: "auto",
    restWsBridgetimeout: 100,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
  });

// Events Emitter For Events Idk If Important
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(100);

//Loading Handlers Lmao
["clientvariables", "command", "events"].forEach(handler => { 
    require(`./handlers/${handler}`)(client);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId == "buy-ticket") {
    if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
      return interaction.reply({
        content: 'You Already Have A Ticket!',
        ephemeral: true
      });
    }

    interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
      topic: interaction.user.id,
      permissionOverwrites: [
        { id: interaction.user.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'], },
        { id: interaction.guild.roles.everyone, deny: ['VIEW_CHANNEL'], }, ],
        type: 'GUILD_TEXT',
      }).then(async channel => {
        interaction.reply({
          content: `Successfully Created Ticket <#${channel.id}>`,
          ephemeral: true
        });
    
        let embed = new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`
• Please mention what you wanna buy!
• Make sure you drop your offer if you want something will be easy for us.
• Guild's Newbies and Trusted Sellers will assist you shortly
• Check One's role before dealing with him
• We highly recommend you to use MM with everyone even owners.
• Also It Is Mendatory to deal within tickets to prevent dm scams.`)
        .setFooter('Powered By SkidAlert!')
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('close-ticket')
          .setLabel('Delete Ticket')
          .setStyle('SECONDARY')
          .setEmoji('📤')
        );
        channel.send({
          content: `Hey ${interaction.user}, Thanks For Creating Ticket! Guild's Staff Will Assist You Soon!`,
          embeds: [embed],
          components: [row]
        })

    })
  }

  if (interaction.customId == "mmticket") {
    if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
      return interaction.reply({
        content: 'You Already Have A Ticket!',
        ephemeral: true
      });
    }

    interaction.guild.channels.create(`mm-${interaction.user.username}`, {
      topic: interaction.user.id,
      permissionOverwrites: [
        { id: interaction.user.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'], },
        { id: interaction.guild.roles.everyone, deny: ['VIEW_CHANNEL'], }, ],
        type: 'GUILD_TEXT',
      }).then(async channel => {
        interaction.reply({
          content: `Successfully Created Ticket <#${channel.id}>`,
          ephemeral: true
        });

        let embed = new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`• Hey User Thanks For Creating Ticket! Please Wait For A Middleman To Check Your Ticket!`)
        .setFooter('Powered By SkidAlert!')
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('close-ticket')
          .setLabel('Delete Ticket')
          .setStyle('SECONDARY')
          .setEmoji('📤')
        );
        channel.send({
          content: `Hey ${interaction.user}`,
          embeds: [embed],
          components: [row]
        })
      })
    }
    if (interaction.customId == "close-ticket") {
      interaction.channel.delete()
      interaction.user.send('Ticket Closed, Thanks For Using Skid Alert!')
    }
})

mongoose.connect(config.mongo, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
  }).then(() => {
        client.login(config.token)
})
  

// Handing Errors
process.on('unhandledRejection', (error) => {
    console.log(error)
  });
  process.on("uncaughtException", (err, origin) => {
    console.log(err)
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(err)
  });
  process.on('beforeExit', (code) => {
    console.log(code)
  });
  process.on('exit', (code) => {
    console.log(code)
  });
  process.on('multipleResolves', (type, promise, reason) => {
  }); 