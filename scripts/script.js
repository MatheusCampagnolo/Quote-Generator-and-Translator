document.getElementById('generate-quote').addEventListener('click', generateQuote);
document.getElementById('translate-quote').addEventListener('click', translateCurrentQuote);

// The informations that we want to display with the api
let currentQuote = '';
let currentAuthor = '';

// Function to generate a random quote from the Quotable API
async function generateQuote() {
    
    try {
        const apiUrl = 'https://api.quotable.io/random';
        const response = await fetch(apiUrl);
        const data = await response.json();
        currentQuote = data.content;
        currentAuthor = data.author;
        const selectedLanguage = document.getElementById('language-select').value;
        // If the selected language is English, display the quote directly
        // Otherwise, translate the quote first
        if (selectedLanguage === 'en') {
            displayQuote(currentQuote, currentAuthor);
        } else {
            translateQuote(currentQuote, currentAuthor, selectedLanguage);
        } 
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

// Function to display a quote and its author in the DOM
function displayQuote(quote, author) {
    document.getElementById('quote-text').textContent = quote;
    document.getElementById('quote-author').textContent = `- ${author}`;
}

// Function to translate the current quote, if necessary
function translateCurrentQuote() {
    const selectedLanguage = document.getElementById('language-select').value;
    // If the selected language is English, display the quote directly
    // Otherwise, translate the quote first
    if (selectedLanguage === 'en') {
        displayQuote(currentQuote, currentAuthor);
    } else {
        translateQuote(currentQuote, currentAuthor, selectedLanguage);
    }
}

// Function to translate a quote into a target language using the MyMemory API
async function translateQuote(quote, author, targetLanguage) {
    
    try{
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(quote)}&langpair=en|${targetLanguage}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const translatedText = data.responseData.translatedText;
        displayQuote(translatedText, author);
        } catch(error) {
            console.error('Error fetching translation:', error);
        }
}