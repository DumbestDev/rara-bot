const { Client } = require('discord.js');
const errorHandler = require('../../helpers/errorHandler');
const dataHandler = require('./memberDataHandler');
const normalizeString = require('../../helpers/normalizeString');

function userSays(messageObj, id, ...strings) {
    if(messageObj.author.id == id) return anybodySays(messageObj, ...strings);
    return false;
}

function anybodySays(messageObj, ...strings) {
    for (let i = 0; i < strings.length; i++) {
        const string = normalizeString(strings[i]);
        if(messageObj.content.toLowerCase().includes(string)) 
            return true;
    }

    return false;
}

function learnMemberNames(client = new Client()) {
    client.guilds.fetch().then(() => {
        client.guilds.cache.forEach(guild => {
            guild.members.fetch().then(() => {
                guild.members.cache.forEach((member) => {
                    const memberData = {
                        id: member.user.id,
                        name: member.user.displayName,
                        nicknames: [],
                        tag: member.user.tag,
                        isBot: member.user.bot,
                        avatar: member.user.avatarURL(),
                        knowledge: []
                    }

                    dataHandler.rememberMember(memberData);
                })
            }).catch((err) => errorHandler(err, "fetching members"));
        })
    }).catch((err) => errorHandler(err, "fetching guilds"));
}

module.exports = {
    learnMemberNames,
    userSays,
    anybodySays,
}