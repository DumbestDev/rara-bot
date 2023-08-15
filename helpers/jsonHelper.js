const fs = require('fs');

module.exports = {
    createFiles: (jsonPath) => {
        if(fs.existsSync(jsonPath)) return 'alreadyExists';
        fs.appendFileSync(jsonPath, '{}', 'utf8');
    },
    addEntry: (jsonPath = '', keyValuePairEntry = { key: 'key', value: 'value' }) => {
        const json = fs.readFileSync(jsonPath, 'utf8');
        const content = JSON.parse(json);

        if(keyValuePairEntry.key in content) return 'alreadyExists';
        content[keyValuePairEntry.key] = keyValuePairEntry.value;
        
        const updatedJson = JSON.stringify(content, null, 2);
        fs.writeFileSync(jsonPath, updatedJson, 'utf8');
        return true;
    },

    replaceEntryValue: (jsonPath = '', key = -1, value = {}) => {
        const json = fs.readFileSync(jsonPath, 'utf8');
        const content = JSON.parse(json);

        if(!(key in content)) return 'doesntExists';
        content[key] = value;

        const updatedJson = JSON.stringify(content, null, 2);
        fs.writeFileSync(jsonPath, updatedJson, 'utf8');
        return true;
    },

    removeEntry: (jsonPath = '', key = -1) => {
        if(typeof key !== 'string') key = key.toString();

        const json = fs.readFileSync(jsonPath, 'utf8');
        const content = JSON.parse(json);

        if(!(key in content)) return 'doesntExists';
        delete content[key];

        const updatedJson = JSON.stringify(content, null, 2);
        fs.writeFileSync(jsonPath, updatedJson, 'utf8');
        return true;
    },

    clearJson: (jsonPath = '') => {
        const updatedJson = JSON.stringify({}, null, 2);
        fs.writeFileSync(jsonPath, updatedJson, 'utf8');
    },

    getValue: (jsonPath = '', key = -1) => {
        const json = fs.readFileSync(jsonPath, 'utf8');
        const content = JSON.parse(json);

        if(key in content) return content[key];
        else return null;
    },

    getKey: (jsonPath = '', value = '') => {
        const json = fs.readFileSync(jsonPath, 'utf8');
        const content = JSON.parse(json);
        let result = null;

        for(const key in content) {
            if(content[key] == value) {
                result = key;
                break;
            } 
        }

        return result;
    },

    getKeyByFieldValue: (jsonPath = '', fieldName = 'field', value = 'value') => {
        const json = fs.readFileSync(jsonPath, 'utf8');
        const content = JSON.parse(json);
        let result = null;

        for(const key in content) {
            if(content[key][fieldName] == value) {
                result = key;
                break;
            } 
        }

        return result;
    },

    keyExists: (jsonPath = '', key = '') => {
        const json = fs.readFileSync(jsonPath, 'utf8');
        const content = JSON.parse(json);

        return key in content;
    }
};