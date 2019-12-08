module.exports = async ({ classes, _ }, user, location, skill, loot, xpGain) => {

    //Create image
    const image = new classes.Image(_, `assets/backgrounds/locations/${location.name}${Math.ceil(loot.length / 5) <= 1 ? "" : Math.ceil(loot.length / 5)}.png`);

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

    //Add skill xp bar
    image.progressBar({
        width: 924,
        height: 40,
        amount: skill.xp,
        maxAmount: (skill.level * 50) + 50,
        color: "#d0efb1",
        x: 509,
        y: 611
    });

    //Add skill name
    image.text({
        text: skill.name,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: "#8baf70",
        x: 517,
        y: 553
    });

    //Add skill level
    const level = image.text({
        text: `Level ${skill.level}`,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: "#8baf70"
    });

    image.composite(level.image, (1414 - level.width), 553);

    //Add location
    image.text({
        text: location.name,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: "#8baf70",
        x: 517,
        y: 676
    });

    //Add skill xp
    const xp = image.text({
        text: `${skill.xp}/${(skill.level * 50) + 50} XP`,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: "#8baf70"
    });

    image.composite(xp.image, (1414 - xp.width), 676);

    //Add xp gain
    const xpGainText = image.text({
        text: `+${xpGain} XP`,
        font: "Roboto/Italic.ttf",
        fontSize: 35,
        color: "#8baf70"
    });

    image.composite(xpGainText.image, 960 - (xpGainText.width / 2), 701);

    //Add loot
    loot.forEach((i, index) => {

        //Get x
        const rowLength = index < loot.length - (loot.length % 5) ? 5 : ((loot.length - 1) % 5) + 1;
        const rowIndex = index % 5;
        const x = (960 - ((((rowLength - 1) * 275) + 175) / 2)) + (275 * rowIndex);

        //Get y
        let y = 850;
        if (index > 4) y = y + 320;

        //Add item
        image.item({
            item: i.name,
            amount: i.amount,
            bgColor: location.imageItemSlots[i.dropped ? "droppedBGColor" : "bgColor"],
            borderColor: location.imageItemSlots[i.dropped ? "droppedBorderColor" : "borderColor"],
            x,
            y,
            whiteText: location.imageItemSlots.whiteText
        });
    });

    //Render + return
    return await image.render();
};