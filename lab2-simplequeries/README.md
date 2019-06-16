# AJAX Lab

This lab will let you practice with the JS `fetch` API, which is critical to
create dynamic pages and single-page apps.

## Step 1 - Clone the lab

If you haven't alredy, fork (optional) and clone this repository

## Step 2 - Familiarize yourself with the HTML and CSS

Take a look at the `html` and `css` files in the lab folder, it will make the
rest of the tasks easier.

## Step 3 - Take a look at the live demo

A live demo of the completed lab is [published](
http://boxes.codeu-ajax-labs.appspot.com) to give you a general idea of the
completed solution. You can also find the solutuon code in the file
`script_solution.js`, but try not to look at it unless you are truly stuck.
This is only ONE of the many possible solutions, try to implement your own!

## Step 4 - Write some code

Your task is to react to a button click in one of the boxes by sending a GET or
POST request to our backend, located at:

```
http://boxes.codeu-ajax-labs.appspot.com/send_delayed_response
```

This handler takes both GET and POST requests, with one parameter, `delay`,
which should be set to `1000`, `5000`, `10000` based on which button is pressed.
If you analyze the HTML file you should see that the buttons have each a data
property defining which method should be used, and one defining the requested
delay. Can you find out how to extract that value from the properties of the
element?

After sending the request (for which you should look at the `fetch` function,
after properly building a new `Request` object), the server will wait for
`delay` milliseconds and then send you back a response that contains a JSON
with the following format:

```
{
   'color': <color>,
   'request_type': "get" or "post",
   'delay_msecs': <delay_msecs>,
}
```

Your JS code will receive this response, and start an interval function (check
`setInterval()` in the JS documentation if you are not familiar with it),
switching the background color for the smaller box right above the button that
was clicked (how can you navigate the DOM to find the right box to blink?).

The JSON response will tell you what color to use, and for your convenience the
CSS file defines a class for each color, you will just have to apply the right
class to the right box at the right time.

The response also contains the interval, in milliseconds, at which your box
should blink, which must be the same interval defined in the properties of the
button that was clicked. Similarly, the repsonse also contains a field
describing whether the request was a POST or GET. These two fields are for your
convenience, to validate that your code made the correct request.

Once this first step is done, you should be able to see each box blinking at the
right interval and with the right color.

A stretch challenge: implement a function to stop the blinking once the relative
button is pressed under a specific box.


