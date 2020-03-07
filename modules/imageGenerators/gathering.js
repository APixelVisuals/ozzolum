module.exports = async ({ classes, _ }, user, location, area, skill, durability, damage) => {

    //Get colors
    const colors = location.imageColors;

    //Create image
    const image = new classes.Image(_, {
        width: 1920,
        height: 873,
        backgroundColor: colors.background,
        accentColor: colors.accent,
        details: `locations/${location.name}`
    });

    //Add username + discriminator
    const username = image.text({
        text: user.username,
        font: "Roboto/Black.ttf",
        fontSize: 100,
        color: colors.accent
    });

    const discriminator = image.text({
        text: `#${user.discriminator}`,
        font: "Roboto/Black.ttf",
        fontSize: 35,
        color: colors.accent
    });

    image.composite(username.image, 960 - (((username.width + discriminator.width) + 170 + 15 + 5) / 2) + 170 + 15, 300);

    image.composite(discriminator.image, 960 - (((username.width + discriminator.width) + 170 + 15 + 5) / 2) + 170 + 15 + username.width + 5, 350);

    //Add avatar border
    image.circle({
        diameter: 170,
        color: colors.accent,
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

    //Add item
    image.item({
        item: area.primaryLoot,
        bgColor: colors.accentBG,
        borderColor: colors.accent,
        x: 337,
        y: 544,
        noItemName: true
    });

    //Add durability bar
    image.progressBar({
        width: 938,
        height: 54,
        amount: durability.amount,
        maxAmount: durability.maxAmount,
        bgColor: colors.accentBG,
        borderColor: colors.accent,
        fillColor: colors.progressBarFill,
        x: 572,
        y: 604
    });

    //Add skill
    image.text({
        text: skill,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: colors.accent,
        x: 587,
        y: 553
    });

    //Add location
    const locationText = image.text({
        text: location.name,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: colors.accent
    });

    image.composite(locationText.image, (1484 - locationText.width), 553);

    //Add area
    image.text({
        text: area.name,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: colors.accent,
        x: 587,
        y: 676
    });

    //Add durability
    const durabilityText = image.text({
        text: `${durability.amount}/${durability.maxAmount} Durability`,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: colors.accent
    });

    image.composite(durabilityText.image, (1484 - durabilityText.width), 676);

    //Add damage
    if (damage) {
        const damageText = image.text({
            text: `-${damage} Durability`,
            font: "Roboto/Italic.ttf",
            fontSize: 35,
            color: colors.accent
        });

        image.composite(damageText.image, 1030 - (damageText.width / 2), 750);
    }

    //Render + return
    return await image.render();
};