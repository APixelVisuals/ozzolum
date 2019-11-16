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

    async compositeAvatar(user, x, y) {

        //Fetch avatar
        const avatar = await (await fetch(`${user.displayAvatarURL}?size=256`)).buffer();

        //Create image
        let image = sharp(avatar);

        //Resize
        image.resize(250, 250);

        //Mask
        image.composite([{
            input: "assets/avatarMask.png",
            blend: "dest-in"
        }]);

        //Render
        image = await image.toBuffer();

        //Composite
        this.composite(image, x, y);
    }

    text({ text, font, fontSize, color, x, y }) {

        //Parse text
        text = text.replace(/[^A-Za-z0-9()[\]{}<>\-_!@#$%^&*=+:;.,?/\\|~'"` ]/g, "");

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
        this.composite(image, x, y);

        //Get dimensions
        const dimensions = bufferImageSize(image);

        //Return
        return { width: dimensions.width, height: dimensions.height };
    }

    composite(image, x, y) {
        this.compositions.push({
            input: image,
            left: x,
            top: y
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