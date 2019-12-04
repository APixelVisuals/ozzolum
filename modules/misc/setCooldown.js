module.exports = ({ client, cooldowns }, message) => {

    if (message.author.id !== client.apixel.id) cooldowns.set(message.author.id, Date.now() + 2000);
};