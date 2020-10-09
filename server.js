const newrelic = require('newrelic');
const cluster = require('cluster');
const os = require('os');
const PORT = process.env.PORT || 3002;

const redis = require('redis');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { send } = require('process');
const cors = require('cors');
const postgres = require('./database-postgres/queries');

const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);

redis_client.on('error', (err) => {
  console.log('Error ' + err);
});

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  console.log(cpuCount);
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

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

    return redis_client.get(
      `descriptionObject${itemId}`,
      (err, descriptionObject) => {
        // check if the object is present in redis already
        if (descriptionObject) {
          return res.status(200).send(JSON.parse(descriptionObject));
        }
        //
        else {
          postgres
            .getDataForSpecifiedId(itemId)
            .then((formattedData) => {
              redis_client.setex(
                `descriptionObject${itemId}`,
                86400,
                JSON.stringify(formattedData)
              );
              res.status(200).send(formattedData);
            })
            .catch((err) => {
              res.status(500).send(err);
              console.log('error in getDescriptionObject: ', err);
            });
        }
      }
    );
  });

  app.post('/descriptionObject', (req, res) => {
    postgres
      .createNewRecord()
      .then((response) => {
        res.status(200).send(`Document was created`);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
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
  // VCHAMGEW
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

  app.listen(3002, () => {
    console.log(`server is listening on port ${PORT}`);
  });
}

cluster.on('exit', (worker) => {
  console.log('mayday! mayday! worker', worker.id, ' is no more!');
  cluster.fork();
});
