import React, { useState } from "react";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.REACT_APP_GROQ_API_KEY;

export default function LlmWidget() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!input) return;

    try {
      const client = new OpenAI({
        apiKey: key, 
        baseURL: "https://api.groq.com/openai/v1",
      });

      const res = await client.responses.create({
        model: "openai/gpt-oss-20b",
        input: input,
      });

      setResponse(res.output_text);
    } catch (err) {
      console.error(err);
      setResponse("Error getting response");
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", width: "300px" }}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSend}>Send</button>
      <div>{response}</div>
    </div>
  );
}
