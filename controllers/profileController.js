// Assuming you have imported the necessary models

// Controller method for the about page
exports.getProfilePage = (req, res) => {
  // Logic to fetch any necessary data or render the appropriate view
  res.render('profile', {
    title: 'Profile',
    user: res.locals.user
  });
};

