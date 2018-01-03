# SQL

Relational databases organize data into _tables_, which look a lot like spreadsheets. Each row in a table is a record, an individual data item. The columns are the fields or attributes belonging to each item. Each row has a _primary key_, most often a single column, that allows it to be related to data in other tables.

SQL (Structured Query Language) is a language that enables creating, editing, and querying relational databases. A good beginner's guide to SQL is available at <a href="http://www.sohamkamani.com/blog/2016/07/07/a-beginners-guide-to-sql/">http://www.sohamkamani.com/blog/2016/07/07/a-beginners-guide-to-sql/</a>

There are many SQL databases. We will be using <a href="https://www.postgresql.org/">PostgreSQL</a>.

## Installing and creating a database

You can download and install Postgres from <a href="https://www.postgresql.org/download/">the PostgreSql website</a>. For Mac users, it is strongly recommended that you choose the [Postgres.app](http://postgresapp.com/) option. It is much easier than the other options. Installation on Windows is [a little more complicated](win.md).

After successful installation you can create a new database with the `createdb` command.

```
createdb cities
```

After creating a database, you can open `psql`, the Postgres command line, to start working with it.

```
psql -d cities
```

You can also write your commands in a file and use `psql` to run them.

```
psql -d cities -f setup.sql
```

## Creating a table

To create a table you use a `CREATE TABLE` statement, specifying the column names you would like to use as well as the <a href="https://www.postgresql.org/docs/9.5/static/datatype.html">data types</a> they may contain.

```sql
CREATE TABLE cities (
    id SERIAL primary key,
    city VARCHAR(255) not null,
    state VARCHAR(255),
    country VARCHAR(255)
);
```

The `SERIAL` type is really an integer but one that will increment with each row that is added, guaranteeing that each row has a unique primary key.

The `VARCHAR` is for text of a length that is not predetermined. The parenthetical number 255 in the example above specifies the maximum length to allow.

`not null` indicates that the name field is required.

It is possible to change a table after it has been created, but this can be problematic if there is already a lot of data in the table.

```sql
ALTER TABLE cities ADD COLUMN population INTEGER;
```

You can also remove columns.

```sql
ALTER TABLE cities DROP COLUMN state;
```

## Creating, reading, updating, and deleting data

To add rows to a table you use an `INSERT` statement, specifying the name of the table and the names of the columns you are inserting data into as well as the values for each column.

```sql
INSERT INTO cities (city, country, population) VALUES ('Berlin', 'Germany', 3610156);
INSERT INTO cities (city, country, population) VALUES ('Hamburg', 'Germany', 1774242);
INSERT INTO cities (city, country, population) VALUES ('Munch', 'Germany', 1450381);
INSERT INTO cities (city, country, population) VALUES ('Tokyo', 'Japan', 13617445);
INSERT INTO cities (city, country, population) VALUES ('Sydney', 'Australia', 4921000);
```

To update a row or rows, you use an `UPDATE` statement.

```sql
UPDATE cities SET city = 'Munich' WHERE city = 'Munch';
```

The `WHERE` clause performs a query to find the row or rows to update.

To delete a row or rows, you use `DELETE`.

```sql
DELETE FROM cities WHERE country <> 'Germany';
```

(The `<>` in the example above means 'not equal'.)

`SELECT` statements perform queries.

```sql
SELECT * FROM cities;

 id |  city   | country | population 
----+---------+---------+------------
  1 | Berlin  | Germany |    3610156
  2 | Hamburg | Germany |    1774242
  3 | Munich  | Germany |    1450381
```

You can specify the fields you want to see in the result and have them appear with a different name that you specify with `AS`.

```sql
SELECT city AS town, population AS citizens FROM cities;

  town   | citizens 
---------+----------
 Berlin  |  3610156
 Hamburg |  1774242
 Munich  |  1450381
```

You can use a `WHERE` clause to get a more specific set of results.

```sql
SELECT * FROM cities WHERE id < 2;

 id |  city  | country | population 
----+--------+---------+------------
  1 | Berlin | Germany |    3610156
```

## Exercise

 Create a table named `actors` and insert into it the following data:

| Name              | Age  | Number of Oscars |
| ----------------- | ---- | ---------------- |
| Leonardo DiCaprio | 41   | 1                |
| Jennifer Lawrence | 25   | 1                |
| Samuel L. Jackson | 67   | 0                |
| Meryl Streep      | 66   | 3                |
| John Cho          | 43   | 0                |

Write queries that answer the following questions:

* Which actors have more than one oscar?

* Which actors are older than 30 years old?
