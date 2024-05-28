# Schedubuddy

[Schedubuddy](https://schedubuddy.com/) is a web application that generates university schedules and displays them in a familiar format. This repository contains the front-end code for the application. For the back-end, please refer to this [repository](https://github.com/Exanut/schedubuddy-server).

## Table of Contents

- [Usage](#usage)
- [Features](#features)
  - [Schedule Generator](#schedule-generator)
  - [Advanced Filter](#advanced-filter)
  - [Share](#share)
  - [Room Occupancy Lookup](#room-occupancy-lookup)
  - [Free Room Finder](#free-room-finder)
- [Installation](#installation)
- [Contributing](#contributing)

## Usage

Schedubuddy is designed to be lightweight, intuitive, and powerful. To use it:

1. Select an academic term.
2. Enter courses from the autocomplete.
3. Tune your preferences.
4. Click "Get Schedules".

After computing, the top schedules will be displayed in the order given by the ranking algorithm. Other features include viewing all the classes that occur in a given lecture room, and viewing the rooms that are open at a given time of day.

![schedubuddy.com example usage](https://i.imgur.com/DHEnPTr.png)

## Features

### Schedule Generator

Given a list of courses, find all possible schedules.

![Simple Schedule](https://github.com/aarctan/schedubuddy-web/assets/60676925/3d2c190b-9329-4a34-9ee4-c9c05c06127e)

### Advanced Filter

Apply advanced filtering to your schedule search.

![Advanced Filter](https://github.com/aarctan/schedubuddy-web/assets/60676925/ca095b5c-3679-4c04-a502-fedd64c96fdd)

### Share

Share your schedule with a link.

![Share](https://github.com/aarctan/schedubuddy-web/assets/60676925/d19d26a6-faa1-46b2-ae8e-a5b226678dfc)

### Room Occupancy Lookup

Get the schedule for a room.

![Room Schedule](https://github.com/aarctan/schedubuddy-web/assets/60676925/8c6c2927-80ad-4d0e-b198-726abb27f7a7)

### Free Room Finder

Find an empty room to study in.

![Free Room Finder](https://github.com/aarctan/schedubuddy-web/assets/60676925/d7944d83-a59c-48ad-8c07-23b1d6fc6575)

## Installation

To set up the project for development, you will need Node.js and npm installed on your system. Then, clone the repo, install dependencies, and start the server:

```bash
git clone https://github.com/Exanut/schedubuddy-web.git
cd schedubuddy-web
npm install
npm start
```

## Contributing

As an open source project, we welcome feedback from users or developers in the form of comments or proposals for new features or changes.
