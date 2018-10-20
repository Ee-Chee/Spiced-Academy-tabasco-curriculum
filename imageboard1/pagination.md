# Image Board - Part 1 Revisited
## Pagination

When you first did [Part 1](README.md) you wrote a query for getting images that probably looked something like this:

```SQL
SELECT * FROM images
ORDER BY id DESC;
```

This was adequate at that time because we only had three images and no way to add more. That is no longer the case. Users can upload images all they want and we can expect that they will do so at a prodigious rate. Consequently, we will have tons of images in our database, far more than we can reasonably fetch at one time. That makes it necessary to add a limit to our query.

```SQL
SELECT * FROM images
ORDER BY id DESC
LIMIT 10;
```

You have some flexibility as to the limit you choose. You probably do not want the number to be bigger than twenty or so, but you can decide upon the exact number based on various other considerations. For example, if your design shows three images per row, you will probably want the limit to be a multiple of three.

Once we introduce a limit, another problem emerges. We need to provide users a way to navigate to the images that are not currently on the screen. The easiest way to solve this is to add a "More" button beneath the images you are displaying, as we did on the first part of the [Spotify](../wk3_spotify_search) project. When users click this button, you will make an ajax request to retrieve the next chunk of images. Once you receive them, you will add them to the array of images you already have and they will pop in underneath the ones already onscreen.

For this to work, you will have to include in your ajax request information that your server code can use to figure out which chunk of images to retrieve. One way to do this is to use the number of images you already have in your query as the `OFFSET`. However, images are constantly being added so we must also include information about where to start. For this you can use the `id` property of the first image in your list.

```js
exports.getMoreImages = (startId, offset) => db.query(
        `SELECT * FROM images
        WHERE id < $1
        ORDER BY id DESC
        LIMIT 10
        OFFSET = $2`,
        [startId, offset]
    ).then(
        ({rows}) => rows
    );
};
```

However, there is a flaw with this approach. If images that are already displayed get deleted, there is a risk that the next batch will contain duplicates of images the user has already seen. We do not currently support image deletion, but it is likely that we would want to in the future so this is a problem that is worth solving. A simple solution would be to use the `id` property of the _last_ image on the screen to determine where to start the next chunk.

```js
exports.getMoreImages = lastId => db.query(
        `SELECT * FROM images
        WHERE id < $1
        ORDER BY id DESC
        LIMIT 10`,
        [lastId]
    ).then(
        ({rows}) => rows
    );
};
```
One issue remains. Your extremely engaged and dedicated users will likely click the "More" button repeatedly. If they keep doing this, sooner or later they will reach the end of the list and there will be no more images to show them. What should you do in this situation?

A surprisingly popular solution, or non-solution, to this problem is to allow the user to click the "More" button when there are no more results and remove the button from the screen after making the ajax request that returns an empty list of results. This is a disappointing experience for users but many developers seem to view it as acceptable.

Clearly, it would be better not to show the "More" button at all if there are no more images to show. To determine if there are no more images to show, you could compare the `id` of the last image in your list to that of the first image in your database (it's the first image in the database that is the last one you show, so that's the one to compare). If they match, you've  reached the end and should suppress the "More" button.

If you never allow images to be deleted, then you know the id of the last image you have to show is 1. But to support adding image deletion in the future, it would be better to get the id of the first image using a query rather than hardcoding it.

```SQL
SELECT id FROM images
ORDER BY id ASC
LIMIT 1;
```

You could do this query every time you get images to show or incorporate it as a subquery in your existing queries.
