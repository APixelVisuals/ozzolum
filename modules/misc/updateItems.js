module.exports = ({ remove, add }) => {

    //Clone inv items
    let removeInvItems = [...remove.inv.items].map(i => ({ ...i }));
    let addInvItems = [...add.inv.items].map(i => ({ ...i }));

    //Remove items
    const removeData = remove.inv.removeItems(remove.items || [], null, removeInvItems);
    if (removeData.missing.length) return;
    removeInvItems = removeData.inv;

    //Add items
    const addData = add.inv.addItems(add.items || [], null, addInvItems);
    if (addData.dropped.length) return;
    addInvItems = addData.inv;

    //Set items
    remove.inv.items = removeInvItems;
    add.inv.items = addInvItems;

    //Return
    return true;
};