import Koa from 'koa';

import { sequelize } from './libs/seq'
import { pgQuery } from './libs/pg'

const app = new Koa();

app.use(async (ctx) => {
    const sql = `SELECT * FROM clubs WHERE id > 5000`
    if (process.env.PG) {
        await pgQuery(sql)
    } else {
        await sequelize.query(sql)
    }
    ctx.body = 'ok'
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.info(`App is up on http://localhost:${port}`);
    console.info(`Using ${process.env.PG ? `PG` : 'SEQUELIZE'}`);
});