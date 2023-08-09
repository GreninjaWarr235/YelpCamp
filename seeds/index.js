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

// async function seedImg() {
//     try {
//         const resp = await axios.get('https://api.unsplash.com/photos/random', {
//             params: {
//                 client_id: 'JFeFiZ0rEmpsBqyZfk0PexGr13gHwC1hqgP8vyo6Wr0',
//                 collections: 483251,
//             },
//         })
//         return resp.data.urls.small
//     } catch (err) {
//         console.error(err)
//     }
// }

const seedDB = async () => {
    await Campground.deleteMany({});
    for (var i = 0; i < 300; i++) {
        const locationSeed = Math.floor(Math.random() * 1000);
        const priceSeed = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${selector(descriptors)} ${selector(places)}`,
            location: `${cities[locationSeed].city}, ${cities[locationSeed].state}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[locationSeed].longitude,
                    cities[locationSeed].latitude
                ]
            },
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique adipisci id laboriosam nihil asperiores enim dignissimos odio distinctio a optio atque, est aut, maxime, placeat possimus eaque. Excepturi, deleniti velit. Magnam doloremque quasi quibusdam vitae et facilis quidem labore quisquam quo nesciunt commodi dolor dolorum inventore, blanditiis ea vel consequuntur soluta voluptatibus iste enim sint beatae aspernatur aliquid autem? Reprehenderit.',
            price: priceSeed,
            images: [
                {
                    url: 'https://res.cloudinary.com/da6h9zzm6/image/upload/v1691480870/YelpCamp/vn5dfxekezynqd6n6zg7.jpg',
                    filename: 'YelpCamp/vn5dfxekezynqd6n6zg7'
                },
                {
                    url: 'https://res.cloudinary.com/da6h9zzm6/image/upload/v1691480885/YelpCamp/xw8s6qvtuoowcgakmqnm.jpg',
                    filename: 'YelpCamp/xw8s6qvtuoowcgakmqnm'
                }
            ],
            author: '64d0e8fdb33619ffc7d817f9'
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});