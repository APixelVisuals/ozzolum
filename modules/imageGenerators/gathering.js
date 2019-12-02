module.exports = async ({ classes, _ }, user, location, loot) => {

    //Create image
    const image = new classes.Image(_, `assets/backgrounds/${location.name}.png`);

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

    //Add loot
    loot.forEach((i, index) => {

        //Get x
        const rowLength = index < loot.length - (loot.length % 5) ? 5 : ((loot.length - 1) % 5) + 1;
        const rowIndex = index % 5;
        const x = (960 - ((((rowLength - 1) * 275) + 175) / 2)) + (275 * rowIndex);

        //Get y
        let y = 600;
        if (loot.length > 5) y = 500;
        if (index > 4) y = y + 275;

        //Add item
        image.item({
            item: i.name,
            amount: i.amount,
            bgColor: location.imageItemSlots.bgColor,
            borderColor: location.imageItemSlots.borderColor,
            x,
            y,
            whiteText: location.imageItemSlots.whiteText
        });
    });

    //Render + return
    return await image.render();
};