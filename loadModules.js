module.exports = () => {

    //Modules
    const readdir = require("directory-tree");

    let buildModules = src => {

        let data = {};

        src = src.children ? src.children : src;

        src.forEach(f => {
            if ((f.type === "file") && (f.extension === ".js")) data[f.name.replace(/\.js/g, "")] = require(f.path);
            else if (f.type === "directory") data[f.name] = buildModules(f);
        });

        return data;
    };

    const tree = readdir(process.env.DEV === "true" ? "/home/apixel/Documents/ozzolum/modules" : "/root/ozzolum/modules").children;
    return buildModules(tree);
};