# Quote Generator

This is a simple web application built with Express.js that allows users to manage a collection of quotes. Users can add, edit, delete, and generate random quotes using this application.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running the following command:

   ```
   npm install
   ```

## Usage

1. Start the server by running:

   ```
   npm start
   ```

2. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Features

- **Add Quote:** Users can add new quotes by providing the quote content and author name.
- **Edit Quote:** Users can edit existing quotes.
- **Delete Quote:** Users can delete quotes from the collection.
- **Generate Random Quote:** Users can generate a random quote from the existing collection.

## Endpoints Used

- `GET /`: Renders the HTML page with the quote generator interface.
- `GET /quotes`: Retrieves all quotes from the collection.
- `POST /quotes/add`: Adds a new quote to the collection.
- `DELETE /quotes/delete/:id`: Deletes a quote from the collection by ID.
- `GET /quotes/random`: Retrieves a random quote from the collection.
- `PATCH /quotes/:id`: Updates a quote in the collection by ID.


## Contributers 

Kristin Aldridge. However, all Contributions are welcome to fix, or enhance the code. Feel free to submit bug reports, feature requests, or pull requests.

## Project Status
  - Ongoing. Issues with rendering template view with ejs, express and fs. In addition, time ran out to fix the issues with functionality of "generate random quote" button. Endpoints are fully functional. 
## License

This project is licensed under the MIT License 

---
