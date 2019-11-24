module.exports = async ({ classes, _ }, user, playerData) => {

    //Create image
    const image = new classes.Image(_, "assets/profileBG.png");

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
        width: 721,
        height: 31,
        amount: playerData.health,
        maxAmount: playerData.maxHealth,
        color: "#c62727",
        x: 600,
        y: 442
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

    //Add battle level
    const battleLevel = image.text({
        text: `Level ${playerData.battleXP.level}`,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: "#7b4b35"
    });

    image.composite(battleLevel.image, (1301 - battleLevel.width), 652);

    //Add battle xp bar
    image.progressBar({
        width: 721,
        height: 31,
        amount: playerData.battleXP.xp,
        maxAmount: (playerData.battleXP.level * 50) + 200,
        color: "#a0694b",
        x: 600,
        y: 710
    });

    //Add battle xp
    const battleXP = image.text({
        text: `${playerData.battleXP.xp}/${(playerData.battleXP.level * 50) + 200} XP`,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: "#7b4b35"
    });

    image.composite(battleXP.image, (1301 - battleXP.width), 766);

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