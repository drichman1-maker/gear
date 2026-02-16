import sqlite3 from 'sqlite3';
import { promisify } from 'util';

async function initDb() {
  const db = new sqlite3.Database('./babygear.db');

  const exec = promisify(db.exec).bind(db);
  const run = promisify(db.run).bind(db);
  const all = promisify(db.all).bind(db);

  await exec(`
    CREATE TABLE IF NOT EXISTS products (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      msrp INTEGER,
      lifecycle_start_week INTEGER,
      usage_duration_weeks INTEGER,
      image_url TEXT
    );

    CREATE TABLE IF NOT EXISTS retailer_prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_slug TEXT,
      retailer_name TEXT NOT NULL,
      price REAL NOT NULL,
      currency TEXT DEFAULT 'USD',
      affiliate_url TEXT,
      availability TEXT,
      shipping_speed TEXT,
      FOREIGN KEY (product_slug) REFERENCES products(slug)
    );

    CREATE TABLE IF NOT EXISTS product_attributes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_slug TEXT,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      FOREIGN KEY (product_slug) REFERENCES products(slug)
    );

    CREATE TABLE IF NOT EXISTS lifecycle_stages (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      value INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS product_recommendations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      context_slug TEXT,
      product_slug TEXT,
      recommendation_reason TEXT,
      is_essential BOOLEAN,
      FOREIGN KEY (product_slug) REFERENCES products(slug)
    );
  `);

  console.log('Database schema created.');

  // Seed Products
  const products = [
    {
      slug: 'uppababy-vista-v2',
      name: 'Vista V2 Stroller',
      brand: 'UPPAbaby',
      category: 'Strollers',
      description: 'The UPPAbaby VISTA V2 is designed to grow with your family.',
      msrp: 999,
      lifecycle_start_week: 20,
      usage_duration_weeks: 208,
      image_url: 'https://images.clothes.com/is/image/UPPAbaby/0320-VIS-US-GRG'
    },
    {
      slug: 'nuna-pipa-rx',
      name: 'Pipa RX + RELX Base',
      brand: 'Nuna',
      category: 'Car Seats',
      description: 'Premium infant car seat with relaxed installation.',
      msrp: 400,
      lifecycle_start_week: 28,
      usage_duration_weeks: 52,
      image_url: 'https://images.clothes.com/is/image/Nuna/p-pipa-rx'
    },
    {
      slug: 'snoo-smart-sleeper',
      name: 'SNOO Smart Sleeper',
      brand: 'Happiest Baby',
      category: 'Bassinets',
      description: 'The worlds most awarded smart baby bassinet.',
      msrp: 1695,
      lifecycle_start_week: 32,
      usage_duration_weeks: 26,
      image_url: 'https://images.clothes.com/is/image/HappiestBaby/snoo-smart-sleeper'
    }
  ];

  for (const p of products) {
    await run(
      'INSERT OR REPLACE INTO products (slug, name, brand, category, description, msrp, lifecycle_start_week, usage_duration_weeks, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [p.slug, p.name, p.brand, p.category, p.description, p.msrp, p.lifecycle_start_week, p.usage_duration_weeks, p.image_url]
    );
  }

  // Seed Prices
  const prices = [
    { product_slug: 'uppababy-vista-v2', retailer: 'Amazon', price: 999.99, url: 'https://amazon.com/dp/B083F8X9J2' },
    { product_slug: 'uppababy-vista-v2', retailer: 'Target', price: 999.99, url: 'https://target.com/p/uppababy-vista-v2' },
    { product_slug: 'nuna-pipa-rx', retailer: 'Nordstrom', price: 399.95, url: 'https://nordstrom.com/s/nuna-pipa-rx' },
    { product_slug: 'snoo-smart-sleeper', retailer: 'Direct', price: 1695.00, url: 'https://happiestbaby.com/products/snoo' }
  ];

  for (const pr of prices) {
    await run(
      'INSERT INTO retailer_prices (product_slug, retailer_name, price, affiliate_url, availability) VALUES (?, ?, ?, ?, ?)',
      [pr.product_slug, pr.retailer, pr.price, pr.url, 'In Stock']
    );
  }

  for (let i = 20; i <= 40; i++) {
    await run('INSERT OR REPLACE INTO lifecycle_stages (slug, title, type, value) VALUES (?, ?, ?, ?)',
      [`pregnancy-week-${i}`, `Week ${i} of Pregnancy`, 'pregnancy', i]);
  }

  console.log('Database seeded.');
  db.close();
}

initDb().catch(console.error);
