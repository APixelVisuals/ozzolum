module.exports = async ({ models }, ...docs) => {

    //Define saving
    const saving = [];

    //Filter docs
    docs = docs.filter(d => d);

    //Loop through each doc
    for (let doc of docs) {

        //Get doc info
        const model = doc.constructor.modelName;
        const id = doc._id;
        const docObject = doc.toObject();
        const modifiedPaths = doc.modifiedPaths().filter(mp => (!mp.includes(".")) && (!docObject.hasOwnProperty(mp)));

        //Unsets
        const unsets = {};
        modifiedPaths.forEach(mp => unsets[mp] = 1);
        if (Object.keys(unsets).length) docObject["$unset"] = unsets;

        //Update doc
        saving.push(models[model].findByIdAndUpdate(id, docObject).exec());
    }

    //Await updates
    await Promise.all(saving);
};