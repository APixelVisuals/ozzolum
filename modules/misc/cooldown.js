module.exports = ({ client, cooldowns }, message) => {

    const cooldownCheck = cooldowns.get(message.author.id);
    if ((cooldownCheck) && (cooldownCheck > Date.now())) {

        message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  That's a lot of commands! Please wait another ${Math.ceil((cooldownCheck - Date.now()) / 1000)} seconds**`);

        return false;
    }

    return true;
};