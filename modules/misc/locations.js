/*
 *  name: The location name
 *  channel: The channel ID of the location
 *  imageItemSlots:
 *      bgColor: The color of the item slot background
 *      borderColor: The color of the item slot border
 *      whiteText?: Whether the text color of item images should be white or not
 *  chop | mine | dig: Data for the chop/mine/dig commands
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
        chop: {
            loot: [
                {
                    name: "Oak Log",
                    frequency: 100,
                    min: 1,
                    max: 3
                },
                {
                    name: "Hickory Log",
                    frequency: 20,
                    min: 1,
                    max: 3
                },
                {
                    name: "Stick",
                    frequency: 5,
                    min: 1,
                    max: 4
                }
            ]
        },
        dig: {
            loot: [
                {
                    name: "Dirt",
                    frequency: 100,
                    min: 5,
                    max: 10
                },
                {
                    name: "Clay",
                    frequency: 20,
                    min: 3,
                    max: 5
                },
                {
                    name: "Pebble",
                    frequency: 5,
                    min: 5,
                    max: 15
                }
            ]
        }
    },
    {
        name: "Mines",
        channel: "648804143196274700",
        mine: {
            loot: [
                {
                    name: "Stone",
                    frequency: 100,
                    min: 6,
                    max: 12
                },
                {
                    name: "Pebble",
                    frequency: 85,
                    min: 7,
                    max: 15
                },
                {
                    name: "Coal",
                    frequency: 10,
                    min: 3,
                    max: 7
                }
            ]
        }
    }
];