const Message = require('../models/message');

const getChat = async (req, res) => {
    const id = req.uid;
    const messagesFrom = req.params.from

    const last30 = await Message.find({
        $or: [
            {from: id, to: messagesFrom},
            {from: messagesFrom, to: id}
        ]
    })
    .sort({ createdAt: 'asc'})
    .limit(30);

    res.json({
        ok: true,
        messages: last30
    });
}

module.exports = {
    getChat
}