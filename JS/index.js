const express = require('express');
const quotes = require('./quotes'); 
const bodyParser = require ('body-parser')

const app = express();
const PORT = 3000;


app.use(bodyParser.json());

app.get('/quotes', (req, res) => {
    res.json(quotes);
});

app.post('/quotes/add', (req, res) => {
    const newQuote = req.body;
    
    quotes.push(newQuote);
    res.json({ message: 'Quote added successfully', quote: newQuote });
});

app.delete('/quotes/delete/:id', (req, res) => {
    const quoteId = parseInt(req.params.id);
    const index = quotes.findIndex(quote => quote.id === quoteId);
    if (index !== -1) {
        quotes.splice(index, 1);
        res.json({ message: 'Quote deleted successfully', id: quoteId });
    } else {
        res.status(404).json({ message: 'Quote not found' });
    }
});

app.get('/quotes/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.json(randomQuote);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

