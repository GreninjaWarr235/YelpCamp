const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const axios = require('axios');
const { descriptors, places } = require('./seedhelpers');

mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected!");
});

const selector = array => array[Math.floor(Math.random() * array.length)];

async function seedImg() {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: 'JFeFiZ0rEmpsBqyZfk0PexGr13gHwC1hqgP8vyo6Wr0',
                collections: 483251,
            },
        })
        return resp.data.urls.small
    } catch (err) {
        console.error(err)
    }
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (var i = 0; i < 20; i++) {
        const locationSeed = Math.floor(Math.random() * 1000);
        const priceSeed = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${selector(descriptors)} ${selector(places)}`,
            location: `${cities[locationSeed].city}, ${cities[locationSeed].state}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores culpa iusto incidunt porro dolorem necessitatibus sit animi iste voluptatum, ea saepe deleniti numquam? Iusto ullam error sed beatae non mollitia.',
            price: priceSeed,
            imageURL: await seedImg(),
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});