import axios from "axios";

export async function useRandomQuote () {
    try {
        const response = await axios.get("https://type.fit/api/quotes");
        const quotes = response.data;

        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        return randomQuote;
    } catch (error) {
        console.error("Error fetching random quote:", error);
        return null;
    }
}