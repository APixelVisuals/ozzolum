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
        text = text.toString().replace(/[^A-Za-z0-9()[\]{}<>\-_!@#$%^&*=+:;.,?/\\|~'"` ]/g, "");

        //Generate font name
        const fontName = font.replace(/\//g, "").split(".")[0];

        //Draw text
        const image = text2png(text, {
            font: `${fontSize}px ${fontName}`,
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

    async progressBar({ width, height, amount, maxAmount, color, x, y }) {

        //Add progress bar
        if (amount) this.composite(Buffer.from(
            `<svg>
                <rect width="${((amount / maxAmount) * width)}" height="${height}" rx="${height / 2}" ry="${height / 2}" fill="${color}" />
            </svg>`
        ), x, y);
    }

    composite(image, x, y, behind) {

        //Parse image
        if ((image instanceof Object) && (!(image instanceof Buffer))) {
            image.width = Math.round(image.width);
            image.height = Math.round(image.height);
            image = { create: { ...image, channels: 4 } };
        }

        //Parse behind
        if (!behind) behind = 0;

        //Add to compositions
        this.compositions.splice(this.compositions.length - 1 - behind, 0, {
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
        return await util.uploadImage(_, await this.image.toBuffer());
    }

};