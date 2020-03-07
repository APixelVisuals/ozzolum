module.exports = async ({ util, classes, _ }, user, items, storageUnitName, slots, error) => {

    //Get colors
    const colors = util.items.find(i => i.name === storageUnitName).inventoryImageColors;

    //Create image
    const image = new classes.Image(_, {
        width: 1920,
        height: items.length <= 5 ? 1120 : 1396,
        backgroundColor: colors.background,
        accentColor: colors.accent,
        details: `storageUnits/${storageUnitName}`,
        noDetailOffset: true
    });

    //Add avatar
    await image.compositeAvatar({
        user,
        width: 225,
        height: 225,
        x: 112,
        y: 43
    });

    //Add username
    const username = image.text({
        text: user.username,
        font: "Roboto/Black.ttf",
        fontSize: 85,
        color: colors.accent,
        x: 365,
        y: 63
    });

    //Add discriminator
    image.text({
        text: `#${user.discriminator}`,
        font: "Roboto/Black.ttf",
        fontSize: 35,
        color: colors.accent,
        x: 365 + username.width + 5,
        y: 103
    });

    //Add slots used bar
    image.progressBar({
        width: 938,
        height: 54,
        amount: slots.used,
        maxAmount: slots.total,
        bgColor: colors.slotsUsedBarBG,
        borderColor: colors.accent,
        fillColor: colors.slotsUsedBarFill,
        x: 498,
        y: 510
    });

    //Add "items" text
    image.text({
        text: "Items",
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: colors.accent,
        x: 520,
        y: 452
    });

    //Add slots used percent
    const slotsUsedPercent = image.text({
        text: `${Math.round((slots.used / slots.total) * 100)}% Full`,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: colors.accent
    });

    image.composite(slotsUsedPercent.image, (1414 - slotsUsedPercent.width), 452);

    //Add storage unit name
    image.text({
        text: storageUnitName,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: colors.accent,
        x: 519,
        y: 575
    });

    //Add slots used
    const slotsUsed = image.text({
        text: `${slots.used}/${slots.total} Slots Used`,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: colors.accent
    });

    image.composite(slotsUsed.image, (1414 - slotsUsed.width), 575);

    //Add items
    items.forEach((i, index) => {

        //Get x
        const rowLength = index < items.length - (items.length % 5) ? 5 : ((items.length - 1) % 5) + 1;
        const rowIndex = index % 5;
        const x = (960 - ((((rowLength - 1) * 275) + 175) / 2)) + (275 * rowIndex);

        //Get y
        let y = 740;
        if (index > 4) y = y + 320;

        //Add item
        image.item({
            item: i.name,
            amount: i.amount,
            bgColor: colors.accentBG,
            borderColor: colors.accent,
            x,
            y
        });
    });

    //Add error
    if (error) {

        const errorText = image.text({
            text: error,
            font: "Roboto/Italic.ttf",
            fontSize: 55,
            color: colors.accent
        });

        image.composite(errorText.image, 960 - (errorText.width / 2), 805 - (errorText.height / 2));
    }

    //Render + return
    return await image.render();
};