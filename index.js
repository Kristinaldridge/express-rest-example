const express = require('express');
let quotes = require('./JS/quotes');
const bodyParser = require ('body-parser');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = 3000;

// middleware #1 &2. And rendering static view
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'Public')));


//get requests 
app.get('/', (req, res) => {
    res.render('home', { quotes });
  });

  app.get('/quotes/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const htmlContent = `
    <h2>Random Quote:</h2>
    <blockquote>
        <p>${randomQuote.text}</p>
        
    </blockquote>
`;

res.setHeader('Content-Type', 'text/html');
res.send(htmlContent);
});
  
 //put request
 app.put('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const editedQuote = req.body.editedQuote;
  
    const index = quotes.findIndex(quote => quote.id === id);
    if (index !== -1) {
      quotes[index].text = editedQuote;
  
      saveQuotesToFile(quotes);
  
      res.status(200).send('Quote updated successfully');
    } else {
      res.status(404).send('Quote not found');
    }
  });
  
//   post request
  app.post('/add', (req, res) => {
    const newQuote = req.body.newQuote;
    const newId = quotes.length + 1; 
    

    quotes.push({ id: newId, text: newQuote });
   

    saveQuotesToFile(quotes);
    
    res.redirect("/");
  });

  //delete request
  app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    quotes = quotes.filter(quote => quote.id !== id);
   
    saveQuotesToFile(quotes);

    res.redirect('/');
  });

  
function saveQuotesToFile(quotesArray) {
    const quotesFilePath = path.join(__dirname, 'quotes.js');
    const quotesFileContent = `let quotes = ${JSON.stringify(quotesArray, null, 2)};\n\nmodule.exports = quotes;`;
    
    fs.writeFile(quotesFilePath, quotesFileContent, err => {
      if (err) {
        console.error('Error saving quotes to file:', err);
      } else {
        console.log('Completed!');
      }
    });
  }
  //custom middleware/error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('ERROR!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


