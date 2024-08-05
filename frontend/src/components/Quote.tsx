import { useEffect, useState } from 'react'
import { useRandomQuote } from '../hooks/quoteHook';

interface Quote {
    text: string;
    author: string;
}

const Quote = () => {
    const [quote, setQuote] = useState<Quote>();

    useEffect(() => {
        const FetchQuote = async () => {
            try {
                const randomQuote = await useRandomQuote();
                setQuote(randomQuote);
            } catch (error) {
                console.error("Error fetching quote", error)
            }
        };
        FetchQuote();
    }, [])
    return (
        <div className='flex items-center justify-center h-0 lg:h-screen text-3xl font-extrabold bg-pink-200'>
            <div className='w-3/4'>
                {
                    quote ? (
                        <div>
                            <div>"{quote.text}"</div>
                            <div className='mt-4 text-2xl font-semibold'>
                                {quote.author.substring(
                                    0,
                                    quote.author.indexOf(",")
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>Loading</div>
                    )
                }
            </div>
        </div>
    )
}

export default Quote
