module.exports = ({ util }, query) => {

    //Get items
    const items = [...util.items];

    const item = items.map(i => {

        const nameTags = i.name.toLowerCase().replace(/[^a-z ]/g, "").split(" ");
        const typeTags = i.type.toLowerCase().replace(/[^a-z ]/g, "").split(" ");
        const itemTags = [...new Set([...i.tags, ...nameTags, ...typeTags])].filter(t => t);

        const queryTags = [...new Set(query.toLowerCase().replace(/[^a-z ]/g, "").split(" "))].filter(t => t);

        const matches = itemTags.filter(t => queryTags.some(tt => t.startsWith(tt) || t.endsWith(tt))).length;

        return matches ? { item: i, matches } : null;
    }).filter(i => i).sort((a, b) => b.matches - a.matches)[0];

    //Return
    return item && item.item;
};