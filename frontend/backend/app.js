const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});