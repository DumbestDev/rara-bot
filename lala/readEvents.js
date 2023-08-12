const onMessageCreate = require('./events/onMessageCreate');
const onReady = require('./events/onReady');

module.exports = (client) =>
{
    onReady(client); //* Events that run when Lala logins
    onMessageCreate(client); //* Events that run when an user sends a message
}