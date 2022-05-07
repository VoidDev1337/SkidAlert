const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userID: Number,
    //Special Tags
    isskid: Boolean,
    isscammer: Boolean,
    reason: String,
    reportby: String,
    //Ranks
    developer: Boolean,
    supporter: Boolean,
    trusted: Boolean,
    middleman: Boolean,
    member: Boolean,
    owner: Boolean,
    //Vouches Array
    vouches: Array,
    products: Array,
    positive: Number,
    negative: Number,
    total: Number,
    //Others
    bio: String,
    forum: String,
    discord: String,
    banner: String
});

module.exports = mongoose.model('userProfile-skid_alert', userSchema);