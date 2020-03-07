/*
 *  name: The location name
 *  channel: The channel ID of the location
 *  imageColors:
 *      background: The background color
 *      accent: The accent color
 *      accentBG: The accent background color
 *      progressBarFill: The color of progress bar fills
 *      droppedItemSlotBG: The background color of item slots for dropped items
 *      droppedItemSlotBorder: The border color of item slots for dropped items
 *      whiteText?: Whether or not the text color should be white
 *  areas: Areas you can find when exploring
 *      name: The area name
 *      type: The gathering type
 *      frequency: The % chance that the player will find this area
 *      durability: How much damage this can take before breaking
 *      primaryLoot: The main item you can get from this area
 *      loot:
 *          name: The item name
 *          frequency: The % chance that the player will get any amount of this item
 *          min: The base minimum amount of this item that the player can get
 *          max: The base maximum amount of this item that the player can get
 *  enemies: Enemies you can find when exploring
 *      name: The enemy name
 *      chances: The chances that the player will find this enemy
 *      health: How much health this enemy has
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
            background: "#2c442d",
            accent: "#8baf70",
            accentBG: "#3f6040",
            progressBarFill: "#d0efb1",
            droppedItemSlotBG: "#7e402b",
            droppedItemSlotBorder: "#e03131",
            whiteText: true
        },
        areas: [
            {
                name: "Oak Tree",
                type: "chopping",
                frequency: 100,
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
                frequency: 75,
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
                frequency: 100,
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
                frequency: 35,
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
            },
            {
                name: "Wild Berry Bush",
                type: "foraging",
                frequency: 75,
                primaryLoot: "Wild Berries",
                loot: [
                    {
                        name: "Wild Berries",
                        frequency: 100,
                        min: 4,
                        max: 8
                    }
                ]
            }
        ],
        enemies: [
            {
                name: "Slime",
                chances: 100,
                health: 50,
                loot: [
                    {
                        name: "Slime",
                        frequency: 100,
                        min: 4,
                        max: 8
                    }
                ]
            },
            {
                name: "Goblin",
                chances: 100,
                health: 100,
                loot: [
                    {
                        name: "Monster Flesh",
                        frequency: 100,
                        min: 5,
                        max: 9
                    }
                ]
            },
            {
                name: "Ent",
                chances: 70,
                health: 100,
                loot: [
                    {
                        name: "Oak Log",
                        frequency: 100,
                        min: 8,
                        max: 13
                    },
                    {
                        name: "Stick",
                        frequency: 100,
                        min: 7,
                        max: 16
                    }
                ]
            }
        ]
    },
    {
        name: "Mines",
        channel: "648804143196274700",
        imageColors: {
            background: "#3b3b3b",
            accent: "#676767",
            accentBG: "#323232",
            progressBarFill: "#9f9f9f",
            droppedItemSlotBG: "#763a3a",
            droppedItemSlotBorder: "#f14545",
            whiteText: true
        },
        areas: [
            {
                name: "Stone",
                type: "mining",
                frequency: 100,
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
                frequency: 20,
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
                frequency: 20,
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
        ],
        enemies: [
            {
                name: "Cave Slime",
                chances: 100,
                health: 65,
                loot: [
                    {
                        name: "Slime",
                        frequency: 100,
                        min: 5,
                        max: 9
                    }
                ]
            },
            {
                name: "Stone Golem",
                chances: 100,
                health: 115,
                loot: [
                    {
                        name: "Stone",
                        frequency: 100,
                        min: 8,
                        max: 13
                    },
                    {
                        name: "Pebble",
                        frequency: 100,
                        min: 7,
                        max: 16
                    }
                ]
            },
            {
                name: "Bats",
                chances: 75,
                health: 50,
                loot: [
                    {
                        name: "Bat Wings",
                        frequency: 100,
                        min: 4,
                        max: 8
                    }
                ]
            }
        ]
    }
];