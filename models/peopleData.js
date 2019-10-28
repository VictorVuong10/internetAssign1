let p = [];

function addPeople(e) {
    p.push(e);
}

function getAllPeople() {
    return p;
}

function getPeople(id) {
    return p[id];
}

module.exports = {
    add : addPeople,
    getall : getAllPeople,
    getpeople: getPeople 
}