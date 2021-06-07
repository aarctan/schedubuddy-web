# schedubuddy-web

The webapp frontend developed for
[schedubuddy](https://github.com/Exanut/schedubuddy)
with
[ReactJS](https://reactjs.org/)
and
[Material-UI](https://next.material-ui.com/).
This implementation receives university schedules tailored to the user and displays them in a familiar format.

### Usage
This webapp was designed to be lightweight and intuitive yet also powerful.
To try it out, simply select an academic term, enter courses from the autocomplete, tune your preferences, and press "Get Schedules".
After a few seconds of searching, the top schedules will be displayed in the order given by the ranking algorithm.
Every schedule will be unique-looking, so that a variety of schedules can be given.

![schedubuddy.com example usage](https://imgur.com/f6uLePd.png)

### Tech
Website built with [ReactJS](https://reactjs.org/) and [Material-UI](https://next.material-ui.com/), and hosted on [Netlify](https://www.netlify.com/).
Web API built with [Flask](https://flask.palletsprojects.com/) and hosted on [Heroku](https://www.heroku.com/).

### Limitations

- All half-blocks are displayed as full blocks.
For this reason, it's impossible for a block to contain two half-block classes.
Half-block classes are typically indicative of classes that occur biweekly.
- For inputs where there are a very large number of possible schedules, not all of them are considered.
For the majority of practical inputs, a sufficient number are still considered and net good results.

### Future Work
- Add additional settings for blocking out times of the day.
- Add additional settings for excluding certain classes.
