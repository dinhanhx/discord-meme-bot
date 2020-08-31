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
            hostname: config.apiHost,
            port: config.apiPort,
            path: '/memes/new'
        }, (res) => {
            let str = '';
            res.on('data', (chunk) => {
                str += chunk;
            });

            res.on('end', () => {
                const fullResponse = JSON.parse(str);
                const attachment = new MessageAttachment(fullResponse.url);
                msg.channel.send(attachment);
            });
        });
    }
});

client.login(config.token);

