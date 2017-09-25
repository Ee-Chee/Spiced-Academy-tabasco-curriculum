# Image Board Admin

Since anybody can post anything to your [Image Board](wk9_image_board), it is probably a good idea to create an admin interface that allows you to delete or edit posts that violate your site's rules or the laws of the land.

You should make your admin interface using [Angular](wk10_angular). The whole UI should exist in the `/admin/index.html` file you made for the [Basic Auth](wk10_basic_auth) exercise. The page should display the images that have been posted in reverse chronological order with pagination. You can probably reuse the route that provides the data to the home screen for this purpose. However, several new routes will be required to support admin functionality. 

We want administrators to be able to delete offending images and to edit titles and descriptions of images if they want. Thus you will need a route for updating the title and/or description of an image with a given id, and a route for deleting an image with a given id. To support updating and deleting images, the title and description of each image should appear in editable fields and buttons for triggering updates and deletions should also be present.

The routes for updating and deleting should not work if they are accessed by people who are unauthorized. Like the page itself, they must require basic authentication.

One nice thing about admin interfaces is that they do not have to look as polished since they are only seen by a small number of friendly people. They just need to be functional. Feel free to take advantage of this if you are pressed for time. 