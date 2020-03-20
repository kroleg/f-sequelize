import { Sequelize } from 'sequelize';

const user = process.env.PGUSER;
const password = process.env.PGPASSWORD;
const db = process.env.PGDATABASE;
const host = process.env.PGHOST;
const port = process.env.PGPORT || 5432;
export const postgresUrl = `postgres://${user}:${password}@${host}:${port}/${db}`;

const sequelize = new Sequelize(postgresUrl, {
    dialect: 'postgres',
    // logging: (sql: string, timing?: number) => {
    //     console.log('[sequelize] (%sms) %s', timing, sql)
    // },
    // pool: {
    //     max: 200,
    // },
    benchmark: true,
    // common settings for all models
    // define: {
    //     underscored: true,
    //     timestamps: true,
    //     paranoid: true,
    //     defaultScope: {
    //         order: [['id', 'ASC']]
    //     }
    // },
});

sequelize.authenticate()

export { sequelize }