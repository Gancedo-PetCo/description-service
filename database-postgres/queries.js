const knex = require('./index');

function getAll() {
  knex
    .postgresDB('descriptions')
    .where('id', 1)
    .then((description) => {
      console.log(description);
    });
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
// getAll();
getDataForSpecifiedId(100);

module.exports.getDataForSpecifiedId = getDataForSpecifiedId;
