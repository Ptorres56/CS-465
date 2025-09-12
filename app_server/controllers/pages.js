// app_server/controllers/pages.js
const render = (view, title, data = {}) => (req, res) =>
  res.render(view, { title, year: new Date().getFullYear(), ...data });

module.exports = {
  home:    render('pages/index',   'Travlr Getaways'),
  travel:  render('pages/travel',  'Travel'),
  rooms:   render('pages/rooms',   'Rooms'),
  meals:   render('pages/meals',   'Meals'),
  news:    render('pages/news',    'News'),
  about:   render('pages/about',   'About'),
  contact: render('pages/contact', 'Contact'),
};