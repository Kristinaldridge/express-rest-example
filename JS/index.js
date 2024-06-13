const express = require('express');
let quotes = require('./quotes');
const bodyParser = require ('body-parser');
//const expressStatic = require('express-static');
//const fs = require('fs');
//let ejs = require('ejs');


const app = express();
const PORT = 3000;



app.get('/', (req, res) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Quote Generator</title>
            <link rel="stylesheet" href="./index.css">
        </head>
        <body>
            <h1>Quote Generator</h1>

            <form id="quoteForm">
                <label for="quote">Quote:</label>
                <input type="text" id="quote" name="quote" required>
                <label for="author">Author:</label>
                <input type="text" id="author" name="author">
                <button type="submit">Add Quote</button>
                <button type="submit">Edit</button>
            </form>
          
            <div id="quoteContainer"></div>
          
            <button id="generateButton">Generate Random Quote</button>

            <script src="./quotes.js"></script>
            <script src="./index.js"></script>
            <script src="./JS/quotefunction.js"></script>
              
              </body>
        </html>
    `;
          

    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
 });
   



app.use(bodyParser.json());



app.get('/quotes', (req, res) => {
    res.json(quotes);
    //res.render(quotes);
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

    const htmlContent = `
    <h2>Random Quote:</h2>
    <blockquote>
        <p>${randomQuote.quote}</p>
        <footer>- ${randomQuote.author}</footer>
    </blockquote>
`;

res.setHeader('Content-Type', 'text/html');
res.send(htmlContent);
});


app.patch('/quotes/:id', (req, res) => {
    const quoteId = parseInt(req.params.id);
    const updatedQuoteData = req.body;

    
    const index = quotes.findIndex(quote => quote.id === quoteId);

  
    if (index !== -1) {
        
        quotes[index] = { ...quotes[index], ...updatedQuoteData };
        res.json({ message: 'Quote updated successfully', quote: quotes[index] });
    } else {
        res.status(404).json({ message: 'Quote not found' });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('ERROR!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

