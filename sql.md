Learning SQL Notes

Basics:

```
SHOW TABLES;
CREATE TABLE table(column_defs);
DESC table;
INSERT INTO table (cols) VALUES (values);
SELECT * FROM table;
SELECT a, b, c FROM table;
SELECT a, b, c FROM table WHERE clause;
UPDATE table SET k = v, k2 = v2 WHERE clause;
DELETE FROM table WHERE clause;
DROP TABLE table;
```


---

```
$ mysql -uroot -p
> grant all privileges on *.* to 'valbaca'@'localhost' identified by 'pass';
$ mysql -uvalbaca -p
> create database bank;
> use bank;
> source /Users/valbaca/sql/LearningSQLExample.sql

> select now(); // gives the time
> select now from dual; // for Oracle DBs

> CREATE TABLE person
  (person_id SMALLINT UNSIGNED,
   fname VARCHAR(20),
   lname VARCHAR(20),
   gender ENUM('M','F'),
   birth_date DATE,
   address VARCHAR(30),
   city VARCHAR(20),
   state VARCHAR(20),
   country VARCHAR(20),
   postal_code VARCHAR(20),
   CONSTRAINT pk_person PRIMARY KEY (person_id)
);

> DESC person;
+-------------+----------------------+------+-----+---------+-------+
| Field       | Type                 | Null | Key | Default | Extra |
+-------------+----------------------+------+-----+---------+-------+
| person_id   | smallint(5) unsigned | NO   | PRI | NULL    |       |
| fname       | varchar(20)          | YES  |     | NULL    |       |
| lname       | varchar(20)          | YES  |     | NULL    |       |
| gender      | enum('M','F')        | YES  |     | NULL    |       |
| birth_date  | date                 | YES  |     | NULL    |       |
| address     | varchar(30)          | YES  |     | NULL    |       |
| city        | varchar(20)          | YES  |     | NULL    |       |
| state       | varchar(20)          | YES  |     | NULL    |       |
| country     | varchar(20)          | YES  |     | NULL    |       |
| postal_code | varchar(20)          | YES  |     | NULL    |       |
+-------------+----------------------+------+-----+---------+-------+
10 rows in set (0.01 sec)

mysql> ALTER TABLE person MODIFY person_id SMALLINT UNSIGNED AUTO_INCREMENT;
ERROR 1833 (HY000): Cannot change column 'person_id': used in a foreign key constraint 'fk_person_id' of table 'bank.favorite_food'
mysql> set foreign_key_checks=0;
Query OK, 0 rows affected (0.00 sec)

mysql> ALTER TABLE person MODIFY person_id SMALLINT UNSIGNED AUTO_INCREMENT;
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> set foreign_key_checks=1;
Query OK, 0 rows affected (0.00 sec)

mysql> INSERT INTO person
    -> (person_id, fname, lname, gender, birth_date)
    -> VALUES (null, 'Val', 'Baca', 'M', '1988-07-17');
Query OK, 1 row affected (0.01 sec)


mysql> select * from person;
+-----------+-------+-------+--------+------------+---------+------+-------+---------+-------------+
| person_id | fname | lname | gender | birth_date | address | city | state | country | postal_code |
+-----------+-------+-------+--------+------------+---------+------+-------+---------+-------------+
|         1 | Val   | Baca  | M      | 1988-07-17 | NULL    | NULL | NULL  | NULL    | NULL        |
+-----------+-------+-------+--------+------------+---------+------+-------+---------+-------------+
1 row in set (0.00 sec)


mysql> select fname, lname from person;
+-------+-------+
| fname | lname |
+-------+-------+
| Val   | Baca  |
+-------+-------+
1 row in set (0.00 sec)


mysql> select fname, lname from person where person_id = 1;
+-------+-------+
| fname | lname |
+-------+-------+
| Val   | Baca  |
+-------+-------+
1 row in set (0.00 sec)

/* spaces around equals don't matter */
mysql> select fname, lname from person where person_id=1;
+-------+-------+
| fname | lname |
+-------+-------+
| Val   | Baca  |
+-------+-------+
1 row in set (0.00 sec)


mysql> select fname from person where lname='Baca';
+-------+
| fname |
+-------+
| Val   |
+-------+
1 row in set (0.00 sec)


mysql> INSERT INTO favorite_food (person_id, food)
    -> VALUES (1, 'gyros');
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO favorite_food (person_id, food) VALUES (1, 'burritos');
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO favorite_food (person_id, food) VALUES (1, 'sunflower seeds');
Query OK, 1 row affected (0.00 sec)


mysql> UPDATE person
    -> SET address = '123 Fake St.',
    -> city = 'Seattle',
    -> state = 'WA',
    -> country = 'USA',
    -> postal_code = '12345'
    -> WHERE person_id = 1;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> select * from person;
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
| person_id | fname | lname | gender | birth_date | address      | city    | state | country | postal_code |
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
|         1 | Val   | Baca  | M      | 1988-07-17 | 123 Fake St. | Seattle | WA    | USA     | 12345       |
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
1 row in set (0.00 sec)


mysql> UPDATE person
    -> SET address = '123 Fake St.',
    -> city = 'Seattle',
    -> state = 'WA',
    -> country = 'USA',
    -> postal_code = '12345'
    -> WHERE person_id = 1;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> select * from person;
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
| person_id | fname | lname | gender | birth_date | address      | city    | state | country | postal_code |
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
|         1 | Val   | Baca  | M      | 1988-07-17 | 123 Fake St. | Seattle | WA    | USA     | 12345       |
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
1 row in set (0.00 sec)

mysql> INSERT into person (person_id, fname, lname, gender, birth_date)
    -> VALUES (null, 'Bruce', 'Wayne', 'M', '1970-01-02');
Query OK, 1 row affected (0.00 sec)

mysql> select * from person;
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
| person_id | fname | lname | gender | birth_date | address      | city    | state | country | postal_code |
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
|         1 | Val   | Baca  | M      | 1988-07-17 | 123 Fake St. | Seattle | WA    | USA     | 12345       |
|         2 | Bruce | Wayne | M      | 1970-01-02 | NULL         | NULL    | NULL  | NULL    | NULL        |
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
2 rows in set (0.00 sec)

mysql> DELETE from person where person_id=2;
Query OK, 1 row affected (0.00 sec)

mysql> select * from person;
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
| person_id | fname | lname | gender | birth_date | address      | city    | state | country | postal_code |
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
|         1 | Val   | Baca  | M      | 1988-07-17 | 123 Fake St. | Seattle | WA    | USA     | 12345       |
+-----------+-------+-------+--------+------------+--------------+---------+-------+---------+-------------+
1 row in set (0.00 sec)


mysql> show tables;
+----------------+
| Tables_in_bank |
+----------------+
| account        |
| branch         |
| business       |
| customer       |
| department     |
| employee       |
| favorite_food  |
| individual     |
| officer        |
| person         |
| product        |
| product_type   |
| transaction    |
+----------------+
13 rows in set (0.00 sec)
```