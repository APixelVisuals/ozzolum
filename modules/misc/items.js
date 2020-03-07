module.exports = [
    {
        name: "Oak Log",
        type: "Material",
        tags: ["wood"]
    },
    {
        name: "Hickory Log",
        type: "Material",
        tags: ["wood"]
    },
    {
        name: "Stick",
        type: "Crafting Ingredient",
        tags: ["wood"]
    },
    {
        name: "Dirt",
        type: "Material",
        tags: ["earth", "ground"]
    },
    {
        name: "Clay",
        type: "Material",
        tags: ["earth", "ground"]
    },
    {
        name: "Stone",
        type: "Material",
        tags: ["rock"]
    },
    {
        name: "Pebble",
        type: "Crafting Ingredient",
        tags: ["rock", "stone"]
    },
    {
        name: "Coal",
        type: "Crafting Ingredient",
        tags: []
    },
    {
        name: "Wild Berries",
        type: "Food",
        tags: ["berry"]
    },
    {
        name: "Leather Satchel",
        type: "Storage Unit",
        tags: ["backpack", "bag"],
        inventoryImageColors: {
            accent: "#7b4b35",
            accentBG: "#9a613c",
            slotsUsedBarBG: "#563424",
            slotsUsedBarFill: "#a0694b"
        }
    },
    {
        name: "Storage Locker",
        type: "Storage Unit",
        tags: [],
        inventoryImageColors: {
            accent: "#777777",
            accentBG: "#999999",
            slotsUsedBarBG: "#464646",
            slotsUsedBarFill: "#c9c9c9"
        }
    },
    {
        name: "Stone Dagger",
        type: "Weapon",
        tags: ["sword"],
        equipType: "fighting"
    },
    {
        name: "Stone Hatchet",
        type: "Axe",
        tags: [],
        equipType: "chopping",
        minDamage: 5,
        maxDamage: 8
    },
    {
        name: "Stone Pickaxe",
        type: "Pickaxe",
        tags: [],
        equipType: "mining",
        minDamage: 5,
        maxDamage: 8
    },
    {
        name: "Stone Shovel",
        type: "Shovel",
        tags: [],
        equipType: "digging",
        minDamage: 5,
        maxDamage: 8
    },
    {
        name: "Stone Shears",
        type: "Shears",
        tags: [],
        equipType: "foraging"
    }
];