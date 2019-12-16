/*
 *  name: The location name
 *  channel: The channel ID of the location
 *  imageColors:
 *      accent: The accent color
 *      progressBarFill: The color of progress bar fills
 *      itemSlotBG: The background color of item slots
 *      droppedItemSlotBG: The background color of item slots for dropped items
 *      droppedItemSlotBorder: The border color of item slots for dropped items
 *      whiteText?: Whether or not the text color should be white
 *  areas: Areas you can find when exploring
 *      name: The area name
 *      type: The gathering type
 *      chances: The chances that the player will find this area
 *      durability: How much damage this can take before breaking
 *      primaryLoot: The main item you can get from this area
 *      loot:
 *          name: The item name
 *          frequency: The % chance that the player will get any amount of this item
 *          min: The base minimum amount of this item that the player can get
 *          max: The base maximum amount of this item that the player can get
*/

module.exports = [
    {
        name: "Home",
        channel: "652018275332390949"
    },
    {
        name: "Forest",
        channel: "648803120830480384",
        imageColors: {
            accent: "#8baf70",
            progressBarFill: "#d0efb1",
            itemSlotBG: "#3f6040",
            droppedItemSlotBG: "#7e402b",
            droppedItemSlotBorder: "#e03131",
            whiteText: true
        },
        areas: [
            {
                name: "Oak Tree",
                type: "chopping",
                chances: 100,
                durability: 100,
                primaryLoot: "Oak Log",
                loot: [
                    {
                        name: "Oak Log",
                        frequency: 100,
                        min: 10,
                        max: 16
                    },
                    {
                        name: "Stick",
                        frequency: 35,
                        min: 4,
                        max: 11
                    }
                ]
            },
            {
                name: "Hickory Tree",
                type: "chopping",
                chances: 75,
                durability: 100,
                primaryLoot: "Hickory Log",
                loot: [
                    {
                        name: "Hickory Log",
                        frequency: 100,
                        min: 10,
                        max: 16
                    },
                    {
                        name: "Stick",
                        frequency: 35,
                        min: 4,
                        max: 11
                    }
                ]
            },
            {
                name: "Dirt Patch",
                type: "digging",
                chances: 100,
                durability: 100,
                primaryLoot: "Dirt",
                loot: [
                    {
                        name: "Dirt",
                        frequency: 100,
                        min: 15,
                        max: 23
                    },
                    {
                        name: "Pebble",
                        frequency: 100,
                        min: 3,
                        max: 8
                    }
                ]
            },
            {
                name: "Clay Patch",
                type: "digging",
                chances: 65,
                durability: 100,
                primaryLoot: "Clay",
                loot: [
                    {
                        name: "Clay",
                        frequency: 100,
                        min: 15,
                        max: 23
                    }
                ]
            }
        ]
    },
    {
        name: "Mines",
        channel: "648804143196274700",
        imageColors: {
            accent: "#676767",
            progressBarFill: "#9f9f9f",
            itemSlotBG: "#323232",
            droppedItemSlotBG: "#763a3a",
            droppedItemSlotBorder: "#f14545",
            whiteText: true
        },
        areas: [
            {
                name: "Stone",
                type: "mining",
                chances: 100,
                durability: 100,
                primaryLoot: "Stone",
                loot: [
                    {
                        name: "Stone",
                        frequency: 100,
                        min: 10,
                        max: 16
                    },
                    {
                        name: "Pebble",
                        frequency: 100,
                        min: 4,
                        max: 11
                    }
                ]
            },
            {
                name: "Dirt Patch",
                type: "digging",
                chances: 35,
                durability: 100,
                primaryLoot: "Dirt",
                loot: [
                    {
                        name: "Dirt",
                        frequency: 100,
                        min: 15,
                        max: 23
                    },
                    {
                        name: "Pebble",
                        frequency: 100,
                        min: 3,
                        max: 8
                    }
                ]
            },
            {
                name: "Coal Vein",
                type: "mining",
                chances: 20,
                durability: 150,
                primaryLoot: "Coal",
                loot: [
                    {
                        name: "Coal",
                        frequency: 100,
                        min: 10,
                        max: 16
                    },
                    {
                        name: "Stone",
                        frequency: 100,
                        min: 4,
                        max: 11
                    },
                    {
                        name: "Pebble",
                        frequency: 100,
                        min: 2,
                        max: 7
                    }
                ]
            }
        ]
    }
];