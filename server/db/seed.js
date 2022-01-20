/* eslint-disable no-console */
const db = require('./db');
const { Item, Warehouse, StockLevel } = require('../models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced');

  const item1 = await Item.create({
    name: 'Angus Magtek',
    minStock: 150,
    vendorName: 'Snow Devil',
  });

  const item2 = await Item.create({
    name: 'Circuit Amptek',
    minStock: 300,
    vendorName: 'Snow Devil',
  });

  const item3 = await Item.create({
    name: 'Easy Livin',
    minStock: 500,
    vendorName: 'Snow Devil',
  });

  await Item.create({
    name: 'After Dinner Mint',
    minStock: 900,
    vendorName: 'Firebelly Tea',
  });

  await Item.create({
    name: 'A Breath of Fresh Air',
    minStock: 600,
    vendorName: 'Firebelly Tea',
  });

  await Item.create({
    name: 'Zest For Life',
    minStock: 300,
    vendorName: 'Firebelly Tea',
  });

  const warehouse1 = await Warehouse.create({
    name: 'Ottawa Central',
    addressLine1: '123 Entrepreneur Lane',
    addressLine2: 'Unit 2A',
    city: 'Ottawa',
    province: 'ON',
    postalCode: 'K1G 2C3',
  });

  const warehouse2 = await Warehouse.create({
    name: 'Ottawa East',
    addressLine1: '405 Rebel Road',
    addressLine2: 'Suite 105',
    city: 'Ottawa',
    province: 'ON',
    postalCode: 'K2P 3B5',
  });

  const warehouse3 = await Warehouse.create({
    name: 'Big Warehouse',
    addressLine1: '370 SMB Square',
    city: 'Ottawa',
    province: 'ON',
    postalCode: 'K1P 6D6',
  });

  await Warehouse.create({
    name: 'Small Warehouse',
    addressLine1: 'Merchant Motorway',
    city: 'Ottawa',
    province: 'ON',
    postalCode: 'K2D 6E5',
  });

  await StockLevel.create({
    itemId: item1.id,
    warehouseId: warehouse1.id,
    units: 100,
  });

  await StockLevel.create({
    itemId: item1.id,
    warehouseId: warehouse2.id,
    units: 200,
  });

  await StockLevel.create({
    itemId: item2.id,
    warehouseId: warehouse2.id,
    units: 150,
  });

  await StockLevel.create({
    itemId: item2.id,
    warehouseId: warehouse3.id,
    units: 200,
  });

  await StockLevel.create({
    itemId: item3.id,
    warehouseId: warehouse2.id,
    units: 500,
  });

  await StockLevel.create({
    itemId: item3.id,
    warehouseId: warehouse3.id,
    units: 150,
  });

  console.log('seeded items');
}

async function runSeed() {
  console.log('seeding');
  try {
    await seed();
  } catch (error) {
    console.error(error);
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

runSeed();
