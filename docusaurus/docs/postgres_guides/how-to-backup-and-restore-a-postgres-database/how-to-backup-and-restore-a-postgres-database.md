---
sidebar_position: 2
tags:
  - Postgres Basics
---

# How to Backup and Restore a Postgres Database

Postgres comes with a variety of methods to backup and restore the state of your database. It is an essential task for database administrators to ensure data integrity and recover from data loss or system failures.

Suppose you are working on a company’s project and you do not want to lose any of the project’s data like user details, tables, etc; while simultaneously maintaining the security of data. In such a scenario, consistently backing up your database is critical. Let’s see how you can do this.

## Creating a database backup

### Using `pg_dump`

The utility named `pg_dump` allows the users to create a logical backup of a specific Postgres database. Execute the following command to export the contents of the database into a SQL text file:

``` sh
pg_dump -U username -d database_name -f backup_file.sql
```

Make sure to replace the `username` with your Postgres username and `database_name` with the database name whose backup you want to create. You can also name the backup file however you like.

:::info
`pg_dump` extracts a particular Postgres database into a script file. It generates reliable backups, even when the database is in active use.

Check out their [official documentation](https://www.postgresql.org/docs/current/app-pgdump.html) to learn more about it.
:::

### Using `pg_dumpall`

Postgres comes with a `pg_dumpall` command which allows the users to backup the whole PostgreSQL cluster. This cluster includes all the databases and roles stored in the Postgres server.

Execute the following `pg_dumpall` command to export the data of the entire Postgres instance or cluster:

``` sh
pg_dumpall -U username -f backup_file.sql
```

Make sure to replace the `username` with your own Postgres’ username.

:::info
`pg_dumpall` extracts the entire Postgres database instance into a script file. It simply executes the `pg_dump` command for each database.

To learn more about it, check their [official documentation](https://www.postgresql.org/docs/current/app-pg-dumpall.html).
:::

It generates the `backup_file.sql` file which consists of all the necessary SQL commands to recreate the entire PostgreSQL cluster.

Just like `pg_dump`, `pg_dumpall` will also generate the `backup_file.sql` file holding all the necessary SQL commands to recreate the database.

### Using a Continuous Archiving Solution

There are several open source solutions for continuous archiving in Postgres. pgBackRest and Barman are a couple examples, which can be used to take backups of large and complex databases. These tools offer highly advanced backup and restore capabilities to enhance data protection and recovery strategies in PostgreSQL environments.

Do visit the official documentation of [pgBackRest](https://pgbackrest.org/) and [Barman](https://www.pgbarman.org/) to learn more about them.

## Restoring a database from a backup file

### Using `pg_restore`

Just like `pg_dump` for exporting data, Postgres comes with a `pg_restore` command which allows users to import data, and enables database restores.

Run the following command in your terminal to import a SQL file and restore the database:

``` sh
pg_restore -U username -d new_database_name -1 backup_file.sql
```

Do replace the `username` and `new_database_name` with your Postgres username and the desired name of the new database respectively.

:::info
`pg_restore` command basically restores the postgres database from an archive created by the `pg_dump` command. `pg_restore` depends upon the archive files to restore the database, or even to organize the items before restoring them.

Please explore their [official documentation](https://www.postgresql.org/docs/current/app-pgrestore.html) to gain a deeper understanding of their features and capabilities.
:::

### Using `psql`

You can also restore the backup using `psql`. To do that, you first need to create a new database in the Postgres server.

Use the following command in your terminal to create a new database:

``` sh
createdb -U username new_database_name
```

Then use the following `psql` command to import the database from the backup file:

```
psql -U username -d new_database_name -f backup_file.sql
```

Replace the `username`, `new_database_name`, and `backup_file.sql` with your Postgres name, name of newly created database, and the backup file respectively.

### Using `psql` for `pg_dumpall`

Above we have discussed the `pg_dumpall` method to backup the database, so if you follow that method, you can execute the following `psql` command to instantly retrieve the database -

``` sh
psql -U username -f backup_file.sql
```

Use your own username and backup file in-place of `username` and `backup_sql.file`.

This method will restore the objects from your whole database instance.

## Conclusion

In this guide, we discussed how to take backup and restore a Postgres database.

Check out our [other guides](https://tembo.io/docs/category/postgres-guides) to learn more about Postgres.

Also visit [our blog](https://tembo.io/blog/) if you want to know the latest updates and technical news coming from Tembo.
