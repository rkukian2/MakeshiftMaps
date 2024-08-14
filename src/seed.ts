import City from "./City";
import db from "./db";

db.once('open', async ()=> {
    await City.deleteMany();
    
    const cities = [
        {
          name: 'paris',
          neighbors: [
            { name: 'rome', distance: 10 },
            { name: 'london', distance: 20 },
            { name: 'miami', distance: 30 },
          ],
        },
        {
          name: 'rome',
          neighbors: [
            { name: 'paris', distance: 10 },
            { name: 'madrid', distance: 15 },
            { name: 'tokyo', distance: 25 },
          ],
        },
        {
          name: 'london',
          neighbors: [
            { name: 'paris', distance: 20 },
            { name: 'miami', distance: 10 },
            { name: 'sydney', distance: 40 },
          ],
        },
        {
          name: 'miami',
          neighbors: [
            { name: 'paris', distance: 30 },
            { name: 'london', distance: 10 },
            { name: 'quito', distance: 35 },
          ],
        },
        {
          name: 'madrid',
          neighbors: [
            { name: 'rome', distance: 15 },
            { name: 'istanbul', distance: 12 },
            { name: 'dubai', distance: 22 },
          ],
        },
        {
          name: 'tokyo',
          neighbors: [
            { name: 'rome', distance: 25 },
            { name: 'dubai', distance: 18 },
          ],
        },
        {
          name: 'sydney',
          neighbors: [
            { name: 'london', distance: 40 },
            { name: 'jerusalem', distance: 28 },
          ],
        },
        {
          name: 'quito',
          neighbors: [
            { name: 'miami', distance: 35 },
            { name: 'toronto', distance: 45 },
          ],
        },
        {
          name: 'istanbul',
          neighbors: [
            { name: 'madrid', distance: 12 },
            { name: 'jerusalem', distance: 20 },
    
          ],
        },
        {
          name: 'dubai',
          neighbors: [
            { name: 'madrid', distance: 22 },
            { name: 'tokyo', distance: 18 },
            { name: 'toronto', distance: 30 },
          ],
        },
        {
          name: 'jerusalem',
          neighbors: [
            { name: 'sydney', distance: 28 },
            { name: 'istanbul', distance: 20 },
          ],
        },
        {
          name: 'toronto',
          neighbors: [
            { name: 'quito', distance: 45 },
            { name: 'dubai', distance: 30 },
          ],
        },
    
      ];

    await City.insertMany(cities);
    console.log('Example data inserted');
    process.exit();
})

