const http = require('http');
const { Client, MessageAttachment } = require('discord.js');

const config = require('./config');
const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const sendMeme = (res) => {
        let str = '';
        res.on('data', (chunk) => {
            str += chunk;
        });
    
        res.on('end', () => {
            const fullResponse = JSON.parse(str);
            msg.channel.send(fullResponse.url);
        });
    }
    const message = msg.content.toLowerCase();
    if (message === 'send meme') {
        http.get({
            hostname: config.apiHost,
            port: config.apiPort,
            path: '/memes/new'
        }, sendMeme);
    } else if (message === 'send hot meme') {
        http.get({
            hostname: config.apiHost,
            port: config.apiPort,
            path: 'memes/hot'
        }, sendMeme)
    }
});

client.login(config.token);

