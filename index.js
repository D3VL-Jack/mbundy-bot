require('dotenv').config();

// Mbundy's user id 
const USER_ID = process.env.USER_ID;

const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const store = "store.json"
let _store = JSON.parse(fs.readFileSync(store));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const CheckersWrapper = require("./checkers/_wrapper");
const responses = require('./responses');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const mustacheReplace = (str, obj) => str.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (match, key) => obj[key]);
const nthNumber = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const incrementCount = async (key) => {
    const data = JSON.parse(fs.readFileSync(store));
    data[key] = data[key] || 0;
    data[key]++;
    fs.writeFileSync(store, JSON.stringify(data));
    _store = data;
    return Promise.resolve();
}

const getCount = (key) => {
    return _store[key] || 0;
}

client.on("messageCreate", async (message) => {
    if (message.author.bot) return false;

    if (message.author.id !== USER_ID) return false;

    await message.react('🔎');

    const checker = new CheckersWrapper(message);
    await checker.check();

    //                  V this makes the array unique
    const results = [...new Set(checker.results())]

    console.log("Matched ", checker.getResultNames());

    // Sleep so it feels like the bot is thinking, because it is... IT IS!
    await sleep(1000)

    message.reactions.removeAll();

    if (results.length !== 0) {
        if (results.length === 1) {
            // this is a single match, so we can just send the response
            // generate a message
            const start = randomFrom(responses[results[0]].start)
            const middle = randomFrom(responses[results[0]].middle)
            const end = randomFrom(responses[results[0]].end)

            const count = getCount(results[0]);

            const response = mustacheReplace(start + middle + end, { nth: nthNumber(count), times: count })

            await message.reply(response);

            await incrementCount(results[0]);

        } else {
            const start = randomFrom(responses[999].start)
            const middle = results.map(result => {
                const random_middle = randomFrom(responses[result].middle);
                const count = getCount(result);
                return mustacheReplace(random_middle, { nth: nthNumber(count), times: count })
            }).join("\n");
            const end = randomFrom(responses[999].end)

            const response = start + middle + end;

            await message.reply(response);

            for (const result of results) {
                await incrementCount(result);
            }
        }
    } else {
        await message.react('✅');
        setTimeout(() => message.reactions.removeAll(), 2000);
    }
});

client.login(process.env.BOT_TOKEN);