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
    }
];