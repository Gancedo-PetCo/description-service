# Description/Directions/Attributes/AdditionalDetails

This service builds a tabbed module that presents more detailed item information.

## Related Projects

- https://github.com/PetToyCo/reviews
- https://github.com/PetToyCo/photo-gallery
- https://github.com/PetToyCo/elizabeth_ProxyServer
- https://github.com/PetToyCo/mainTitle_price
- https://github.com/PetToyCo/ProductRecommendations

Please checkout https://github.com/PetToyCo/description_directions_attributes_ for more information on running the service in production/development mode, seeding the database and installing dependencies

## Table of Contents

1. CRUD

## CRUD

This service has 5 endpoints. One to retrieve an item's descriptionObject, and one to retrieve its title and primaryBrand. To retrieve data for a specific item (100-199), and CRUD operations (update, delete, create) for creating descriptionObjects navigate to:

CREATE Operation (POST)

Endpoint: /descriptionObject
Creates a new object, incrementing the itemId past 199.
Response: Document with id new_id_added Added to the db

READ Operation (GET)
Endpoint: /descriptionObject/###

```
JSON response format:
{
  description: {
    title: “item title”,
    description: “item description”,
    SKU: “number representing the item’s SKU”,
    primaryBrand: “the item’s brand name”,
    daysToShip: “a string representing the item’s days to ship”
   },
  directions: {
    directions: “a string containing directions and warnings about the item”
  },
  attributes: {
    primaryColor: “item’s primary color”,
    material: “item’s primary material”,
    length: “item’s length in inches as a string”,
    width: “item’s width in inches as a string”
  },
  details: {
    additionalDetails: “item’s advertising copy”
  }
 }
```

Note: It is possible to request multiple items at once for itemInformation using the format: /itemInformation/array###,###,###

Endpoint: /itemInformation/###

READ Operation (GET)

```
JSON response format:
{
  title: “full name of item”,
  primaryBrand: “brand name”
}
```

Endpoint: /itemInformation/array###,###

```
JSON response format:
[
{
  title: “full name of item”,
  primaryBrand: “brand name”
},
{
  title: “full name of item”,
  primaryBrand: “brand name”
}
]
```

UPDATE Operation (PUT)

Endpoint: /descriptionObject/:itemId
Updates the object at the specified itemId, with the req.body being the update
Response: Document with id specified_id was updated at key key_specified with value value_being_updated

DELETE Operation (DELETE)

Endpoint: /descriptionObject/:itemId
Deletes the object at the specified itemId
Response: Document with id itemId_specified_for_deletion deleted from the db
