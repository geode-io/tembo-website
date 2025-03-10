---
sidebar_position: 2
tags:
  - Postgres Basics
---

import InnerJoin from './images/inner-join.png';
import LeftJoin from './images/left-join.png';
import RightJoin from './images/right-join.png';
import FullOuterJoin from './images/full-outer-join.png';
import CrossJoin from './images/cross-join.png';
import InnerJoinTables from './images/inner-join-tables.png';
import LeftJoinTables from './images/left-join-tables.png';
import SelfJoinTable from './images/self-join-table.png';
import CrossJoinTables from './images/cross-join-tables.png';
import InnerJoinTablesResults from './images/inner-join-table-results.png';
import LeftJoinTablesResults from './images/left-join-table-results.png';
import RightJoinTablesResults from './images/right-join-table-results.png';
import FullOuterJoinTablesResults from './images/full-outer-join-table-results.png';
import CrossJoinTablesResults from './images/cross-join-table-results.png';
import SelfJoinTablesResults from './images/self-join-table-results.png';

# All possible joins in Postgres (Inner, Outer, Left, Right, etc)

Postgres offers a collection of useful Join methods that a user can perform to extract the logical relationships in their data. In this guide, we will discuss 6 Join methods - Inner Join, Left Join, Right Join, Full Outer Join, Cross Join, and Self Join.

:::info
Do connect your terminal with your desired Postgres database to try out every join in Postgres. Follow our guide to see the whole process, [click here](https://tembo.io/docs/postgres_guides/how-to-connect-to-postgres/).
:::

Now, let’s discuss each join with the help of examples where we can see a use case for them.

## Inner Join

It returns rows from both tables where there is a match followed by a specified join condition. produces only the set of records that match in both Table A and Table B.

<img src={InnerJoin} width="400" height="100" alt="inner-join-tables" />

```
SELECT * FROM table1 INNER JOIN table2 ON table1.column = table2.column;
```

Make sure to replace `table1` and `table2` with the names of your tables in command.

### Example

Suppose there are two tables - customers and orders:

<img src={InnerJoinTables} width="800" height="100" alt="inner-join-tables" />

We want the list of customers who have placed an order. To do that, we will use `Inner Join`.

```
SELECT o.order_id, c.first_name, c.last_name, o.order_date
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id;
```

<img src={InnerJoinTablesResults} width="700" height="100" alt="inner-join-table-results" />

## Left Join

It return all rows from left table and matching rows from the right table. Null values will be returned for the right table if there are no matching rows.

It produces a complete set of records from Table A, with the matching records in Table B. If there is no match, the right side will contain null.

<img src={LeftJoin} width="400" height="100" alt="left-join" />

```
SELECT * FROM table1 LEFT JOIN table2 ON table1.column = table2.column;
```

### Example

Suppose there are two tables - employees and projects

<img src={LeftJoinTables} width="800" height="100" alt="left-join-tables" />

and we want to get the list of all employees with the project they are assigned to, even if they haven’t been assigned any project. To do that, we will use `Left Join`.

```
SELECT employees.employee_id, employees.employee_name, projects.project_name
FROM employees
LEFT JOIN projects ON employees.employee_id = projects.employee_id;
```

<img src={LeftJoinTablesResults} width="800" height="100" alt="left-join-table-results" />

## Right Join

It return all rows from right table and matching rows from the left table. Null values will be returned for the left table if there are no matching rows.

It produces a complete set of records from Table B, with the matching records in Table A. If there is no match, the left side will contain null.

<img src={RightJoin} width="400" height="100" alt="right-join" />

```
SELECT * FROM table1 RIGHT JOIN table2 ON table1.column = table2.column;
```

### Example

Now, suppose we want to get the list of all projects with the employees they are assigned to, even if no employee has been assigned to that project. For that, we can use Right Join:

```
SELECT employees.employee_id, employees.employee_name, projects.project_name
FROM employees
RIGHT JOIN projects ON employees.employee_id = projects.employee_id;
```

<img src={RightJoinTablesResults} width="800" height="100" alt="right-join-tables-results" />

## Full Outer Join

It returns all the rows where there is match in both the left and the right table. Null values are returned for the columns where there is not any match.

It produces the set of all records in Table A and Table B, with matching records from both sides where available. If there is no match, the missing side will contain null.

<img src={FullOuterJoin} width="400" height="100" alt="full-outer-join" />

```
SELECT * FROM table1 FULL OUTER JOIN table2 ON table1.column = table2.column;
```

### Example

Suppose, now we want to see the full list of employees and projects along with the employees that does not have any projects assigned and projects that are not assigned to any employees. In such case, we can use Full Outer Join:

```
SELECT e.employee_id, e.employee_name, p.project_name
FROM employees e
FULL OUTER JOIN projects p
ON e.employee_id = p.employee_id;
```

<img src={FullOuterJoinTablesResults} width="700" height="100" alt="full-outer-join-tables-results" />

## Cross Join

It returns the result of Cartesian multiplication between the both tables. It combines the every row of left table to the every row of right table and gives the final result.

It does not require any condition.

<img src={CrossJoin} width="400" height="100" alt="cross-join" />

```
SELECT * FROM table1 CROSS JOIN table2;
```

### Example

Suppose there are two tables - boys and girls:

<img src={CrossJoinTables} width="700" height="100" alt="cross-join-tables" />

For a prom night, we want to see how many couples can be formed by this list of boys and girls. For that, we can use Cross Join:

```
SELECT * FROM boys CROSS JOIN girls;
```

<img src={CrossJoinTablesResults} width="500" height="100" alt="left-join-table-results" />

## Self Join

It joins the table with itself and returns the final output. Self joins is commonly used to compare rows within the same table.

```
SELECT * FROM table_alias_1 JOIN table_alias_2 ON table_alias_1.column_1 = table_alias_2.column_2;
```

### Example

Suppose there is a table employees consisting of employee id, employee names and their manager id:

<img src={SelfJoinTable} width="400" height="100" alt="self-join-tables" />

We want to get the list of staff along with the name of their respective managers. We can get the manager name by matching the manager_id with the corresponding staff_id. To do that, we will use Self Join:

```
SELECT s.staff_name AS staffs, m.staff_name AS manager
FROM staff s
LEFT JOIN staff m ON s.manager_id = m.staff_id;
```

<img src={SelfJoinTablesResults} width="700" height="100" alt="self-join-table-results" />

## Conclusion

In this guide, we covered all types of Join methods that a user can perform on data stored in tabular format.

To learn more about Postgres, we encourage you to explore our [blog posts](https://tembo.io/blog).

You can check out our [guides page](https://tembo.io/docs/category/postgres-guides) to know more about basic operations you can perform on Postgres.

## Appendix

Here is [a SQL file](./database_data.sql) that replicates the data used in this guide so you can try the joins yourself. You can simply download the attached SQL file and load it into your database to try out the various Join methods.
