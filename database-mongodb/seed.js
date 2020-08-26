const db = require('./index.js');
const mongoose = require('mongoose');
const faker = require('faker');

const itemData = [
  {
    itemId: '100',
    title: 'CatToys Spring-Loaded Mouse',
    description:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    SKU: '3419054',
    primaryBrand: 'CatToys',
    daysToShip: 'Ships Next Business Day',
    directions:
      'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on cats playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
    primaryColor: 'Brown',
    material: 'Plush',
    length: '5 IN',
    width: '2.5 IN',
    additionalDetails:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
  },
  {
    itemId: '101',
    title: 'BestFriends Dog Bone',
    description:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    SKU: '3445910',
    primaryBrand: 'BestFriends',
    daysToShip: 'Ships Next Business Day',
    directions:
      'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on dogs playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
    primaryColor: 'White',
    material: 'Bone',
    length: '7 IN',
    width: '2.5 IN',
    additionalDetails:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
  },
  {
    itemId: '102',
    title: 'CatToys Springy Bird Toy',
    description:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    SKU: '7619054',
    primaryBrand: 'CatToys',
    daysToShip: 'Ships In Two Business Days',
    directions:
      'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on cats playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
    primaryColor: 'Multicolor',
    material: 'Plush and Wire',
    length: '10 IN',
    width: '1.5 IN',
    additionalDetails:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
  },
  {
    itemId: '103',
    title: 'Bird Watcher Bird Cage Mirror, 4" L X 2.5" W',
    description:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    SKU: '8949054',
    primaryBrand: 'Bird Watcher',
    daysToShip: 'Ships Next Business Day',
    directions:
      'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on birds playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
    primaryColor: 'Green',
    material: 'Plastic',
    length: '4 IN',
    width: '2.5 IN',
    additionalDetails:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
  },
  {
    itemId: '104',
    title: 'BestFriends Plush Fox with Squeaker',
    description:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    SKU: '9582048',
    primaryBrand: 'BestFriends',
    daysToShip: 'Ships In Two Business Days',
    directions:
      'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on dogs playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
    primaryColor: 'Multicolor',
    material: 'Plush',
    length: '6 IN',
    width: '4.5 IN',
    additionalDetails:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
  },
  {
    itemId: '105',
    title: 'IpsumLorem Plush Bunny with Squeaker',
    description:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    SKU: '9582048',
    primaryBrand: 'IpsumLorum',
    daysToShip: 'Ships In Two Business Days',
    directions:
      'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on dogs playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
    primaryColor: 'Multicolor',
    material: 'Plush',
    length: '6 IN',
    width: '4.5 IN',
    additionalDetails:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
  },
  {
    itemId: '106',
    title: 'BestFriends Plush Mouse with Squeaker',
    description:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    SKU: '1282048',
    primaryBrand: 'BestFriends',
    daysToShip: 'Ships In Two Business Days',
    directions:
      'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on dogs playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
    primaryColor: 'Multicolor',
    material: 'Plush',
    length: '6 IN',
    width: '4.5 IN',
    additionalDetails:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
  },
  {
    itemId: '107',
    title: 'IpsumLorem BirdCage Swing',
    description:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    SKU: '3456748',
    primaryBrand: 'IpsumLorem',
    daysToShip: 'Ships Next Business Day',
    directions:
      'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on birds playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
    primaryColor: 'Multicolor',
    material: 'Plastic',
    length: '4 IN',
    width: '1.5 IN',
    additionalDetails:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
  },
  {
    itemId: '108',
    title: 'KittyBrand Plush Fox with Squeaker',
    description:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    SKU: '9582048',
    primaryBrand: 'KittyBrand',
    daysToShip: 'Ships In Two Business Days',
    directions:
      'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on cats playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
    primaryColor: 'Multicolor',
    material: 'Plush',
    length: '6 IN',
    width: '4.5 IN',
    additionalDetails:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
  },
  {
    itemId: '109',
    title: 'BestFriends Rubber Bone with Chicken Flavor',
    description:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    SKU: '2342048',
    primaryBrand: 'BestFriends',
    daysToShip: 'Ships In Two Business Days',
    directions:
      'CAUTION: Intended for pet use only. Not a childs toy. Choose toys based on dogs playing habits. Toys should be large enough to not be swallowed. IMPORTANT: No pet toy is indestructible. Small parts present a choking or gastrointestinal blockage risk. Always supervise your pet during play to prevent accidental swallowing of parts. Inspsect toy regularly and replace if any part becomes loose. If toy becomes wet, some color transfer may occur. Spot clean only.',
    primaryColor: 'Multicolor',
    material: 'Plush',
    length: '8 IN',
    width: '2 IN',
    additionalDetails:
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
  },
];

const generateRecords = () => {
  var itemId = 110;
  var numberOfRecords = 90;

  for (var i = 0; i < numberOfRecords; i++) {
    var newDoc;

    newDoc = {
      itemId: itemId,
      title: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      SKU: Math.floor(Math.random() * 10000000).toString(),
      primaryBrand: faker.company.companyName(),
      daysToShip: `Ships In ${Math.floor(Math.random() * 10)} Business Days`,
      directions: faker.lorem.paragraph(),
      primaryColor: faker.commerce.color(),
      material: faker.commerce.productMaterial(),
      length: `${Math.floor(Math.random() * 10)} IN`,
      width: `${Math.floor(Math.random() * 10)} IN`,
      additionalDetails: faker.lorem.paragraph(),
    };

    itemData.push(newDoc);
    itemId++;
  }
};

generateRecords();

const insertItemData = () => {
  db.Description.create(itemData)
    .then(() => {
      console.log('DB seeded');
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log('error inserting item data in db: ', err);
    });
};

insertItemData();
