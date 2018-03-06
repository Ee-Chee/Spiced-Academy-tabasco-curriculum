# Image Board - Part 4

A problem our image board has is that it is not possible for our users to share links that go directly to an individual image. There is only one url for the entire site and every time you go to it you will see all of the most recently uploaded images. There is no way to go directly to a view showing a single larger-sized image with its comments in a modal.

There is a solution to this: client-side routing. The basic idea is to have your client-side Javascript read and interpret the url of the page and alter the page in accordance with it.

It is convenient to use hashes (url fragments) for this. Hashes are not sent to the server. That is, the server does the exact same thing for requests to `http://localhost:8080/#funkychicken` as it does for requests to `http://localhost:8080/`. However, the hash is readable in the browser by means of the `location.hash` property and it is possible to know when the hash changes by listening for the `hashchange` event on the `window` object. Although hash changes do not cause requests to be made to the server, they do generate entries in the browser history, which means that the back button works with hashes.

There is a newer technique for doing client-side routing that does not use hashes. We'll look at this newer technique in a future project.

### Adding Routing to Your Image Board

Currently, you must have a property of your `Vue` instance that indicates whether or not the modal should be visible. Most likely, this is the id of the image to show. Since this is a reactive property, it must be initialized in the `data` property with a placeholder value. To make the page show the image modal when it starts up, you can read the `location.hash` and see if it contains an image id. If it does, you an pass that as the initial value for the property in the `data` object. That should make the modal appear immediately.

If you are currently passing more than just the image's id in the `props` for your component, you will have a small problem. You won't have any of the data for the image you want to show at the time you want to show it since the ajax request to get all of the most recently uploaded images has not completed yet. You should alter your component so that it expects only an image id and, when it mounts, does an ajax request to get all other information about the image.

Users will be able to type anything they want in a hash so you should probably handle the possibility that what is in the hash is not a valid image id. A simple way to do this is to have your component fire the event to close the modal if the ajax request to get the image data is not successful. When the modal is closed the value of `location.hash` should be an empty string.

Currently, you have a click handler on your most recently uploaded images that causes the modal to open. This should be changed. Instead of a click handler, there should be a simple link whose href consists a hash plus the id of the image. To know when a user clicks on one of these links, you should listen for the `hashchange` event on the `window` object. When a hash change occurs, you should call a method on your `Vue` instance that handles it.

If a hash change occurs while the modal is open, the prop containing the image id will change, but nothing else will happen automatically. Because you are fetching the image data when the component mounts, you won't automatically fetch the data for the new image because the component is already mounted. To make sure you get the new image data when the image id changes, you can use [watchers](https://vuejs.org/v2/guide/computed.html#Watchers) - functions that run any time a property changes.
