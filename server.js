// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup ES module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle chat request
app.post('/chat', async (req, res) => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`, // Replace with your key!
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: 'Something broke on the server 🧨' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`👋 Yo! The Deevo backend is live → http://localhost:${PORT}`);
});
