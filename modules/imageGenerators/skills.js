module.exports = async ({ classes, _ }, user, skillData) => {

    //Create image
    const image = new classes.Image(_, `assets/skillsBG${skillData.length}.png`);

    //Add username + discriminator
    const username = image.text({
        text: user.username,
        font: "Roboto/Black.ttf",
        fontSize: 100,
        color: "#7b4b35"
    });

    const discriminator = image.text({
        text: `#${user.discriminator}`,
        font: "Roboto/Black.ttf",
        fontSize: 35,
        color: "#7b4b35"
    });

    image.composite(username.image, 960 - (((username.width + discriminator.width) + 170 + 15 + 5) / 2) + 170 + 15, 300);

    image.composite(discriminator.image, 960 - (((username.width + discriminator.width) + 170 + 15 + 5) / 2) + 170 + 15 + username.width + 5, 350);

    //Add avatar border
    image.circle({
        diameter: 170,
        color: "#7b4b35",
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

    //Add skills
    skillData.forEach((s, index) => {

        //Offsets
        const OFFSET_X = index % 2 ? 930 : (index + 1 === skillData.length ? 475 : 0);
        const OFFSET_Y = Math.floor(index / 2) * 220;

        //Add tool
        image.composite(s.tool ? `assets/items/64x64/${s.tool}.png` : `assets/misc/no${{
            Fighting: "Sword",
            Chopping: "Axe",
            Mining: "Pickaxe",
            Digging: "Shovel",
            Foraging: "Shears",
            Fishing: "FishingRod",
        }[s.name]}.png`, 77 + OFFSET_X, 524 + OFFSET_Y);

        //Add xp bar
        image.progressBar({
            width: 735,
            height: 45,
            amount: s.xp,
            maxAmount: (s.level * 50) + 50,
            bgColor: "#563424",
            borderColor: "#7b4b35",
            fillColor: "#a0694b",
            x: 173 + OFFSET_X,
            y: 547 + OFFSET_Y
        });

        //Add skill name
        image.text({
            text: s.name,
            font: "Roboto/Medium.ttf",
            fontSize: 45,
            color: "#7b4b35",
            x: 181 + OFFSET_X,
            y: 489 + OFFSET_Y
        });

        //Add level
        const level = image.text({
            text: `Level ${s.level}`,
            font: "Roboto/Medium.ttf",
            fontSize: 45,
            color: "#7b4b35"
        });

        image.composite(level.image, (875 - level.width) + OFFSET_X, 489 + OFFSET_Y);

        //Add tool name
        if (s.tool) image.text({
            text: s.tool,
            font: "Roboto/Medium.ttf",
            fontSize: 35,
            color: "#7b4b35",
            x: 181 + OFFSET_X,
            y: 603 + OFFSET_Y
        });

        //Add xp
        const xp = image.text({
            text: `${s.xp}/${(s.level * 50) + 50} XP`,
            font: "Roboto/Medium.ttf",
            fontSize: 35,
            color: "#7b4b35"
        });

        image.composite(xp.image, (875 - xp.width) + OFFSET_X, 603 + OFFSET_Y);
    });

    //Render + return
    return await image.render();
};