// const express = require('express');
// const path = require('path');
// const db = require('./database-mongodb/index.js');
// const bodyParser = require('body-parser');
// const { send } = require('process');
// const app = express();
// //crossorigin permission for 3000, 3004, 3005 and 3006
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   //local address
//   const address = 'http://127.0.0.1';
//   const address2 = 'http://127.0.0.1';
//   const address3 = 'http://127.0.0.1';

//   //deployed address
//   // var address = 'http://52.14.208.55'; //me
//   // var address2 = 'http://54.183.137.155'; // nick
//   // var address3 = 'http://18.224.229.28'; // kate

//   const { referer } = req.headers;
//   if (referer) {
//     if (req.headers.referer.includes(`${address2}:3004`)) {
//       res.header('Access-Control-Allow-Origin', `${address2}:3004`); //recommended
//     } else if (req.headers.referer.includes('3005')) {
//       res.header('Access-Control-Allow-Origin', `${address}:3005`); //title/price
//     } else if (req.headers.referer.includes(`${address3}:3006`)) {
//       res.header('Access-Control-Allow-Origin', `${address3}:3006`); //deliver
//     } else if (req.headers.referer.includes(`${address}:3000`)) {
//       res.header('Access-Control-Allow-Origin', `${address}:3000`); //my proxy
//     } else if (req.headers.referer.includes(`${address2}:3000`)) {
//       res.header('Access-Control-Allow-Origin', `${address2}:3000`); //nick's proxy
//     } else if (req.headers.referer.includes(`${address3}:3000`)) {
//       res.header('Access-Control-Allow-Origin', `${address3}:3000`); //kate's proxy
//     }
//   }
//   next();
// });

// //gzip
// app.get('*.js', function (req, res, next) {
//   req.url = req.url + '.gz';
//   res.set({
//     'Content-Encoding': 'gzip',
//     'Content-Type': 'application/javascript',
//   });
//   next();
// });

// app.use(express.static(path.join(__dirname, 'client/public')));

// //get title and brand name for an item
// app.get('/itemInformation/:itemId', (req, res) => {
//   const itemId = req.params.itemId;

//   if (itemId.includes('array')) {
//     const itemsInArray = itemId.substring(5);
//     const itemIds = itemsInArray.split(',');
//     const invalidId = false;

//     for (var i = 0; i < itemIds.length; i++) {
//       if (itemIds[i] < 100 || itemIds[i] > 199) {
//         res.status(404).send('Invalid itemId');
//         invalidId = true;
//         break;
//       }
//     }

//     if (!invalidId) {
//       db.getTitlesAndBrands(itemIds)
//         .then((data) => {
//           res.send(data);
//         })
//         .catch((err) => {
//           res.status(404).send('error in getTitlesAndBrands: ', err);
//         });
//     }
//   } else if (itemId < 100 || itemId > 199) {
//     console.log(itemId);
//     res.status(404).send('Invalid itemId');
//   } else {
//     db.getTitleAndBrand(itemId)
//       .then((data) => {
//         console.log('success getting title and brand');
//         res.send(data[0]);
//       })
//       .catch((err) => {
//         res.status(500).send(err);
//         console.log('error in getTitleAndBrand: ', err);
//       });
//   }
// });

// //get full description object for an item
// app.get('/descriptionObject/:itemId', (req, res) => {
//   const itemId = req.params.itemId;

//   db.getDescriptionObject(itemId)
//     .then((data) => {
//       console.log('success getting descriptionObj');

//       var formattedData = {
//         description: {
//           title: data[0].title,
//           description: data[0].description,
//           SKU: data[0].SKU,
//           primaryBrand: data[0].primaryBrand,
//           daysToShip: data[0].daysToShip,
//         },
//         directions: {
//           directions: data[0].directions,
//         },
//         attributes: {
//           primaryColor: data[0].primaryColor,
//           material: data[0].material,
//           length: data[0].length,
//           width: data[0].width,
//         },
//         details: {
//           additionalDetails: data[0].additionalDetails,
//         },
//       };

//       res.send(formattedData);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//       console.log('error in getDescriptionObject: ', err);
//     });
// });

// app.post('/descriptionObject', (req, res) => {
//   db.getNextId()
//     .then((response) => {
//       return response[0].itemId;
//     })
//     .then((currentId) => {
//       db.createNewDescriptionDocument(currentId + 1).then((response) => {
//         console.log('Document created with itemId', currentId + 1);
//         console.log('Next id to be added:', currentId + 2);
//         res
//           .status(200)
//           .send(`Document with id ${currentId + 1} Added to the db`);
//       });
//     })
//     .catch((error) => console.log('Error in getting the next id', error));
// });

// app.delete('/descriptionObject/:itemId', (req, res) => {
//   const itemId = req.params.itemId;
//   db.deleteDescriptionDocument(itemId).then((response) => {
//     console.log('Deleted object with itemId: ', itemId);
//     res.status(200).send(`Document with id ${itemId} deleted from the db`);
//   });
// });

// app.put('/descriptionObject/:itemId', (req, res) => {
//   const itemToChange = req.params.itemId;
//   const key = Object.keys(req.body)[0];
//   const value = Object.values(req.body)[0];
//   db.Description.updateOne({ itemId: itemToChange }, { [key]: value })
//     .then((response) => {
//       console.log('Here is the response', response);
//       console.log('Updated');
//       res
//         .status(200)
//         .send(
//           `Document with id ${itemToChange} was updated at key ${key} with value ${value}`
//         );
//     })
//     .catch((error) => console.log('Error updating', error));
// });

// module.exports = app;
