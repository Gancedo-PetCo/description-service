const knex = require('./index');
const {
  generateDescriptionsShape,
  generateAttributesShape,
  generateDetailsShape,
  generateDirectionsShape,
} = require('./generationScript');

function createNewRecord() {
  let descriptionData = generateDescriptionsShape();
  let attributesData = generateAttributesShape();
  let detailsData = generateDetailsShape();
  let directionsData = generateDirectionsShape();
  let descriptionIdToBeInserted;
  return knex.postgresDB
    .raw(
      `
      INSERT INTO descriptions  (title, description, sku, primary_brand, days_to_ship)
      VALUES (${descriptionData})
  RETURNING id
  `
    )
    .then((response) => {
      let currentId = Number(response.rows[0].id);
      console.log('Here is the currentId', currentId);
      let nextDescriptionId = Number(response.rows[0].id) + 99;
      return knex.postgresDB
        .raw(
          `UPDATE descriptions
        SET description_id = ${nextDescriptionId}
        WHERE id = ${currentId}
        RETURNING description_id`
        )
        .then((response) => {
          descriptionIdToBeInserted = Number(
            response.rows[0]['description_id']
          );
          console.log('description id', descriptionIdToBeInserted);
          return knex.postgresDB
            .raw(
              `
            INSERT INTO attributes (color_id, material, length, width, description_id)
            VALUES (${attributesData}, ${descriptionIdToBeInserted})
          `
            )
            .then((response) => {
              console.log('Inserted into attributes!');
              return knex.postgresDB
                .raw(
                  `
              INSERT INTO directions (directions, description_id)
              VALUES (${directionsData}, ${descriptionIdToBeInserted})
            `
                )
                .then((response) => {
                  return knex.postgresDB.raw(
                    `
                INSERT INTO details (additional_details, description_id)
                VALUES (${detailsData}, ${descriptionIdToBeInserted})
              `
                  );
                });
            });
        });
    });
}

function updateSpecifiedTableRow(
  idToSearch,
  targetColumn,
  newDataToBeInserted
) {
  const validQueries = {
    description: 'descriptions',
    title: 'descriptions',
    sku: 'descriptions',
    primary_brand: 'descriptions',
    days_to_ship: 'descriptions',
    color_id: 'attributes',
    material: 'attributes',
    length: 'attributes',
    width: 'attributes',
    directions: 'directions',
    additional_details: 'directions',
  };
  // Validate that the table exists
  if (!validQueries[targetColumn]) {
    return Promise.reject(`${targetColumn} column does not exist`);
  }
  // validate that if the column is sku that the input is a number
  // and 1,000,000 - 9,000.000
  if (targetColumn === 'sku') {
    if (isNaN(newDataToBeInserted) === true) {
      return Promise.reject(
        `Invalid data type trying to be inserted into ${targetColumn}`
      );
    }
    if (newDataToBeInserted.length !== 7) {
      return Promise.reject(
        `Invalid data type trying to be inserted into ${targetColumn}`
      );
    }
  }
  // validate that the color falls within 1 - 967 (the acceptable colors)
  if (targetColumn === 'color_id') {
    if (isNaN(newDataToBeInserted) === true) {
      return Promise.reject(
        `Invalid data type trying to be inserted into ${targetColumn}`
      );
    }
    if (Number(newDataToBeInserted) < 0 || Number(newDataToBeInserted) > 967) {
      return Promise.reject(`Invalid range given for the ${targetColumn}`);
    }
  }

  return knex
    .postgresDB(validQueries[targetColumn])
    .where({ description_id: idToSearch })
    .update(targetColumn, newDataToBeInserted);
}

function getDataForSpecifiedId(idToSearch) {
  return knex.postgresDB
    .raw(
      `SELECT
    descriptions.title,
    descriptions.primary_brand,
    descriptions.sku,
    descriptions.days_to_ship,
    attributes.material,
    attributes.length,
    attributes.width,
    directions.directions,
    details.additional_details,
    colors.*, descriptions.description
    from descriptions
    INNER JOIN
    attributes
    on descriptions.description_id = attributes.description_id
    INNER JOIN
    details
    on details.description_id = attributes.description_id
    INNER JOIN
    directions
    on directions.description_id = attributes.description_id
    INNER JOIN
    colors on attributes.color_id = colors.id
    WHERE attributes.description_id = ${idToSearch};
    `
    )
    .then((description) => {
      const rowData = description.rows[0];
      var formattedData = {
        description: {
          title: rowData.title,
          description: rowData.description,
          SKU: rowData.sku,
          primaryBrand: rowData.primary_brand,
          daysToShip: rowData.days_to_ship,
        },
        directions: {
          directions: rowData.directions,
        },
        attributes: {
          primaryColor: rowData.color_name,
          material: rowData.material,
          length: rowData.length,
          width: rowData.width,
        },
        details: {
          additionalDetails: rowData.additional_details,
        },
      };
      return formattedData;
    });
}

module.exports.getDataForSpecifiedId = getDataForSpecifiedId;
module.exports.updateSpecifiedTableRow = updateSpecifiedTableRow;
module.exports.createNewRecord = createNewRecord;
