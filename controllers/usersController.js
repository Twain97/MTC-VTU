const User = require('../models/user');

// Controller method for fetching all Users
exports.getAllUsers = async (req, res) => {
  try{
    const user = await User.find({})
    return user
  }catch (err)  {
    console.error(err);
    res.status(500).send('An error occurred');
  };
    
};

// Controller method for fetching a single User by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
};

// Controller method for creating a new User
exports.createUser = (req, res) => {
  const { name, age, gender, contactInformation } = req.body;

  const newUser = new User({
    name,
    email,
    age,
    gender,
    contactInformation
  });

  newUser.save()
    .then(user => {
      res.status(201).json(user);
      console.log("Users record created successfully")
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
};

// Controller method for updating a User
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, age, gender, contactInformation} = req.body;

  User.findByIdAndUpdate(id, {
    name,
    age,
    gender,
    contactInformation,
    medicalHistory,
    insuranceDetails
  }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
};

// Controller method for deleting a User
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
};
