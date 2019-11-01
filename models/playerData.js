const { Client } = require('pg');

const URL = process.env.DATABASE_URL || "postgres://jxajtfiyacyrwk:8a092a2b90d9812baeab4d84bd365e8f43334c8459038df398fd40643bd1c6fa@ec2-174-129-253-101.compute-1.amazonaws.com:5432/d5u76s5mjnpv1d";
const client = new Client({
    connectionString: URL,
    ssl: true,
});

client.connect();

async function addPlayer(uid,name,score) {
    let query = "insert into userscore(sessionid,name,score) values(\'"+ uid + "\', \'"+ name +"\', "+ score+");";
    

    await client.query(query);
    
}

async function getLeaderBoard() {
    return await client.query('SELECT name,score, row_number() OVER (ORDER BY score DESC) as rnum FROM userscore ORDER BY score DESC LIMIT 5');
}

async function getPlayer(uid) {
    let query = "SELECT name,score,rnum FROM (SELECT sessionid,name, score, row_number() OVER (ORDER BY score DESC) as rnum FROM userscore) t WHERE sessionid='"+uid+"';"
    return await client.query(query);
}

module.exports = {
    add : addPlayer,
    leaderBoard : getLeaderBoard,
    get: getPlayer
}