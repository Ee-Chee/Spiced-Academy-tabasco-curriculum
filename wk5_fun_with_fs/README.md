# Fun with `fs`

* Create a new directory named "fun-with-fs" and add to it a js file named "index.js."

* Download <a href="files.zip">files.zip</a>, unzip it, and place the unzipped directory into into the directory created previously,

* In index.js, require the [`fs`](https://nodejs.org/api/fs.html) module. You will be using its [`readdir`](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback) and [`stat`](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback) methods in Part 1 and its [`readdirSync`](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options), [`statSync`](https://nodejs.org/api/fs.html#fs_fs_statsync_path_options) and [`wrtieFileSync`](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options) methods in Part 2.

## Part 1
* Write a function named `logSizes` that expects to be passed the full path to a directory. It should use `fs.readdir` with the `withFileTypes` option set to `true` in order to read the contents of the directory. Once the contents are known, it should loop through them and do the following:

    * For every file it should call `fs.stat` to determine the file's size. Once the size is known, it should log the path to the file followed by a colon and the size of the file.

    * For every directory, it should call itself and pass the path to the directory so that the sizes of all the files contained in the directory will be logged.

* Call `logSizes` and pass to it the full path to the files directory. The output should end up looking like this:
    ```
    /Users/funkychicken/fun-with-fs/files/README.md: 12
    /Users/funkychicken/fun-with-fs/files/part2/index.html: 160
    /Users/funkychicken/fun-with-fs/files/part2/script.js: 1998
    /Users/funkychicken/fun-with-fs/files/part1/a/index.html: 241
    /Users/funkychicken/fun-with-fs/files/part1/a/stylesheet.css: 40
    /Users/funkychicken/fun-with-fs/files/part1/b/index.html: 243
    /Users/funkychicken/fun-with-fs/files/part1/b/stylesheet.css: 39
    /Users/funkychicken/fun-with-fs/files/part1/a/images/cats.png: 573350
    /Users/funkychicken/fun-with-fs/files/part1/a/images/kitty1_150x150.jpg: 9279
    /Users/funkychicken/fun-with-fs/files/part1/a/images/kitty2_150x150.jpg: 14355
    /Users/funkychicken/fun-with-fs/files/part1/a/images/kitty3_150x150.jpg: 13387
    /Users/funkychicken/fun-with-fs/files/part1/b/images/boxes.png: 156804
    ```

* If any of the callbacks you pass to `readdir` or `stat` get passed an error, log the error to the console.

## Part 2

* Write a function named `mapSizes` that expects to be passed the full path to a directory. It should use `fs.readdirSync` with the `withFileTypes` option set to `true` in order to read the contents of the directory. Once the contents are known, it should create an object and add to it a property for each of the items found.
    * If the item is a file, the name of the property should be the item's name and the value of the property should be the item's size. To get the size you will have to call `statSync` and pass to it the full path to the file.

    * If the item is a directory, the name of the property should be the item's name and the value should be the object you get by calling `mapSizes` again and passing it the full path to the directory.

    After adding a property for each file and directory, `mapSizes` should return the object it created.

* Call `mapSizes` and pass to it the full path to the files directory. Use [`JSON.stringify`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) to convert the object it returns to a string and then use `fs.writeFileSync` to write that string to a file named "files.json". The contents of the resulting file should look like this (assuming that you pass `4` as the third parameter to `JSON.stringify`):

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

How would you complete Part 2 using `readdir` and `stat` (the asynchronous versions)? There is no need to write the code, just think through what the challenge would be.
