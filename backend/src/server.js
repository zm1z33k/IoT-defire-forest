const app = require('./app');
const mongoose = require('mongoose');

require('./cron/dataChecker');

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URI;

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Connected to MongoDB Cloud');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));