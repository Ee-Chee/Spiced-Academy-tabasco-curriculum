# Image Board - Bonus Features

Here is a list of features that it would be great to incorporate into your project if you have the time.

1. Add "Previous" and "Next" buttons to the image modal. To do this, you should modify the data retrieved by the ajax request your component makes so that it includes, in addition to all of the data for the current image, the id of the previous image and the id of the next image. You can add these two ids fairly easily by modifying your query to use [subqueries](https://www.sohamkamani.com/blog/2016/07/07/a-beginners-guide-to-sql/#c-6) to find them.

2. Add to the image upload form a text field in which users can specify a list of tags for the image separated by commas. Display the image's tags in the image modal and make each of them a link to a screen that shows all of the images that have that tag.

3. On the home screen, periodically notify users if additional images have been uploaded since they arrived and allow them to refresh the display to include those images.

4. On the upload form, allow users to enter the url of an image on the web rather than uploading one from their local disk. When you detect on your server that a user has submitted a url, you should make an http request to liberate the image from its host.

5. Allow users to reply to comments.

6. Allow users to delete images. Since there are no user accounts, you would have to make it so any user can delete any image no matter who uploaded it. Presumably only high quality images that nobody wants to delete would survive this free for all!
