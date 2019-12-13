module.exports = async ({ classes, _ }, user, location, area, skill, durability, damage) => {

    //Create image
    const image = new classes.Image(_, `assets/backgrounds/locations/${location} Small.png`);

    //Add username + discriminator
    const username = image.text({
        text: user.username,
        font: "Roboto/Black.ttf",
        fontSize: 100,
        color: "#8baf70"
    });

    const discriminator = image.text({
        text: `#${user.discriminator}`,
        font: "Roboto/Black.ttf",
        fontSize: 35,
        color: "#8baf70"
    });

    image.composite(username.image, 960 - (((username.width + discriminator.width) + 170 + 15 + 5) / 2) + 170 + 15, 300);

    image.composite(discriminator.image, 960 - (((username.width + discriminator.width) + 170 + 15 + 5) / 2) + 170 + 15 + username.width + 5, 350);

    //Add avatar border
    image.circle({
        diameter: 170,
        color: "#8baf70",
        x: 960 - (((username.width + discriminator.width) + 170 + 15) / 2),
        y: 247
    });

    //Add avatar
    await image.compositeAvatar({
        user,
        width: 150,
        height: 150,
        x: 960 - (((username.width + discriminator.width) + 170 + 15) / 2) + 10,
        y: 257
    });

    //Add durability bar
    image.progressBar({
        width: 924,
        height: 40,
        amount: durability.amount,
        maxAmount: durability.maxAmount,
        color: "#d0efb1",
        x: 509,
        y: 611
    });

    //Add skill
    image.text({
        text: skill,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: "#8baf70",
        x: 517,
        y: 553
    });

    //Add location
    const locationText = image.text({
        text: location,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: "#8baf70"
    });

    image.composite(locationText.image, (1414 - locationText.width), 553);

    //Add area
    image.text({
        text: area,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: "#8baf70",
        x: 517,
        y: 676
    });

    //Add durability
    const durabilityText = image.text({
        text: `${durability.amount}/${durability.maxAmount} Durability`,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: "#8baf70"
    });

    image.composite(durabilityText.image, (1414 - durabilityText.width), 676);

    //Add damage
    if (damage) {
        const damageText = image.text({
            text: `-${damage} Durability`,
            font: "Roboto/Italic.ttf",
            fontSize: 35,
            color: "#8baf70"
        });

        image.composite(damageText.image, 960 - (damageText.width / 2), 750);
    }

    //Render + return
    return await image.render();
};