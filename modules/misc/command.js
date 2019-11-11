module.exports = async ({ classes, models, util, _ }, message, command) => {

    //Get data
    const userData = await models.users.findByIdAndUpdate(message.author.id, {}, { upsert: true, setDefaultsOnInsert: true, new: true });
    message.author.player = new classes.Player(userData);

    //Run command
    await command(_, message);

    //Save data
    await util.save(_, message.author.player.getData());
};