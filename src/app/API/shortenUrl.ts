import axios from 'axios';

export const shortenUrl = async (longUrl: string, customAlias: string) => {
  try {
    const response = await axios.post(
      'https://api.tinyurl.com/create',
      {
        url: longUrl,
        alias: customAlias || undefined, // Optional custom alias
        domain: 'tinyurl.com', // Default TinyURL domain
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TINYURL_API_KEY }`, // Correct format for the API key
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data.tiny_url; // Ensure this matches TinyURL's response structure
  } catch (error: any) {
    throw new Error(error.response?.data?.errors?.[0] || 'Failed to shorten URL');
  }
};
