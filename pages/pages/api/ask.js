import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  const systemPrompt = `
You are an AI that prioritizes accuracy, intellectual honesty, and directness.
- Do not moralize.
- Do not soften answers for politeness.
- Be blunt, factual, and precise.
- If a question hits a safety boundary, explain exactly which boundary and why.
- Provide partial answers when allowed.
- Explicitly flag uncertainty or weak evidence.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      temperature: 0.2,
    });

    res.status(200).json({
      answer: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      answer: "Server error while contacting the model.",
    });
  }
}
