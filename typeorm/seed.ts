import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tinyurl',
  password: 'postgres',
  port: 5432,
});

const seedData = async () => {
  try {
    await pool.connect();

    await pool.query(`
      INSERT INTO public."user" (username, "password", "name", email, "createdAt") VALUES('joe', '1234', 'John Doe', 'jservatlorca@gmail.com', now()),('joe2', '1234', 'John Doe', 'jservatlorca2@gmail.com', now());
    `);

    console.log('Data seeding completed successfully.');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await pool.end();
  }
};

seedData();
