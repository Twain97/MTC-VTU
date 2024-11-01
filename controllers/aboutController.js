// Assuming you have imported the necessary models

// Controller method for the about page
exports.getAboutPage = (req, res) => {
  // Logic to fetch any necessary data or render the appropriate view
  res.render('about', {
    title: 'About',
    user: res.locals.user
  });
};


