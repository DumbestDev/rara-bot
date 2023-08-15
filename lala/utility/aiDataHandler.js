const jsonHelper = require('../../helpers/jsonHelper');
const path = require('path');
const aiDataPath = path.resolve(__dirname, '..', 'data/ai.json');

module.exports = {
    getKoboldUrl: function() {
        return jsonHelper.getValue(aiDataPath, 'koboldUrl');
    },
    setKoboldUrl: function(url) {
        jsonHelper.replaceEntryValue(aiDataPath, 'koboldUrl', url);
        console.log(`Kobold url has been set to ${url}`);
    }
}