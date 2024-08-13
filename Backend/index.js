// index.js
const express = require("express");
const cors = require("cors");
const summarizeText = require("./summarizer.js"); 

const app = express();
const port = 4000;

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.get("/", (req, res) => {
    res.send("Express is running");
});

app.post("/summarize", async (req, res) => {
    const text = req.body.text_to_summarize;
    try {
        console.log("Received text:", text); 
        const summary = await summarizeText({ inputs: text });
        res.json({ summary });
    } catch (error) {
        console.log("Error occurred:", error); 
        res.status(500).json({ error: "Failed to summarize the text." });
    }
});


app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});


