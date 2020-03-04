const fetch = require("node-fetch");
const sharp = require("sharp");
const text2png = require("text2png");
const bufferImageSize = require("buffer-image-size");

module.exports = class Image {

    constructor(_, image) {

        //Set data
        this._ = _;
        this.image = sharp(image);
        this.compositions = [];
    }

    async compositeAvatar({ user, width, height, x, y }) {

        //Fetch avatar
        const avatar = await (await fetch(`${user.displayAvatarURL}?size=256`)).buffer();

        //Create image
        let image = sharp(avatar);

        //Resize
        image.resize(width, height);

        //Mask
        const mask = await sharp("assets/circleMask.png")
            .resize(width, height)
            .toBuffer();

        image.composite([{
            input: mask,
            blend: "dest-in"
        }]);

        //Render
        image = await image.toBuffer();

        //Composite
        this.composite(image, x, y);
    }

    text({ text, font, fontSize, color, x, y }) {

        //Parse text
        text = text.toString().replace(/[^A-Za-z0-9\n()[\]{}<>\-_!@#$%^&*=+:;.,?/\\|~'"` ]/g, "");

        //Generate font name
        const fontName = font.replace(/\//g, "").split(".")[0];

        //Draw text
        const image = text2png(text, {
            font: `${fontSize}px ${fontName}`,
            textAlign: "center",
            lineSpacing: 5,
            localFontPath: `assets/fonts/${font}`,
            localFontName: fontName,
            color
        });

        //Composite
        if (x && y) this.composite(image, x, y);

        //Get dimensions
        const dimensions = bufferImageSize(image);

        //Return
        return { image, width: dimensions.width, height: dimensions.height };
    }

    circle({ diameter, color, x, y }) {

        //Add circle
        this.composite(Buffer.from(
            `<svg>
                <circle cx="${diameter / 2}" cy="${diameter / 2}" r="${diameter / 2}" fill="${color}" />
            </svg>`
        ), x, y);
    }

    item({ item, amount, bgColor, borderColor, x, y, whiteText, noSlots, noItemName }) {

        //Get utils
        const { util } = this._;

        //Add background
        if (!noSlots) {

            this.composite({
                width: 175,
                height: 175,
                background: borderColor
            }, x, y);

            this.composite({
                width: 155,
                height: 155,
                background: bgColor
            }, x + 10, y + 10);
        }

        //Add item
        this.composite(`assets/items/128x128/${item}.png`, x + 23, y + 23);

        //Add item name
        if (!noItemName) {

            const itemData = util.items.find(i => i.name === item);
            const nameText = this.text({
                text: itemData.imageName || item,
                font: "Roboto/Medium.ttf",
                fontSize: itemData.imageFontSize || 35,
                color: whiteText ? "#ffffff" : "#000000"
            });

            this.composite(nameText.image, x + 87 - (nameText.width / 2), y + 175 + 15);
        }

        //Add amount
        if (amount) {

            const amountText = this.text({
                text: amount,
                font: "Roboto/Medium.ttf",
                fontSize: 35,
                color: whiteText ? "#ffffff" : "#000000"
            });

            const amountX = x + (175 - (amountText.width / 2));
            const amountY = y - 8;

            this.composite({
                width: amountText.width + 36,
                height: amountText.height + 36,
                background: borderColor
            }, amountX - 18, amountY - 18);

            this.composite({
                width: amountText.width + 20,
                height: amountText.height + 20,
                background: bgColor
            }, amountX - 10, amountY - 10);

            this.composite(amountText.image, amountX, amountY);
        }
    }

    async progressBar({ width, height, amount, maxAmount, color, x, y }) {

        //Add progress bar
        if (amount) this.composite(Buffer.from(
            `<svg>
                <rect width="${((amount / maxAmount) * width)}" height="${height}" rx="${height / 2}" ry="${height / 2}" fill="${color}" />
            </svg>`
        ), x, y);
    }

    composite(image, x, y) {

        //Parse image
        if ((image instanceof Object) && (!(image instanceof Buffer))) {
            image.width = Math.round(image.width);
            image.height = Math.round(image.height);
            image = { create: { ...image, channels: 4 } };
        }

        //Add to compositions
        this.compositions.push({
            input: image,
            left: Math.round(x),
            top: Math.round(y)
        });
    }

    async render() {

        //Get utils
        const { util, _ } = this._;

        //Composite
        this.image.composite(this.compositions);

        //Render
        return await util.uploadImage(_, await this.image.jpeg().toBuffer());
    }

};