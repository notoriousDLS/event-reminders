# event-reminders

# A simple Node.js app that texts me the dates of my friends' and family's birthdays and other important life events and recurring reminders.

# Event Reminders App

A simple node.js app to remind me when I have my friends' birthdays coming up.

The app uses Node.js hosted began on NGROK's free tier. I later switched to Railway for simpler deployment. It connects to the Twilio API and queries a HubDB flat table database using the CMS API against today's date with a cron job. If the days and months match, I get a helpful text that reminds me to text my buddies/family members etc on birthdays or other important dates for them.

Why not a calendar? I live in my calendar for my professional life but completely ignore it in my personal life opting for a low / no notifications. I navigate the world with hardly any notifications except bare essentials, of which (uncommonly) SMS is one. I also needed a project and wanted to make something genuinely useful to me.

## Features

- Checks birthdays stored in HubDB
- Sends reminders by SMS using Twilio

## How it works

You can download from this repo and run this locally using a HubSpot Developers test account to get the same Database setup. You can also swop it out for something like SQLite, PostGres, MySQL.

Once downloaded, you can run with the

node event_reminders.js

## Requirements

Node.js,

- HubSpot CMS API. This can be replaced with a DB of our choice. You can also use a HubSpot sandbox account but it deletes after 90 days.
- Twilio SMS - needs a pro account because trial accounts only allow predetermined messages.

## Setup

- Required NPM packages are listed at the top of the event-reminders file or in package.json
- Refer to environment variable names, but never include actual credentials.

## Run locally

- Set up the required environment variables for authentication
- then run "node event-reminders" in terminal/cmd etc

## Configuration

Describe required environment variables and where to get their values.

## Deployment

Runs on Railway and deploys straight to:
https://event-reminders-production.up.railway.app
