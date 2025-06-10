const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is alive');
});

app.listen(port, () => {
  console.log(`Keepalive server is running on port ${port}`);
});
