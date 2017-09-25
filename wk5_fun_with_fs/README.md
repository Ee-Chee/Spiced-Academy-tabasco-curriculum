# Fun with `fs`

* Create a new directory named "fun-with-fs" and add to it a js file named "index.js"

* Download <a href="files.zip">files.zip</a>, unzip it, and place the unzipped directory into the directory created previously

* In index.js, require the <a href="https://nodejs.org/api/fs.html">`fs`</a> module and use its <a href="https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback">`readdir`</a> method to get a list of items contained in the files directory and log it to the console. Then use the <a href="https://nodejs.org/api/fs.html#fs_fs_stat_path_callback">`stat`</a> method on each item to determine if it is a directory (you can do this by using the `isDirectory` method of the <a href="https://nodejs.org/api/fs.html#fs_class_fs_stats">`Stats`</a> instance passed to the callback you pass to `stat`). Log the contents of each directory recursively so that when you run index.js you see something like the following:

    ```
  /Users/discoduck/fun-with-fs/files contains README.md, part1, part2
  /Users/discoduck/fun-with-fs/files/part1 contains a, b
  /Users/discoduck/fun-with-fs/files/part2 contains index.html, script.js
  /Users/discoduck/fun-with-fs/files/part1/a contains images, index.html, stylesheet.css
  /Users/discoduck/fun-with-fs/files/part1/b contains images, index.html, stylesheet.css
  /Users/discoduck/fun-with-fs/files/part1/a/images contains cats.png, kitty1_150x150.jpg, kitty2_150x150.jpg, kitty3_150x150.jpg
  /Users/discoduck/fun-with-fs/files/part1/b/images contains boxes.png
    ```

* If any of the callbacks you pass to `readdir` or `stat` get passed an error, log the error to the console and call `process.exit`.

## Part 2

* Add a file to the directory named "part2.js"

* In part2.js, write a function that uses <a href="https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options">`readdirSync`</a> and <a href="https://nodejs.org/api/fs.html#fs_fs_statsync_path">`statSync`</a> to add properties to an object for each item contained in the files directory and its subdirectories. If the item is a file, a property should be added whose name is that of the file and whose value is the size of the file (you can get the size by accessing the `size` property of the `Stats` object returned by `stat`). If the item is a directory, the property's name should be the directory's name and its value should be an object that has properties for each file and subdirectory the directory contains.

* After you've built up this object, convert it to a JSON string and use <a href="https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback">`writeFile`</a> to write it to a file named "files.json". The contents of the resulting file should look like this (assuming that you pass `4` as the third parameter to <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify">`JSON.stringify`</a>):

  ```JSON
    {
        "README.md": 12,
        "part1": {
            "a": {
                "images": {
                    "cats.png": 573350,
                    "kitty1_150x150.jpg": 9279,
                    "kitty2_150x150.jpg": 14355,
                    "kitty3_150x150.jpg": 13387
                },
                "index.html": 241,
                "stylesheet.css": 40
            },
            "b": {
                "images": {
                    "boxes.png": 156804
                },
                "index.html": 243,
                "stylesheet.css": 39
            }
        },
        "part2": {
            "index.html": 160,
            "script.js": 1998
        }
    }
  ```

## Part 3

How would you complete Part 2 using `readdir` and `stat` (the asynchronous versions)?
