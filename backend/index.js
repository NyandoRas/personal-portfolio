require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./models/User')
const PORT = 5000;


const mongoose = require('mongoose');
//const dbURI = 'mongodb+srv://nyandoraobenarasolofonjatovo:zedneverdie1999@cluster0.9cugu0q.mongodb.net/nyando_portfolio?retryWrites=true&w=majority&appName=Cluster0';
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected!"))
.catch(err => console.error("❌ MongoDB connection error:", err));


app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: "❌ Error saving user", error: err.message });
  }
});


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
