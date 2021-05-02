const messages = [];
const datetime = new Date();

const addMessage = (fromUserId, toUserId, messageData) => {
    const message = {"fromUserId":fromUserId, "toUserId":toUserId, "messageData":messageData, "timestamp":datetime.getTime()}
    messages.push(message)
    return message
} 

const getMessages = (userId1, userId2) => {
    return messages.filter((message) => (message.fromUserId==userId1&&message.toUserId==userId2) || (message.fromUserId==userId2&&message.toUserId==userId1));
}

module.exports = { addMessage, getMessages }