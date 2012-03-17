var rest = require('restler');

var Trello = function (key, token) {
    this.uri = "https://api.trello.com";
    this.key = key;
    this.token = token;
};

Trello.prototype.createQuery = function () {
    return {key: this.key, token: this.token};
};

Trello.prototype.addBoard = function (name, description, organizationId, callback) {

    var query = this.createQuery();
    query.name = name;

    if (description !== null)
        query.desc = description;
    if (organizationId !== null)
        query.idOrganization = organizationId;

    rest.post(this.uri + '/1/boards', {query: query})
        .on('complete', function (result) {
            if (result instanceof Error) {
                callback(result);
            } else {
                callback(null, result);
            }
        });
};

Trello.prototype.addListToBoard = function (boardId, name, callback) {

    var query = this.createQuery();
    query.name = name;

    rest.post(this.uri + '/1/boards/' + boardId + '/lists', {query: query})
        .on('complete', function (result) {
            if (result instanceof Error) {
                callback(result);
            } else {
                callback(null, result);
            }
        });
};

Trello.prototype.getListsOnBoard = function (boardId, callback) {

    var query = this.createQuery();

    rest.get(this.uri + '/1/boards/' + boardId + '/lists', {query: query})
        .on('complete', function (result) {
            if (result instanceof Error) {
                callback(result);
            } else {
                callback(null, result);
            }
        });
};

module.exports = Trello;