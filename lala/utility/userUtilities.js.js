const { Client, ActivityOptions } = require("discord.js")
const fs = require('fs');
const path = require('path');
const onlineActivitiesPath = path.resolve(__dirname, '..', 'data/onlineActivities.json');
const offlineActivitiesPath = path.resolve(__dirname, '..', 'data/offlineActivities.json');

/**
 * @param {Client} client Lala's bot client
 * @param {string} status Status to set ('online', 'idle', 'invisible' or 'dnd')
 * @param {string} activityName Activity to set (e.x. Busy bullying minorities)
 */
function setState(client, status, activityName) {
    client.user.setPresence({
        status,
        activities: [{name: activityName}]
    })
}

/**
 * @param {Client} client Lala's bot client
 * @param {string} activity Activity to set (e.x. Busy bullying minorities)
 * @param {ActivityOptions} options ActivityOptions for the activity. Check documentation.
 */
function setActivity(client, activity, otherOptions = null) {
    client.user.setActivity(activity, otherOptions);
}

/**
 * @param {Client} client Lala's bot client
 * @param {string} status Status to set ('online', 'idle', 'invisible' or 'dnd')
 */
function setStatus(client, status) {
    client.user.setStatus(status);
}

function setApiOnlineState(client) {
    const msgs = JSON.parse(fs.readFileSync(onlineActivitiesPath, 'utf-8'));
    const randomMsg = msgs[Math.floor(Math.random() * msgs.length)]

    setState(client, 'online', randomMsg);
}

function setApiOfflineState(client) {
    const msgs = JSON.parse(fs.readFileSync(offlineActivitiesPath, 'utf-8'));
    const randomMsg = msgs[Math.floor(Math.random() * msgs.length)]

    setState(client, 'dnd', randomMsg);
}


module.exports = {
    setState,
    setActivity,
    setStatus,
    setApiOnlineState,
    setApiOfflineState
}