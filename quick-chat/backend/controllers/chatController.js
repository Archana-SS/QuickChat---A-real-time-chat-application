const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Chat = require('./../models/chat');

router.post('/create-new-chat', authMiddleware, async (req, res) => {
    try{
        const chat = new Chat(req.body);
        const savedChat = await chat.save();

        //await savedChat.populate('members');

        res.status(201).send({
            message: 'Chat created successfully',
            success: true,
            data: savedChat
        })
    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
})

router.get('/get-all-chats', authMiddleware, async (req, res) => {
    try{
        const allChats = await Chat.find({members: {$in: req.body.userId}})
                                    //.populate('members')
                                    //.populate('lastMessage')
                                    //.sort({updatedAt: -1});

        res.status(200).send({
            message: 'Chat fetched successfully',
            success: true,
            data: allChats
        })
    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
});

module.exports = router;