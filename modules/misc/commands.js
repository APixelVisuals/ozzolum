module.exports = [
    {
        file: "ping",
        name: "Ping",
        inputs: ["ping", "pong"],
        type: "basic",
        usage: "ping",
        basic: true
    },
    {
        file: "start",
        name: "Start",
        inputs: ["start"],
        type: "basic",
        usage: "start",
        basic: true
    },
    {
        file: "inventory",
        name: "Inventory",
        inputs: ["inventory", "inv", "items"],
        type: "basic",
        usage: "inv [Search Query] [Page] [User]",
    },
    {
        file: "profile",
        name: "Profile",
        inputs: ["profile", "p"],
        type: "basic",
        usage: "profile [User]",
    },
    {
        file: "skills",
        name: "Skills",
        inputs: ["skills"],
        type: "basic",
        usage: "skills [User]",
    },
    {
        file: "equip",
        name: "Equip",
        inputs: ["equip", "use"],
        type: "basic",
        usage: "equip <Item>",
    },
    {
        file: "unequip",
        name: "Unequip",
        inputs: ["unequip", "unuse"],
        type: "basic",
        usage: "unequip <Type>",
    },
    {
        file: "chop",
        name: "Chop",
        inputs: ["chop"],
        type: "basic",
        usage: "chop",
    },
    {
        file: "dig",
        name: "Dig",
        inputs: ["dig"],
        type: "basic",
        usage: "dig",
    },
    {
        file: "eval",
        name: "Eval",
        ownerOnly: true,
        inputs: ["eval"]
    },
    {
        file: "restart",
        name: "Restart",
        ownerOnly: true,
        inputs: ["restart"],
        basic: true
    },
    {
        file: "simulateChannel",
        name: "Simulate Channel",
        ownerOnly: true,
        inputs: ["simulatechannel", "simulatechan", "schannel", "schan", "simulatec", "sc"],
        basic: true
    }
];