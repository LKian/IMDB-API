require('dotenv').config()
const apiKey =  process.env.API_KEY

console.log("API_KEY ", apiKey);

require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static('public'))

const { get } = require('axios')
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('../src/pages/index')
})

app.get('/movie', async (req, res) => {
    const { query: { search } } = req;
    const apiURL = `https://www.omdbapi.com/?t=${search}&apikey=${apiKey}`;

    const {data} = await get(apiURL).catch(e => {
        console.log('Error ', e)
    })

  return res.json(data);
});

const port = 3000;
app.listen(port, () => console.log(`Listen to the wind on port ${port}`));


