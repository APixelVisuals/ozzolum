module.exports = async ({ client, cooldowns }, message, cooldown) => {

    //Check if cooldown is done
    const cooldownCheck = cooldowns.get(message.author.id);
    if ((cooldownCheck) && (cooldownCheck > Date.now())) {

        message.channel.send(`:x:  **|  That's a lot of commands! Please wait another ${Math.ceil((cooldownCheck - Date.now()) / 1000)} seconds**`);

        return false;
    }

    //Set cooldown
    if (message.author.id !== client.apixel.id) cooldowns.set(message.author.id, Date.now() + cooldown);

    return true;
};