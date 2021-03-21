// // const  dayrec = require('../models/bet.js');
// // Routes
// module.exports = (app) => {
//   // Get all data from database
//   app.get('/api/?', (req, res) => {
//     dayrec.findAll({}).then((results) => res.json(results));
//   });
//   // Get a specific piece of info
//   app.get('/api/:?', (req, res) => {
//     table.findAll({
//       where: {
//         title: req.params.dayrec,
//       },
//     }).then((results) => res.json(results));
//   });
//   // Get all books of a specific genre
//   app.get('/api/?/:>', (req, res) => {
//     table.findAll({
//       where: {
//         // ? req.params.?,
//       },
//     }).then((results) => res.json(results));
//   });
//   app.post('/api/?/:>', (req, res) => {
//     table.findAll({
//       where: {
//         ? req.params.?,
//       },
//     }).then((results) => res.json(results));
//   });
// };
// //   diifernt api route.js per table in the database.