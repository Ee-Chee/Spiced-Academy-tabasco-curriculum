# Petition - Part 4

Immediately after registration, direct users to a new page that asks them to provide more information about themselves.

<img src="petition8.png" alt="More info">

When the user submits this form, write this data to a new table named `user_profiles`. This table will need columns for id (primary key), user id (foreign key), age, city, and url.

All of the fields in this form are optional.

On the page listing all of the people who have signed the petition, show the additional profile information that is available. In the case of the homepage url, do not show it but rather link the name with the saved url in the `href` attribute.

<img src="petition9.png" alt="Signers">

The city names should also be links. When these links are clicked, users should be directed to a new page that shows only the people who have signed the petition that live in that city.

<img src="petition10.png" alt="Local signers">

Additionally, you should now make the following changes:

1. Change the `signatures` table so that it no longer includes columns for first and last name. When showing the list of people who have signed the petition, get their names by joining the `users` table.

2. Change the query that retrieves information from the `users` table by email address so that it also gets data from the signatures table. Thus you will be able to know whether the user has signed the petition or not as soon as they log in.

**_NOTA BENE_**: Before you put the url a user specifies into the `href` attribute of a link, you must make sure that it begins with either "http://" or "https://". This is not just to ensure that the link goes somewhere outside of your site, althoug that is a benefit. It is also important for security. Since browsers support [Javascript URLs](https://docs.microsoft.com/en-us/previous-versions/aa767736(v%3Dvs.85)), we must make sure that a malicious user can't create a link that runs Javascript code when other users click on it. You can decide whether to check the url when the user inputs it (before you insert it into the database) or when you get it out of the database (before you pass it to your template). If it doesn't start with "http://" or "https://", do not put it in an `href` attribute.
