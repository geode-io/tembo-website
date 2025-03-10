---
sidebar_position: 2
tags:
  - Postgres Basics
---

# Connecting to Postgres with Python

In this tutorial, we've covered a comprehensive, step-by-step procedure for establishing a connection to a PostgreSQL database using Python. We will take advantage of _psycopg_ library to connect to the Postgres database.

Let’s get started

**Step 1** - Install the “psycopg” library in your project. Run this command in your terminal to install the library:

``` sh
pip install psycopg
```

:::info
psycopg is the most popular PostgreSQL database library for the Python language. It was designed for large-scale applications that create and deletes tons of cursors and make large amount of continuous Inserts and Update calls.

You can read more about psycopg library [here](https://pypi.org/project/psycopg/)
:::

**Step 2** - Import psycopg in your Python code

``` python
import psycopg
```

**Step 3** - Setup a database connection. For that, create a connection object consisting of database connection parameters - username, database name, password, host and port.

``` python
    connection = psycopg.connect(
        dbname="database_name",
        user="username",
        password="password",
        host="host",
        port="port"
    )
```

Make sure to replace the database_name, username, password, host, and port with the credentials of your database.

**Step 4** - Create a cursor object to run the SQL queries. A cursor is the main object that interacts with the database

``` python
cursor = connection.cursor()
```

**Step 5** - Execute the desired SQL query in the cursor object.

``` python
cursor.execute("SELECT * FROM customers")
dataset = cursor.fetchall()

For data in dataset:
    print(data)
```

You can execute your desired query in the cursor object. Also, you can create multiple cursor objects simultaneously to execute multiple SQL queries concurrently.

**Step 6** - Close the created cursor object and connection when their work is done.

``` python
cursor.close()
connection.close()
```

You can always create a new cursor object after closing an existing cursor object.

Here’s the full code sample:

``` python
# Importing library
import psycopg

# Building the database connection

    connection = psycopg.connect(
        dbname="database_name",
        user="username",
        password="password",
        host="host",
        port="port"
    )
    # Successfully connected to database

# Creating a cursor
cursor = connection.cursor()

# Executing SQL queries
cursor.execute("SELECT * FROM customers")
Datasets = cursor.fetchall()

for data in datasets:
    print(row)

# Closing the cursor
cursor.close()

```

You can simply copy and paste this code snippet to integrate in your project. Just make sure to replace the variables with the database credentials.

## Conclusion

In this guide, we discussed the step-by-step process to connect to the Postgres database with Python.

You can also read our well-structured [guides for Postgres operations](https://tembo.io/docs/category/postgres-guides).

For further exploration of valuable PostgreSQL-related content, we encourage you to explore our informative [blog posts](https://tembo.io/blog).
