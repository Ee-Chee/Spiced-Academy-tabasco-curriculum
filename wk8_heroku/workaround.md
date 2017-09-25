If you are encountering an error when you run `heroku pg:psql` you can do the following to work around the problem.

1. Go to the Resources tab and click on Heroku Postgres :: Database

    <img src="workaround1.png">

2. A new tab will open up with a page in it that lists your data stores. Click on your Postgres item.

    <img src="workaround2.png">

3. On the next page, scroll down to the Administration section and click the View Credentials button.

    <img src="workaround3.png">

4. Run `psql` with the specified database name and the following additional parameters:

| param| value|
| ---- | ---- |
| -h   | host |
| -U   | user |
| -W   |      |

The -W flag will cause a prompt for your password to appear. Be sure to enter the password provided on the page.

<img src="workaround4.png">

<img src="workaround5.png">

After entering the password, you should be able to create your tables.
