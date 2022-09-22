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
const isAdmin = (id) => {
    const admins = process.env.ADMIN_IDS.split(',');
    return admins.includes(id);
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

    if (message.content === "/mbundy help") {
        const reply = [
            `Hi <@${message.author.id}>, `,
            `Here are the command you can use:`,
            `"/mbundy stats" - to see mbundy's stats`,
            `"/mbundy help" - to see this message`,
        ]
        if (isAdmin(message.author.id)) {
            reply.push(`"/mbundy admin set <key> <value>" - to manually set a value of a statistic`);
            reply.push(`"/mbundy admin reboot" - to reboot mbundy bot`);
            reply.push(`"/mbundy admin ping" - is it hanging? ping it! get a pong back`);
            reply.push(`"/mbundy admin stats" - to see mbundy's raw stats`);
        }
        return message.reply(reply.join("\n"));
    }

    if (message.content === "/mbundy stats") {
        const reply = [
            `Hi <@${message.author.id}>, `,
            `Mbundy has sent **${getCount('total_messages_sent')}** messages in total.`,
            `He has talked about Stocks **${getCount('stocks')}** times.`,
            `Casually dropped he's got a house in Sweden **${getCount('sweden')}** times.`,
            `Mentioned he has really bad Airspace issues **${getCount('airspace')}** times.`,
            `Declared his love for his tesla about **${getCount('tesla')}** times`,
            `Nodded to users of the server **${getCount('nod')}** times, that's a lot of nods!`,
            `Oh and he's told us about his age **${getCount('age')}** times.`,
            `That's a lot of stats!`
        ]
        return message.reply(reply.join("\n"));
    }

    if (message.content.startsWith("/mbundy admin")) {
        if (!isAdmin(message.author.id)) return message.react("❌");

        const args = message.content.split(" ");
        if (args.length < 3) return message.reply("Invalid command");

        const command = args[2];
        if (command === "set") {
            if (args.length < 5) return message.reply("Invalid command");
            const key = args[3];
            const value = parseInt(args[4]);
            if (isNaN(value)) return message.reply("Invalid value");

            _store[key] = value;
            fs.writeFileSync(store, JSON.stringify(_store));
            return message.reply(`Set ${key} to ${value}`);
        }

        if (command === "reboot") {
            return process.exit(0); // pm2 will restart the process for us
        }

        if (command === "ping") {
            return message.reply("pong");
        }

        if (command === "stats") {
            return message.reply(`\`\`\`json\n${JSON.stringify(_store, 4, 4)}\`\`\``);
        }

        return message.reply("Invalid command");
    }

    if (message.author.id !== USER_ID && !(isAdmin(message.author.id) && message.content.startsWith("/mbundy test"))) return false;

    incrementCount('total_messages_sent'); // increment total count

    // await message.react('🔎');

    const checker = new CheckersWrapper(message);
    await checker.check();

    //                  V this makes the array unique
    const results = [...new Set(checker.results())]

    console.log("Matched ", checker.getResultNames());

    // Sleep so it feels like the bot is thinking, because it is... IT IS!
    // await sleep(1000)

    // message.reactions.removeAll();

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
            const start = randomFrom(responses['multiple'].start)
            const middle = results.map(result => {
                const random_middle = randomFrom(responses[result].middle);
                const count = getCount(result);
                return mustacheReplace(random_middle, { nth: nthNumber(count), times: count })
            }).join("\n");
            const end = randomFrom(responses['multiple'].end)

            const response = start + middle + end;

            await message.reply(response);

            for (const result of results) {
                await incrementCount(result);
            }
        }
    } else {
        // await message.react('✅');
        // setTimeout(() => message.reactions.removeAll(), 2000);
    }
});

client.login(process.env.BOT_TOKEN);