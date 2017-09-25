# Incremental Search

Incremental search has become standard on sites across the web.

<img src="search.gif">

Let's make an incremental search field that allows users to find one of the countries that exist on earth. A <a href="countries.json"> list of countries</a> has been prepared for you.

* Every time the user types a visible character, if the current value of the input field is at the beginning of the names of any countries in the list, those country names should be displayed (limit it to four countries displayed at a time).

* If the current value of the input is not at the beginning of any of the country names, the string "No results" should be displayed in gray

* If a list of results is displayed and the user clicks outside of it and outside of the input field, the result list should disapper.

* Result lists should reappear when the user gives the input field focus

* If the user mouses over a result in the result list, that result should light up (give it a background color and different text color)

* If a result list is displayed and the user hits an up or down arrow key, the appropriate result should light up

* If the user clicks a result or hits the enter key while a result is lit up, the full country name of the appropriate result should appear in the input field and the result list should disappear!

*Do not use the HTML `<select>` or `<datalist>` tags to solve this challenge!*