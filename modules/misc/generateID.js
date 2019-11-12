module.exports = _ => {

    //Increment ID generation number
    _.idGenerationIncrement = _.idGenerationIncrement + 1;

    //Return
    return `${Date.now()}${process.pid}${_.idGenerationIncrement}`;
};