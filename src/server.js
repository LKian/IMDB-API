require('dotenv').config();
const apiKey = process.env.API_KEY
console.log("apiKey ", apiKey);

const express = require('express');
const app = express();

app.use(express.static('public'))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const { get } = require('axios');

app.get('/', (req, res) => {
    res.render('../src/pages/index')
})

app.get('/public', (req, res) => {
    res.render('../public')
})

app.get('/movie', async (req, res) => {
    const { query: { search } } = req;
    const apiURL = `https://www.omdbapi.com/?t=${search}&apikey=${apiKey}`;
    console.log("apiURL ", apiURL);
    const { data } = await get(apiURL).catch(e => {
        console.log("Error", e)
    })
    return res.json(data);
});

const port = 3000;
app.listen(port, () => console.log(`Listen to the wind on port ${port}`));


