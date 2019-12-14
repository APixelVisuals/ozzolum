/*
 *  name: The location name
 *  channel: The channel ID of the location
 *  imageItemSlots:
 *      bgColor: The color of the item slot background
 *      borderColor: The color of the item slot border
 *      whiteText?: Whether the text color of item images should be white or not
 *  areas: Areas you can find when exploring
 *      name: The area name
 *      type: The gathering type
 *      chances: The chances that the player will find this area
 *      durability: How much damage this can take before breaking
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
        imageItemSlots: {
            bgColor: "#3f6040",
            borderColor: "#8baf70",
            droppedBGColor: "#7e402b",
            droppedBorderColor: "#e03131",
            whiteText: true
        },
        areas: [
            {
                name: "Oak Tree",
                type: "chopping",
                chances: 100,
                durability: 100,
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
                name: "Patch of Dirt",
                type: "digging",
                chances: 100,
                durability: 100,
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
                name: "Patch of Clay",
                type: "digging",
                chances: 65,
                durability: 100,
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
    }
];