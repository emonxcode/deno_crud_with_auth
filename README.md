## Installation
To run the app: <br>
`deno run --allow-read --allow-env --allow-net server.ts`


## Database
> MySQL@5.7 

Table schema:
```sql
DROP TABLE IF EXISTS `todos`;
CREATE TABLE IF NOT EXISTS `todos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo` text NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

## Environment
```env
DATABASE_HOST=localhost
DATABASE_NAME=
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_PORT=3306
DATABASE_NAME=
```

