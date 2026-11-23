import 'dotenv/config';
import express from 'express';
import path from 'path';
import pg from 'pg';

const app = express();
const pool = new pg.Pool();

const fmtNumber = (n) => Number(n).toLocaleString('en-US');
const fmtMoney = (n) =>
  Number(n).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

// makes any files in public available 
app.use(express.static(path.join(import.meta.dirname, 'public'))); 

app.get('/', async (req, res) => {
    const customerResult = await pool.query('SELECT count(*) FROM customers');
    const customerTotal = customerResult.rows[0].count;

    const revenueResult = await pool.query('SELECT sum(saleamount) FROM sales');
    const revenue = revenueResult.rows[0].sum;

    const ordersResult = await pool.query('SELECT count(quantity) FROM orders');
    const ordersTotal = ordersResult.rows[0].count;

    const issuesResult = await pool.query("SELECT count(id) FROM alerts WHERE type = 'issues'");
    const issuesTotal = issuesResult.rows[0].count;

    const notifResult = await pool.query("SELECT count(id) FROM alerts WHERE type = 'notifications'");
    const notifAmt = notifResult.rows[0].count;

    const salesResult = await pool.query(`
        SELECT products.name, sales.quantity, sales.saleamount
        FROM sales
        LEFT JOIN products ON sales.productid = products.id
        ORDER BY sales.id ASC
    `);
    const sales = salesResult.rows.map(s => ({ ...s, saleamount: fmtMoney(s.saleamount) }));

    const issuesListResult = await pool.query("SELECT * FROM alerts WHERE type = 'issues'");
    const issues = issuesListResult.rows;

    const notificationsResult = await pool.query("SELECT * FROM alerts WHERE type = 'notifications'");
    const notifications = notificationsResult.rows;

    const tasksResult = await pool.query("SELECT * FROM alerts WHERE type = 'tasks'");
    const tasks = tasksResult.rows;

    const pageSize = 10;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const offset = (page - 1) * pageSize;
    const totalPages = Math.ceil(Number(customerTotal) / pageSize);

    const customersResult = await pool.query(
        'SELECT * FROM customers ORDER BY id LIMIT $1 OFFSET $2',
        [pageSize, offset]
    );
    const customers = customersResult.rows;

    res.render('index', { customerTotal: fmtNumber(customerTotal), revenue: fmtMoney(revenue), 
        ordersTotal: fmtNumber(ordersTotal), issuesTotal: fmtNumber(issuesTotal), notifAmt: fmtNumber(notifAmt), 
        sales, issues, notifications, tasks, customers, page, totalPages });
});

// temporary route to test the database connection
app.get('/test-db', async (req, res) => {
    const result = await pool.query('SELECT count(*) FROM customers');
    res.json(result.rows[0]);
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));