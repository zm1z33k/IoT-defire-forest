const jwt = require('jsonwebtoken');

const mockUser = {
  email: 'admin@example.com',
  password: '123456', // хардкод для теста
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    const token = jwt.sign({ email }, 'supersecret', { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
};