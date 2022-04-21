import DiscordJS, { ClientApplication, Intents } from 'discord.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})

client.on('ready', () => {
    console.log('ready');
})

client.on('messageCreate', (message) => {
    if (message.content == 'hoje') {
        sendToday(message);
    }
})


function sendToday(message: DiscordJS.Message) {
    const image = getRandomImage();

    message.reply({
        content: 'HOJE É',
        files: [image]
    });
}

function getRandomImage() {
    const date = new Date();
    const day = date.getDay();

    const todayImages = getTodayImages(day);
    const image = pickImage(todayImages);

    const path = './assets/imgs/' + image;

    return path;
}

function getTodayImages(day: number) {
    const todayImages: string[] = [];
    fs.readdirSync('./assets/imgs').forEach(file => {
        if (file.includes(day + '_')) {
            todayImages.push(file);
        }
    });
    return todayImages;
}

function pickImage(images: string[]) {
    const max = images.length;
    const chose = Math.floor(Math.random() * max - 1) + 1;
    return images[chose];
}

client.login(process.env.TOKEN);    