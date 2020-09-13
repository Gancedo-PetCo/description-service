const express = require('express');
const path = require('path');
const db = require('./database-mongodb/index.js');
const bodyParser = require('body-parser');
const { send } = require('process');
const app = express();
const postgres = require('./database-postgres/queries');
//crossorigin permission for 3000, 3004, 3005 and 3006
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  //local address
  const address = 'http://127.0.0.1';
  const address2 = 'http://127.0.0.1';
  const address3 = 'http://127.0.0.1';

  //deployed address
  // var address = 'http://52.14.208.55'; //me
  // var address2 = 'http://54.183.137.155'; // nick
  // var address3 = 'http://18.224.229.28'; // kate

  const { referer } = req.headers;
  if (referer) {
    if (req.headers.referer.includes(`${address2}:3004`)) {
      res.header('Access-Control-Allow-Origin', `${address2}:3004`); //recommended
    } else if (req.headers.referer.includes('3005')) {
      res.header('Access-Control-Allow-Origin', `${address}:3005`); //title/price
    } else if (req.headers.referer.includes(`${address3}:3006`)) {
      res.header('Access-Control-Allow-Origin', `${address3}:3006`); //deliver
    } else if (req.headers.referer.includes(`${address}:3000`)) {
      res.header('Access-Control-Allow-Origin', `${address}:3000`); //my proxy
    } else if (req.headers.referer.includes(`${address2}:3000`)) {
      res.header('Access-Control-Allow-Origin', `${address2}:3000`); //nick's proxy
    } else if (req.headers.referer.includes(`${address3}:3000`)) {
      res.header('Access-Control-Allow-Origin', `${address3}:3000`); //kate's proxy
    }
  }
  next();
});

//gzip
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set({
    'Content-Encoding': 'gzip',
    'Content-Type': 'application/javascript',
  });
  next();
});

app.use(express.static(path.join(__dirname, 'client/public')));

//get title and brand name for an item
app.get('/itemInformation/:itemId', (req, res) => {
  const itemId = req.params.itemId;

  if (itemId.includes('array')) {
    const itemsInArray = itemId.substring(5);
    const itemIds = itemsInArray.split(',').map((id) => Number(id));
    postgres
      .getMultipleTitlesAndDecsriptions(...itemIds)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res
          .status(404)
          .send(
            'One of the ids submitted was invalid or the input request was formatted imporperly!'
          );
      });
  } else {
    postgres
      .getOneTitleAndDescription(Number(itemId))
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(404).send('The id searched for was invalid!');
      });
  }
});

//get full description object for an item
app.get('/descriptionObject/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  postgres
    .getDataForSpecifiedId(itemId)
    .then((formattedData) => {
      res.send(formattedData);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log('error in getDescriptionObject: ', err);
    });
});

app.post('/descriptionObject', (req, res) => {
  postgres
    .createNewRecord()
    .then((response) => {
      console.log('Record created');
      res.status(200).send(`Document was created`);
    })
    .catch((error) => console.log('Error in getting the next id', error));
});

app.delete('/descriptionObject/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  postgres
    .deleteRow(itemId)
    .then((response) => {
      console.log('Item Deleted');
      res.status(200).send(`Row was succesfully deleted`);
    })
    .catch((error) => {
      res.status(404).send(error);
      console.log('Error in deletion', error);
    });
});

app.put('/descriptionObject/:itemId', (req, res) => {
  const itemToChange = req.params.itemId;
  const key = Object.keys(req.body)[0];
  const value = Object.values(req.body)[0];
  postgres
    .updateSpecifiedTableRow(itemToChange, key, value)
    .then((response) => {
      res.status(200).send('Data is updated to reflect your desires!');
    })
    .catch((error) => {
      res.status(404).send(error);
      console.log('Error updating', error);
    });
});

module.exports = app;
