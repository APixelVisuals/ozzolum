module.exports = async ({ stats }, name, amount) => {

    //Amount is 0
    if (amount === 0) return;

    //Parse amount
    if (!amount) amount = 1;

    //Update stats
    stats[name] = (stats[name] + amount) || amount;
};