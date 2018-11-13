# Petition - Part 5

## Profile Editing
Let's allow users to edit all of the information they have provided about themselves.

<img src="petition11.png" alt="Edit profile">

When this form is submitted, you will have to do two queries: one thats affects the users table and another that affects the user_profiles table. For the users table, it is clear that the command the query should use is `UPDATE` since the user definitely has a row in the users table. You will have to determine whether the query should update the password column or not. If the user did not submit a new password, the query should not update the password.

In the case of the user_profiles table, it is unclear whether we need to do an `UPDATE` or an `INSERT`. What we want to do is an "upsert" - we want to insert a row if one does not already exist and update it if it does. Postgres has syntax that accomplishes this:

```SQL
INSERT INTO actors (name, age, oscars)
VALUES ('Penélope Cruz', 43, 1)
ON CONFLICT (name)
DO UPDATE SET age = 43, oscars = 1;
```

In this example, if no row exists with the name 'Penélepe Cruz', one will be created. If one does exist, the existing row will have its age and oscars column updated. For this to work, the name column must have a unique constraint on it.

## Unsigning

Let's also make it possible for users to unsign the petition.

<img src="petition12.png" alt="unsign">

Since the request to delete the signature will cause a permanent change, it should be made using the `POST` method. That means the UI for making the request cannot be a link - it must be a form. However, you can use CSS to make the submit button look like a link, as in the example above.

After unsigning, logged in users should be redirected to the page on which they can sign the petition.

**Bonus**: Allow users to delete their entire account.
