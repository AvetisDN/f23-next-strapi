export async function generateSummaryService(videoId: string) {
  const url = "/api/summarize";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ videoId }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return new Response(JSON.stringify({ error }));
  }
}
