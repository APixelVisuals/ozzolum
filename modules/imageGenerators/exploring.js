module.exports = async ({ classes, _ }, user, location, areas) => {

    //Create image
    const image = new classes.Image(_, `assets/backgrounds/locations/${location.name} Exploring${areas.length > 5 ? "2" : ""}.png`);

    //Get colors
    const colors = location.imageColors;

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

    //Add areas
    areas.forEach((a, index) => {

        //Get x
        const rowLength = index < areas.length - (areas.length % 5) ? 5 : ((areas.length - 1) % 5) + 1;
        const rowIndex = index % 5;
        const x = (960 - ((((rowLength - 1) * 275) + 175) / 2)) + (275 * rowIndex);

        //Get y
        let y = 575;
        if (index > 4) y = y + 320;

        //Add item slot
        image.composite({
            width: 175,
            height: 175,
            background: colors.accent
        }, x, y);

        image.composite({
            width: 155,
            height: 155,
            background: colors.itemSlotBG
        }, x + 10, y + 10);

        //Add primary loot item
        image.composite(`assets/items/128x128/${a.primaryLoot}.png`, x + 23, y + 23);

        //Add name
        const nameText = image.text({
            text: a.name,
            font: "Roboto/Medium.ttf",
            fontSize: 35,
            color: colors.accent
        });

        image.composite(nameText.image, x + 87 - (nameText.width / 2), y + 175 + 15);
    });

    //Render + return
    return await image.render();
};