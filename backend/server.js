const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/registration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.json({ exists: true });
  }

  const user = new User({ fullName, email, password });
  await user.save();

  res.json({ exists: false });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
