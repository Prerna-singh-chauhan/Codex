import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX!",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-0613",
        prompt: `${prompt}`,
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);
