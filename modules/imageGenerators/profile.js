module.exports = async ({ classes, _ }, user, playerData) => {

    //Create image
    const image = new classes.Image(_, {
        width: 1920,
        height: 1080,
        backgroundColor: "#b57a53",
        accentColor: "#7b4b35",
        details: "profile"
    });

    //Add avatar border
    await image.circle({
        diameter: 226,
        color: "#7b4b35",
        x: 332,
        y: 277
    });

    //Add avatar
    await image.compositeAvatar({
        user,
        width: 200,
        height: 200,
        x: 345,
        y: 290
    });

    //Add username
    const username = image.text({
        text: user.username,
        font: "Roboto/Black.ttf",
        fontSize: 100,
        color: "#7b4b35",
        x: 588,
        y: 318
    });

    //Add discriminator
    image.text({
        text: `#${user.discriminator}`,
        font: "Roboto/Black.ttf",
        fontSize: 35,
        color: "#7b4b35",
        x: 588 + username.width + 5,
        y: 368
    });

    //Add health bar
    image.progressBar({
        width: 735,
        height: 45,
        amount: playerData.health,
        maxAmount: playerData.maxHealth,
        bgColor: "#6c1313",
        borderColor: "#7b4b35",
        fillColor: "#c62727",
        x: 593,
        y: 435
    });

    //Add health
    const health = image.text({
        text: `${playerData.health}/${playerData.maxHealth}`,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: "#c62727"
    });

    image.composite(health.image, (1301 - health.width), 498);

    image.composite("assets/misc/heart.png", (1301 - health.width) - 32 - 10, 494);

    //Add sword icon
    image.composite("assets/misc/sword.png", 504, 687);

    //Add fighting level
    const fightingLevel = image.text({
        text: `Level ${playerData.fighting.level}`,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: "#7b4b35"
    });

    image.composite(fightingLevel.image, (1301 - fightingLevel.width), 652);

    //Add fighting xp bar
    image.progressBar({
        width: 735,
        height: 45,
        amount: playerData.fighting.xp,
        maxAmount: (playerData.fighting.level * 50) + 50,
        bgColor: "#563424",
        borderColor: "#7b4b35",
        fillColor: "#a0694b",
        x: 593,
        y: 703
    });

    //Add fighting xp
    const fighting = image.text({
        text: `${playerData.fighting.xp}/${(playerData.fighting.level * 50) + 50} XP`,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: "#7b4b35"
    });

    image.composite(fighting.image, (1301 - fighting.width), 766);

    //Add ozzolites
    const ozzolites = image.text({
        text: `${playerData.ozzolites} Ozzolites`,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: "#7b4b35"
    });

    image.composite(ozzolites.image, 960 - ((ozzolites.width + 64 + 15) / 2) + 64 + 15, 913);

    image.composite("assets/misc/ozzoliteLarge.png", 960 - ((ozzolites.width + 64 + 15) / 2), 898);

    //Render + return
    return await image.render();
};