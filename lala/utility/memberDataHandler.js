const jsonHelper = require('../../helpers/jsonHelper');
const path = require('path');
const userDataPath = path.resolve(__dirname, '..', 'data/usersMet.json');
const botDataPath = path.resolve(__dirname, '..', 'data/botsMet.json');

module.exports = {
    rememberMember: function(data) {
        const jsonPath = this.getPath(data.isBot);
        const user = { key: data.id, value: data }
        const result = jsonHelper.addEntry(jsonPath, user);

        if (result != 'alreadyExists') 
            console.log(`Lala learned ${data.name}'s name! (${data.id})`);
        else 
            this.updateMemberData(jsonHelper.getValue(jsonPath, data.id), data);
        
    },

    forgetMember: function(discordID, isBot = false) {
        const jsonPath = this.getPath(isBot);
        const result = jsonHelper.removeEntry(jsonPath, discordID);

        if (result != 'doesntExists') console.log(`Lala forgot ${discordID}'s name!`);
    },

    updateMemberData: function(data, updatedData) {
        const jsonPath = this.getPath(data.isBot);
        data.name = updatedData.name;
        data.tag = updatedData.tag;
        data.avatar = updatedData.avatar;

        jsonHelper.replaceEntryValue(jsonPath, data.id, data);
    },

    wipeUserData: function() {
        jsonHelper.clearJson(userDataPath);
        console.log("Whoops, lala's mind has been wiped. (names deleted)")
    },

    wipeBotData: function() {
        jsonHelper.clearJson(botDataPath);
        console.log("Whoops, lala's mind has been wiped. (names deleted)")
    },

    getNameFromID: function(discordID, isBot = false) {
        const jsonPath = this.getPath(isBot);
        return jsonHelper.getValue(jsonPath, discordID).name;
    },

    getIDFromTag: function(tag, isBot = false) {
        const jsonPath = this.getPath(isBot);
        return jsonHelper.getKeyByFieldValue(jsonPath, 'tag', tag);
    },

    memberExists: function(discordID, isBot = false) {
        const jsonPath = this.getPath(isBot);
        return jsonHelper.keyExists(jsonPath, discordID);
    },

    getPath: function(isBot) {
        const path = isBot ? botDataPath : userDataPath;
        jsonHelper.createFiles(path); //* creates files if they doesn't exists
        return path;
    }
}