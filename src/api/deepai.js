const apiKey = process.env.REACT_APP_DEEPAI_KEY;
export async function generateImage(prompt) {
  const res = await fetch("https://api.deepai.org/api/text2img", {
    method: "POST",
    headers: {
      "api-key": process.env["REACT_APP_DEEPAI_KEY"],
    },
    body: new URLSearchParams({ text: prompt }),
  });
  const data = await res.json();
  return data.output_url;
}