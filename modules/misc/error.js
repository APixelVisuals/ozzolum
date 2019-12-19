module.exports = ({ client, util }, message, error, tipName) => {

    //Get player
    const { player } = message.author;

    //Get tip
    let tip = "";
    if ((tipName) && (!player.tips.disabled) && (!player.tips.seen.includes(tipName))) {

        tip = `\n\n${{

            //General
            "check items": "You can see all the items you have by saying `o!inv [Page]`. You can also search your items with `o!inv [Search Query] [Page]`",
            "no inv space": `You can store your items in your Storage Locker in your ${client.channels.get(util.locations.find(l => l.name === "Home").channel)}`,

            //Home Inventory
            "check home inv items": "You can see all the items you have in your Home Inventory by saying `o!hinv [Page]`. You can also search your items with `o!hinv [Search Query] [Page]`",

            //Equip
            "what to equip": "You can equip any tool or weapon, such as an Axe or a Pickaxe. You can see all of your equipped tools by saying `o!skills`",

            //Unequip
            "what to unequip": "You can unequip any tool or weapon, such as an Axe or a Pickaxe. You can see all of your equipped tools by saying `o!skills`",

            //Explore
            "cant explore here": `Try exploring in ${client.channels.get(util.locations.find(l => l.name === "Forest").channel)} or ${client.channels.get(util.locations.find(l => l.name === "Mines").channel)}`,
            "not exploring": "You can start exploring by saying `o!explore` in the location you'd like to explore",
            "not exploring here": "To explore in another location, say `o!leave` in the channel you are currently exploring in",
            "no area found": "You can find areas by saying `o!explore`",

            //Go
            "where to go": "You can go to any area you found when you explored",

            //Misc
            "no tool equipped": "To equip something, say `o!equip <Item>`"
        }[tipName]}`;

        //Add to seen tips
        player.tips.seen.push(tipName);
    }

    //Send message
    message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, ${error}${tip}**`);
};