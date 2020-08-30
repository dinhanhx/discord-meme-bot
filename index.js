const http = require('http');
const { Client, MessageAttachment } = require('discord.js');

const config = require('./config');
const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.toLowerCase() === 'send meme') {
        http.get({
            hostname: 'localhost',
            port: 5000,
            path: '/new'
        }, (res) => {
            let str = '';
            res.on('data', (chunk) => {
                str += chunk;
            });

            res.on('end', () => {
                const fullResponse = JSON.parse(str);
                const attachment = new MessageAttachment(fullResponse.chosen.url);
                msg.channel.send(attachment);
            });
        });
    }
});

client.login(config.token);

