<<<<<<< HEAD
# event-reminders
A simply Node.js app that texts me the dates of my friends and families birthdays and other important life events and recurring reminders. 
=======
# Event Reminders App

A simple node.js app to remind me when I have my friends birthdays coming up. 

The app uses Node.js hosted on NGROKs free tier. It connects to the Twilio API and queries a HubDB flat table database using the CMS API against today's date with a cron job. If the days and months match, I get a helpful text that reminds me to text my buddies/family members etc. 

Why not a calendar? I live in my calendar for my professional life but completely ignore it in my personal life. I navigate the world with hardly any notifications except bare essentials, of which SMS is one. I also needed a project and wanted to make something genuinely usful to me. 

## Features
- Checks birthdays stored in HubDB
- Sends reminders by SMS using Twilio

## How it works
Briefly explain the flow, including the role of Node.js and ngrok.

## Requirements
Node.js, 
- HubSpot CMS API. this can be replaced with a DB of our choice.  You can also use a HubSpot sandbox account but it deletes after 90 days. 
- Twilio SMS - needs a pro account because trial accounts only allow predetermined messages. 

## Setup
- Required NPM packages are listed at the top of the event-reminders file or in package.json
- Refer to environment variable names, but never include actual credentials.

## Run locally
- Set-up the required environment variables for authentication
- then run "node event-reminders" in terminal/cmd etc 

## Configuration
Describe required environment variables and where to get their values.

## Deployment
It's just for me, for now.  I'll extend this further in time with some additional features and a website front end. 
>>>>>>> bbb07a7 (README and package reference)
