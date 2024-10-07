const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    plan: { type: String, required: true },
    usage: [{ type: Object }],
    payments: [{ type: Object }]
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;