module.exports = async ({ classes, _ }, user) => {

    //Create image
    const image = new classes.Image(_, "assets/welcomeImage/background.png");

    //Add avatar
    await image.compositeAvatar(user, 375, 325);

    //Add username
    const username = image.text({
        text: user.username,
        font: "Roboto/Condensed.ttf",
        fontSize: 85,
        color: "#936500",
        x: 700,
        y: 365
    });

    //Add discriminator
    image.text({
        text: `#${user.discriminator}`,
        font: "Roboto/Condensed.ttf",
        fontSize: 35,
        color: "#936500",
        x: 700 + username.width + 5,
        y: 405
    });

    //Render + return
    return await image.render();
};