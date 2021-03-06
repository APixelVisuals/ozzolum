module.exports = async ({ classes, _ }, user, location, area) => {

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
        x: 873,
        y: 514,
        noItemName: true
    });

    //Add skill
    const skillText = image.text({
        text: "Foraging",
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: colors.accent
    });

    image.composite(skillText.image, (787 - skillText.width), 587);

    //Add location
    image.text({
        text: location.name,
        font: "Roboto/Medium.ttf",
        fontSize: 45,
        color: colors.accent,
        x: 1135,
        y: 587
    });

    //Add area
    const areaText = image.text({
        text: area.name,
        font: "Roboto/Medium.ttf",
        fontSize: 35,
        color: colors.accent
    });

    image.composite(areaText.image, 960 - (areaText.width / 2), 725);

    //Render + return
    return await image.render();
};