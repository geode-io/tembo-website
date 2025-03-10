---
sidebar_position: 2
tags:
  - Postgres Basics
---

# Connecting to Postgres with Nodejs

In this tutorial, we have provided a thorough, step-by-step guide for creating a connection to a PostgreSQL database using Node.js. We will use the `pg` package for establishing a connection to the Postgres database.

Let’s get started

**Step 1** - Install the `pg` package in your project using npm. To install it, run this command in your terminal

``` sh
npm install pg
```

:::info
pg is a popular Node.js library used to work with Postgres. It serves as a PostgreSQL database driver for Node.js applications. To know more about pg, [check their official documentation](hhttps://node-postgres.com/)
:::

**Step 2** - Initialize the `pg` package in your Node.js script and get the Client from it.

``` js
const { Client } = require('pg');
```

Make sure you initialize the pg package at the top of program

**Step 3** - Create a PostgreSQL client object consisting of essential Postgres database credentials.

``` js
const client = new Client({
  user: 'username',
  password: 'password',
  host: 'host',
  port: 'port_number',
  database: 'database_name',
});
```

Make sure to replace the `username`, `password`, `host`, `port_number`, and `database_name` with the actual credentials of your Postgres database

**Step 4** - Setup a connection with the database using the connect method with the manually created client object

``` js
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });
```

**Step 5** - Execute your desired SQL query to get the data. You can use the query method to run the SQL query

``` js
client.query('SELECT * FROM customers', (err, result) => {
  if (err) {
    console.error('Error executing query', err);
  } else {
    console.log('Query result:', result.rows);
  }
});
```

**Step 6** - Close the connection after the whole work is done. Use the end method to close the connection

``` js
client.end()
  .then(() => {
    console.log('Connection to PostgreSQL closed');
  })
  .catch((err) => {
    console.error('Error closing connection', err);
  });
```

Here’s the complete code to connect to the Postgres database with Node.js

``` js
const { Client } = require('pg');

// Database connection configuration
const dbConfig = {
  user: 'username',
  password: 'password',
  host: 'host',
  port: 'port_number',
  database: 'database_name',
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');

    // Execute SQL queries here

    client.query('SELECT * FROM employees', (err, result) => {
      if (err) {
        console.error('Error executing query', err);
      } else {
        console.log('Query result:', result.rows);
      }

      // Close the connection when done
      client.end()
        .then(() => {
          console.log('Connection to PostgreSQL closed');
        })
        .catch((err) => {
          console.error('Error closing connection', err);
        });
    });
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

```

In this example, we have demonstrated how you can read the data, but you can also perform other operations of Postgres database also like Insert, Update, and Create Table

## `Insert` statements

``` js
client.connect()
  .then(() => {

    const insert = 'INSERT INTO employees(column1, column2) VALUES (value1, value2)';
    const values = ['value1', 'value2'];

    client.query(insert, values, (err, result) => {
      if (err) {
        console.error('Error inserting data', err);
      } else {
        console.log('Data inserted successfully');
      }

      client.end();
    });
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });
```

## `Update` statements

``` js
const update = 'UPDATE employees SET column1 = value1 WHERE column2 = value2';
const values = ['updated_value', 'criteria_value'];

client.query(update, values, (err, result) => {
  if (err) {
    console.error('Error updating data', err);
  } else {
    console.log('Data updated successfully');
  }

  client.end();
});

```

## DDL statements like `Create Table`

``` js
const createTable = `
  CREATE TABLE employees(
    id serial PRIMARY KEY,
    column1 datatype1,
    column2 datatype2
  );
`;

client.query(createTable, (err, result) => {
  if (err) {
    console.error('Error creating table', err);
  } else {
    console.log('Table created successfully');
  }

  client.end();
});

```

## Conclusion

In this guide, we discussed the step-by-step process to connect to the Postgres database with Node.js.

We highly suggest you to read our [guides to understand the multiple operations you can perform with the Postgres database](https://tembo.io/docs/category/postgres-guides)

Also, check our highly informative [blog posts](https://tembo.io/blog) to learn about our useful extensions.
