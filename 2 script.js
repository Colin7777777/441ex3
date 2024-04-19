console.log("I am Colin. my IP is 10.50.45.160 Mac address is fe80::298b:c66c:70d2:7a28%16. Ncc student ID is: 173190707");

const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');
const db = new sqlite3.Database("./book.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the books database.');
});

const dbRun = promisify(db.run).bind(db);
const dbAll = promisify(db.all).bind(db);
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to list all books from the database  
async function listBooks() {  
    try {  
        // Execute a SQL query to retrieve all book records  
        const rows = await dbAll('SELECT * FROM books');  
  
        // Iterate over the retrieved rows and print each book's details  
        rows.forEach((row) => {  
            console.log(`ID: ${row.ID}, Title: ${row.title}, Author: ${row.author}, ISBN: ${row.ISBN}, Description: ${row.description}`);  
        });  
    } catch (err) {  
        // Handle any errors that occurred during the database query  
        console.error(err.message);  
    }  
}  
  
// Asynchronous function that acts as a command-line interface for adding book records  
async function commandInterface() {  
    try {  
        // Prompt the user for the book's title  
        const title = await askQuestion('Enter book title: ');  
  
        // Prompt the user for the book's author  
        const author = await askQuestion('Enter book author: ');  
  
        // Prompt the user for the book's ISBN  
        const ISBN = await askQuestion('Enter book ISBN: ');  
  
        // Prompt the user for the book's description  
        const description = await askQuestion('Enter book description: ');  
  
        // Insert the new book record into the database  
        await dbRun('INSERT INTO books (title, author, ISBN, description) VALUES (?, ?, ?, ?)', [title, author, ISBN, description]);  
  
        // Inform the user that the book was added successfully  
        console.log('Book added successfully.');  
  
        // Ask the user if they want to add another book  
        const answer = await askQuestion('Do you want to add another book? (yes/no): ');  
  
        // If the user answers 'yes', recursively call the commandInterface function to add another book  
        if (answer === 'yes') {  
            await commandInterface();  
        } else {  
            // If the user answers 'no', list all books and close the readline interface  
            await listBooks();  
            readline.close();  
        }  
    } catch (err) {  
        // Handle any errors that occurred during the user input or database operations  
        console.error(err.message);  
    }  
}  
  
// Synchronous function to ask a question to the user and return a Promise with the answer  
function askQuestion(question) {  
    return new Promise((resolve) => {  
        // Use the readline module's question method to ask the user a question and resolve the Promise with the answer  
        readline.question(question, (answer) => {  
            resolve(answer);  
        });  
    });  
}  
  
// Immediately invoked asynchronous function expression that acts as the program's entry point  
(async () => {  
    try {  
        // Create the 'books' table in the database if it doesn't already exist  
        await dbRun('CREATE TABLE IF NOT EXISTS books (ID INTEGER PRIMARY KEY, title TEXT, author TEXT, ISBN TEXT, description TEXT)');  
  
        // Inform the user that the table was created successfully  
        console.log('Books Table created successfully');  
  
        // Start the command interface to manage book records  
        await commandInterface();  
    } catch (err) {  
        // Handle any errors that occurred during the table creation or command interface initialization  
        console.error(err.message);  
    }  
})();
