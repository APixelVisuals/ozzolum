module.exports = async ({ classes, _ }, user) => {

    //Create image
    const image = new classes.Image(_, {
        width: 1920,
        height: 1080,
        backgroundColor: "#ffb32c",
        accentColor: "#ad7700",
        details: "welcome"
    });

    //Add avatar border
    await image.circle({
        diameter: 276,
        color: "#936500",
        x: 362,
        y: 312
    });

    //Add avatar
    await image.compositeAvatar({
        user,
        width: 250,
        height: 250,
        x: 375,
        y: 325
    });

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

    //Add "welcome to" text
    image.text({
        text: "Welcome to",
        font: "Roboto/Bold Condensed Italic.ttf",
        fontSize: 70,
        color: "#936500",
        x: 700,
        y: 517
    });

    //Add "ozzolum" text
    image.text({
        text: "Ozzolum",
        font: "Uni Sans/Uni Sans.otf",
        fontSize: 170,
        color: "#936500",
        x: 700,
        y: 593
    });

    //Render + return
    return await image.render();
};