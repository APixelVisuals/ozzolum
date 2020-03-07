module.exports = async ({ classes, _ }, user, location, skill, loot, xpGain) => {

    //Get colors
    const colors = location.imageColors;

    //Create image
    const image = new classes.Image(_, {
        width: 1920,
        height: 931 + (Math.ceil(loot.length / 5) * 320),
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

    //Add skill xp bar
    image.progressBar({
        width: 938,
        height: 54,
        amount: skill.xp,
        maxAmount: (skill.level * 50) + 50,
        bgColor: colors.accentBG,
        borderColor: colors.accent,
        fillColor: colors.progressBarFill,
        x: 509,
        y: 611
    });

    //Add skill name
    image.text({
        text: skill.name,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: colors.accent,
        x: 517,
        y: 553
    });

    //Add skill level
    const level = image.text({
        text: `Level ${skill.level}`,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: colors.accent
    });

    image.composite(level.image, (1414 - level.width), 553);

    //Add location
    image.text({
        text: location.name,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: colors.accent,
        x: 517,
        y: 676
    });

    //Add skill xp
    const xp = image.text({
        text: `${skill.xp}/${(skill.level * 50) + 50} XP`,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: colors.accent
    });

    image.composite(xp.image, (1414 - xp.width), 676);

    //Add xp gain
    const xpGainText = image.text({
        text: `+${xpGain} XP`,
        font: "Roboto/Italic.ttf",
        fontSize: 35,
        color: colors.accent
    });

    image.composite(xpGainText.image, 960 - (xpGainText.width / 2), 750);

    //Add loot
    loot.forEach((i, index) => {

        //Get x
        const rowLength = index < loot.length - (loot.length % 5) ? 5 : ((loot.length - 1) % 5) + 1;
        const rowIndex = index % 5;
        const x = (960 - ((((rowLength - 1) * 275) + 175) / 2)) + (275 * rowIndex);

        //Get y
        const y = 900 + (Math.ceil(((index + 1) / 5) - 1) * 320);

        //Add item
        image.item({
            item: i.name,
            amount: i.amount,
            bgColor: colors[i.dropped ? "droppedItemSlotBG" : "accentBG"],
            borderColor: colors[i.dropped ? "droppedItemSlotBorder" : "accent"],
            x,
            y,
            whiteText: colors.whiteText
        });
    });

    //Render + return
    return await image.render();
};