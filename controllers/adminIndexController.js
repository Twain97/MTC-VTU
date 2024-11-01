const getAllUsers = require('./usersController');



exports.adminPage = async (req, res) => {
  try {
    const users = await getAllUsers.getAllUsers(req, res); 
    res.render('adminIndex',
      { 
        title: "ADMIN", 
        users: users, 
        user: res.locals.user
      });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
};
