# Foreign Keys

Consider the following two tables, one containing singers and one containing songs:

```sql
id |    name     | singer_id
----+-------------+-----------
 1 | Anaconda    |         1
 2 | Paparazzi   |         2
 3 | Bad Romance |         2
 4 | Sex Bomb    |         4

 id |     name     
----+--------------
  1 | Nicki Minaj
  2 | Lady Gaga
  3 | Taylor Swift
  4 | Tom Jones
```

In both tables the `id` column uniquely identifies the rows and serves as the primary key. However, the `songs` table also has a column `singer_id` that contains the `id` of a row from the `singers` table. The `singer_id` is what we call a _foreign key_. It indicates a relation between the data in the two different rows in two different tables.

# Joins

To query data that exists in different tables you _join_ the tables together and conduct the query on the combined table.

```sql
SELECT singers.name AS singer_name, songs.name AS song_name
FROM singers
JOIN songs
ON singers.id = songs.singer_id;

singer_name |  song_name  
-------------+-------------
Nicki Minaj | Anaconda
Lady Gaga   | Bad Romance
Lady Gaga   | Paparazzi
Tom Jones   | Sex Bomb
```

There are several different kinds of join that you can do. An excellent visual explanation of different joins can be found at <a href="https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/">Coding Horror</a>. The example above is an _inner join_. It excludes rows from both tables that do not match. An _outer join_ includes rows from one or both of the tables that do not match with `null` values in columns for which there is no data.

## Exercises

You can now do <a href="../wk7_petition4">part 4 of your petition project</a>.
