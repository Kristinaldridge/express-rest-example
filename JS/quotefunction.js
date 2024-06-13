document.addEventListener("DOMContentLoaded", function() {
   const generateButton = document.getElementById("generateButton");

   generateButton.addEventListener("click", function() {
        
        fetch("/quotes/random")
            .then(response => response.json())
            .then(data => {
              
                const quoteContainer = document.getElementById("quoteContainer");
                quoteContainer.innerHTML = `
                    <h2>Random Quote:</h2>
                    <blockquote>
                        <p>${data.quote}</p>
                        <footer>- ${data.author}</footer>
                    </blockquote>
                `;
            })
            .catch(error => console.error("Error", error));
    });
});