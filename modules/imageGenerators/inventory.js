module.exports = async ({ classes, _ }, user, items) => {

    //Create image
    const image = new classes.Image(_, "assets/inventoryBG.png");

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

    //Add items
    items.forEach((i, index) => {

        //Get x
        let x = 323;
        if (index < 5) x = x + (275 * index);
        else x = x + (275 * (index - 5));

        //Get y
        let y = 465;
        if (index > 4) y = y + 275;

        //Add item
        image.item({
            item: i.name,
            amount: i.amount,
            bgColor: "#9a613c",
            borderColor: "#7b4b35",
            x,
            y,
            noSlots: true
        });
    });

    //Render + return
    return await image.render();
};