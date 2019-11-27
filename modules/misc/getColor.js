module.exports = async ({ util }, input) => {

    //Modules
    const vibrant = require("node-vibrant");

    //No input
    if (!input) return null;

    //Get palette
    const palette = await util.promise(vibrant.from(input).getPalette(), true);
    if (!palette) return null;

    //Get color
    let color =
        palette.Vibrant ||
        palette.LightVibrant ||
        palette.DarkVibrant ||
        palette.Muted ||
        palette.LightMuted ||
        palette.DarkMuted;

    //Get hex
    color = color.getHex();

    //Return
    return color;
};