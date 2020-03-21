const { Pool } = require('pg')
const pool = new Pool({ max: 100 })

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    // process.exit(-1)
})

export async function pgQuery(sql) {
    const start = Date.now()
    const client = await pool.connect()
    try {
        const res = await client.query(sql, [])
        // console.log(res.rows[0])
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release()
    }
    console.log('spent ', Date.now() - start, 'ms')
}