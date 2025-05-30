const app = require('./app');
const PORT = process.env.PORT || 5001;
require('dotenv').config(); // подключение .env

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});