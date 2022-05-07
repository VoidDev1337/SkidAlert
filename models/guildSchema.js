const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    //Guild Things
    GuildID: Number,
    //Ticket Handlers!
    Middlemans: Array,
    Sellers: Array,
    Trusteds: Array,
    
    ticketactive: Boolean,
    mmactive: Boolean,
    //TicketChannels
    TicketChannel: Number,
    MiddlemanTick: Number,
    //Guild Rankings
    TrustedGuild: Boolean
});

module.exports = mongoose.model('guildProfile-skid_alert', guildSchema);