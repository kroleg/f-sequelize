import http from 'http';
import blocked from 'blocked-at';

import { sequelize } from './libs/seq'
import { pgQuery } from './libs/pg'

blocked((time, stack) => {
    console.log(`Blocked for ${time}ms, operation started here:`, stack)
}, { threshold: 100 })

const sql = `SELECT * FROM clubs WHERE id > 5000`

const port = 3000
const requestHandler = (request, response) => {
    if (process.env.PG) {
        pgQuery(sql).then(r => response.end('OK'))
    } else {
        sequelize.query(sql).then(r => response.end('OK'))
    }
}

const server = http.createServer(requestHandler)

// @ts-ignore
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})