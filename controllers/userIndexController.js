exports.getIndexPage = (req, res)=>{
    res.render('userIndex', {
      title: 'User page',
      user: res.locals.user
    })
  }