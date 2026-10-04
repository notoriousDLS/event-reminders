/*
---->  Important life events app
*/

// Dependencies

// Service key for HubSpot API access
const token = process.env.SERVICE_KEY;

// environment variables file support
const dotenv = require('dotenv').config();

// Headers for the fetch request to HubSpot API
const options = {
    method: 'GET',
    headers: {
        Authorization: 'Bearer ' + process.env.SERVICE_KEY,
        'X-HubSpot-Portal-Id': process.env.PORTAL_ID,
        'Content-Type': 'application/json'
    }
};


// Database connection string for HubDB
const db = process.env.DB_CONNECTION;

// // NGROK_AUTH_TOKEN
// const ngrok = process.env.NGROK_AUTH_TOKEN;

// Express server setup
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// NunJucks template engine config
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    express: app,
    autoescape: true,
    noCache: true
});
app.set('view engine', 'njk');
app.set('views', 'views');

// Twilio client setup
const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Cron for daily call to functions
const cron = require('node-cron')

// FUNCTIONS 
// - get the DB list of birthdays
// - check the date against the current date (month and day)
// - send a text from Twilio with the reminder to text.

// Fetch the data from DB
async function getBirthdays() {
    const response = await fetch(db, options);

    if (!response.ok) {
        throw new Error(`HubSpot responded ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
}

// Reminder Function with Twilio API
async function createMessage(name) {
    const message = await client.messages.create({
        body: `Today is ${name}'s birthday! 🎉 \n\n Don't forget to text them`,
        from: process.env.FROM_TWILIO,
        to: process.env.RECD_TWILIO
    });

    console.log(message.body);
    return message;
}


// TEST Variables - 

let current_date = 4;
let current_month = 10;

// let current_date = new Date().getDate();
// let current_month = new Date().getMonth();

async function checkAndSend() {
    try {
        const allEvents = await getBirthdays();

        const todaysBirthdays = allEvents.filter(event =>
            event.values['event_day'] == current_date &&
            event.values['event_month'] == current_month
        );

        if (todaysBirthdays.length === 0) {
            console.log('No birthdays today.');
            return;
        }

        for (const event of todaysBirthdays) {
            const name = event.values['name'];
            await createMessage(name);
        }
    } catch (err) {
        console.error('Error:', err);
    }

}

checkAndSend();


// URL Routes
app.get('/', async (req, res, next) => {
    try {
        const birthdays = await getBirthdays();
        res.render('index.njk', { birthdays });
    } catch (err) {
        next(err);
    }
});

// Error handler global
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server error: ' + err.message);
});

// Run at 08:00 every day
cron.schedule('0 8 * * *', () => {
    checkAndSend()
})

// Start Server
app.listen(port, () => {
    // console.log(`Running on http://localhost:${port}`);
});