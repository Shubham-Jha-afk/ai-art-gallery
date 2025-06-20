// src/api/fetchImage.js

export async function fetchFromDeepAI(prompt = 'ai art') {
  try {
    const res = await fetch('https://api.deepai.org/api/text2img', {
      method: 'POST',
      headers: {
        'api-key': process.env.REACT_APP_DEEPAI_KEY,
      },
      body: new URLSearchParams({ text: prompt }),
    });

    const data = await res.json();

    if (!data.output_url) throw new Error('No image returned');

    return {
      id: Date.now(), // Unique ID
      url: data.output_url,
      title: `DeepAI - ${prompt}`,
      creator: 'DeepAI',
      date: new Date().toISOString().split('T')[0],
      category: ['Generated'],
      prompt,
    };
  } catch (error) {
    console.warn('DeepAI failed, falling back to Unsplash:', error);
    return await fetchFromUnsplashFallback();
  }
}

async function fetchFromUnsplashFallback() {
  const fallbackUrl = `https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80`;
  return {
    id: Date.now(),
    url: fallbackUrl,
    title: 'Fallback AI Art',
    creator: 'Unsplash',
    date: new Date().toISOString().split('T')[0],
    category: ['Fallback'],
    prompt: 'N/A',
  };
}
