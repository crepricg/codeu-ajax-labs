
# DOM Manipulation lab

This lab will let you practice several key JS strategies to manipulate DOM
elements in your page. 

## Step 1 - Clone the lab

If you haven't alredy, fork (optional) and clone this repository

## Step 2 - Familiarize yourself with the DOM

The DOM (Document Object Model) is the representation of the HTML structure as
a tree in which elements containing other elements have a parent-child
relationship. For example (a `<ul>` list is parent to all its `<li>` elements).

Take a look at the HTML in `dom_manipulation.html` and try to draw the DOM as a
tree. You will find this useful for implementing the next steps.

## Step 3 - Take a look at the live demo

A live demo of what the completed code should do is [published]
(http://lab1-dot-codeu-ajax-labs.appspot.com/) to give you a general idea of
how you should structure your implementation.

You can also find the solution code in the repository, in the file
`dom_manipulation_solution.js`, but try not to look at it unless you are truly
stuck. This is only ONE of the many possible solutions, try to implement your
own!

## Step 4 - Write some code

There are a number of functionalities to work on. Open `dom_manipulation.js`,
you will see three empty-body functions. You will implement them, and any other
auxiliary function you might need.

Keep in mind that all the changes your JS file will only modified the page in
your browser, if you reload the page you will revert to the original content.

You can test your code by opening the `dom_manipulation.html` file in your
browser as a local file.

Let's start from the simplest task:

### Clear The List

When a user clicks on the "Clear List!" button, all songs in the list should be
removed from the webpage and the list should be empty.

You may find the method `document.querySelector()` and the property `innerHTML`
useful. 

### Add New Song

When the user enters a new song's info in the fields at the bottom of the page,
your code should take that info and create a new entry, at the bottom of the
list. 

You may find the methods `document.createElement()` and `.appendChild()` useful.

### Sort list

This is the most challenging part, when the user clicks on the "Go!" button,
your code must sort the songs based on the user's selection. The user decides
based on what property you should sort, and whether you shoult sort in ascending
or descending order.

Try to keep your code simple and avoid redundancy.
