module.exports = async ({ client, _ }, message) => {

    //Modules
    const readdir = require("directory-tree");
    const sharp = require("sharp");

    //Restrict command
    if (message.author.id !== client.apixel.id) return;

    //Restrict to testing bot
    if (process.env.DEV !== "true") return;

    //Get sizes + images
    const sizes = readdir(process.env.DEV === "true" ? "/home/apixel/Documents/ozzolum/assets/items" : "/root/ozzolum/assets/items").children.map(s => ({ size: s.name, images: s.children.filter(i => i.extension === ".png").map(i => i.name.split(".")[0]) }));
    const images = sizes.find(s => s.size === "32x32").images;

    //Loop through sizes and images
    for (let s of sizes) {
        for (let i of images) {

            //Image already scaled
            if (s.images.includes(i)) continue;

            //Get size
            const size = parseInt(s.size.split("x")[0]);

            //Scale image
            await sharp(`assets/items/32x32/${i}.png`)
                .resize(size, size, { kernel: "nearest" })
                .toFile(`assets/items/${s.size}/${i}.png`);
        }
    }

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  Images have been scaled!**`);
};