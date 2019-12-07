module.exports = async ({ classes, _ }, user, items, storageUnitName, slots) => {

    //Create image
    const image = new classes.Image(_, `assets/inventoryBG${items.length > 5 ? "2" : ""}.png`);

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
        color: "#7b4b35",
        x: 365,
        y: 63
    });

    //Add discriminator
    image.text({
        text: `#${user.discriminator}`,
        font: "Roboto/Black.ttf",
        fontSize: 35,
        color: "#7b4b35",
        x: 365 + username.width + 5,
        y: 103
    });

    //Add storage unit
    image.composite(`assets/items/256x256/${storageUnitName}.png`, 1539, 41);

    //Add slots used bar
    image.progressBar({
        width: 924,
        height: 40,
        amount: slots.used,
        maxAmount: slots.total,
        color: "#a0694b",
        x: 498,
        y: 510
    });

    //Add items text
    image.text({
        text: "Items",
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: "#7b4b35",
        x: 517,
        y: 452
    });

    //Add slots used percent
    const slotsUsedPercent = image.text({
        text: `${Math.round((slots.used / slots.total) * 100)}% Full`,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: "#7b4b35"
    });

    image.composite(slotsUsedPercent.image, (1414 - slotsUsedPercent.width), 452);

    //Add storage unit name
    image.text({
        text: storageUnitName,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: "#7b4b35",
        x: 517,
        y: 575
    });

    //Add slots used
    const slotsUsed = image.text({
        text: `${slots.used}/${slots.total} Slots Used`,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: "#7b4b35"
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
            bgColor: "#9a613c",
            borderColor: "#7b4b35",
            x,
            y
        });
    });

    //Render + return
    return await image.render();
};