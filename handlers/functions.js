const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const emoji = require("../botconfig/emojis.json");
const ee = require("../botconfig/embed.json");
module.exports.escapeRegex = escapeRegex;

function escapeRegex(str) {
    try {
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }