# Image Board SPA

Imagine a site where anybody could go and post an image of their choosing, along with a title and a textual description of that image, and others could go and look at that image and make thoughtful remarks about it. We have the technology to make this vision a reality.

This will be a single-page application (SPA) built with [Backbone](../wk9_mvc_backbone). 

## Screens

1. **Home**

   When users arrive, they should see a screen with the 6 to 12 most recently uploaded images. These should be shown as 'cards' arranged in a grid on larger screens and a column on smaller screens.

   Each card should show the scaled-down image, the name of the uploader, the title of the image, and as much of the image description as can fit on two lines.

   Pagination may be implemented with a "More" button or with "infinite scroll."

2. **Image**

   When users click on a card on the home screen they should be taken to a screen that shows the image at a size as close to its full size as possible given the width of the browser window (and whatever padding your design requires).

   A form for posting a comment about the image must be present. This form should contain fields for the comment itself and for the name the user would like to appear next to the comment (both fields should be required).

   Comments that have been made about the image should also be displayed in reverse chronological order. Pagination of comments may be implemented with a "More" button or with "infinite scroll".

3. **Upload**

   This screen should display a form with which users can post an image either by selecting a file from the local disk. To post an image, users should be required to provide a title for the image, a description of the image, and their name.

Every screen should have a link to the image upload form as well as a link to the home screen.

## Bonus Feature

1. Add to the image upload form a text field in which users can specify a list of tags for the image separated by commas. Display the image's tags on the image screen and make each of them a link to a screen that shows all of the images that have that tag. You can reuse the layout from the home screen for this display.
2. On the home screen, periodically notify users if additional  images have been uploaded since they arrived and allow them to refresh the display to include those images.
4. On the upload form, allow users to enter the url of an image on the web rather than uploading one from their local disk. When you detect on your server that a user has submitted a url, you should make an http request to liberate the image from its host.
