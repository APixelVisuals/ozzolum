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
        let x = 346;
        if (index < 5) x = x + (275 * index);
        else x = x + (275 * (index - 5));

        //Get y
        let y = 488;
        if (index > 4) y = y + 275;

        //Composite
        image.composite(`assets/items/${i.name}.png`, x - 48, y);

        //Add amount
        const amount = image.text({
            text: i.amount,
            font: "Roboto/Medium.ttf",
            fontSize: 35,
            color: "#000000"
        });

        const amountX = x + (150 - (amount.width / 2));
        const amountY = y - 30;

        image.composite(amount.image, amountX, amountY);

        //Add amount bg
        image.composite({
            width: amount.width + 36,
            height: amount.height + 36,
            background: "#7b4b35"
        }, amountX - 18, amountY - 18, 1);

        image.composite({
            width: amount.width + 20,
            height: amount.height + 20,
            background: "#9a613c"
        }, amountX - 10, amountY - 10, 1);
    });

    //Render + return
    return await image.render();
};