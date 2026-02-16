import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

async function exportData() {
    const db = new sqlite3.Database('./babygear.db');
    const all = promisify(db.all).bind(db);

    console.log('Fetching data from database...');

    const products = await all('SELECT * FROM products');
    const retailerPrices = await all('SELECT * FROM retailer_prices');
    const productAttributes = await all('SELECT * FROM product_attributes');
    const lifecycleStages = await all('SELECT * FROM lifecycle_stages');
    const recommendations = await all('SELECT * FROM product_recommendations');

    const data = {
        products,
        retailerPrices,
        productAttributes,
        lifecycleStages,
        recommendations
    };

    const outputPath = path.resolve('public', 'data.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log(`Data exported to ${outputPath}`);
    db.close();
}

exportData().catch(console.error);
