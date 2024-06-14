

// Get routes were not working, so compelted the function from the client side using DOM
const quoteForm = document.getElementById('quoteForm');
const quoteContainer = document.getElementById('quoteContainer');

function generateRandomQuote() {
   
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    const randomQuote = quotes[randomIndex];
    
    const quoteElement = document.createElement('p');
    quoteElement.textContent = `"${randomQuote.quote}"`;
    
    const authorElement = document.createElement('p');
    authorElement.textContent = `- ${randomQuote.author}`;
    
    quoteContainer.innerHTML = '';
    
    quoteContainer.appendChild(quoteElement);
    quoteContainer.appendChild(authorElement);
}
function addNewQuote(event) {
    event.preventDefault(); 
  
    const quoteInput = document.getElementById('quote');
    const authorInput = document.getElementById('author');
    

    const newQuote = {
        id: quotes.length + 1,
        quote: quoteInput.value,
        author: authorInput.value
    };
    

    quotes.push(newQuote);
    

    quoteInput.value = '';
    authorInput.value = '';
    
  
    generateRandomQuote();
};


const generateButton = document.getElementById('generateButton');
generateButton.addEventListener('click', generateRandomQuote);


const addQuoteButton = document.getElementById('addQuoteButton');
addQuoteButton.addEventListener('click', addNewQuote);

generateRandomQuote();


function editQuote() {
   
    const quoteInput = document.getElementById('quote');
    const authorInput = document.getElementById('author');
    const quoteText = quoteContainer.querySelector('p:first-child').textContent; 
    const authorText = quoteContainer.querySelector('p:last-child').textContent; 
    
  
    quoteInput.value = quoteText;
    authorInput.value = authorText;
}
const editQuoteButton = document.getElementById('editQuoteButton');
editQuoteButton.addEventListener('click', editQuote);



function clearFields() {
  
    const quoteInput = document.getElementById('quote');
    const authorInput = document.getElementById('author');
    

    quoteInput.value = '';
    authorInput.value = '';
}
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearFields);


