module.exports = async ({ client, Discord, _ }, image) => {

    //Get next upload channel
    const nextUploadChannel = client.uploadChannels[_.nextUploadChannel];

    //Increment next upload channel
    _.nextUploadChannel = _.nextUploadChannel === (client.uploadChannels.length - 1) ? 0 : _.nextUploadChannel + 1;

    //Upload image
    const m = await nextUploadChannel.send(new Discord.Attachment(image, "Qq36Rxe775cQ3vknjA7X.jpg"));

    //Return
    return m.attachments.array()[0].url;
};