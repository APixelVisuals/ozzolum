module.exports = async (userData, name, amount) => {

    //Amount is 0
    if (amount === 0) return;

    //Parse amount
    if (!amount) amount = 1;

    //Update stats
    if (!userData.stats.find(s => s.name === name)) userData.stats.push({ name, count: 0 });

    const stat = userData.stats.find(s => s.name === name);
    stat.count = stat.count + amount;
};