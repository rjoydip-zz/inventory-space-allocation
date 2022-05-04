import dayjs from 'dayjs';
import Chance from "chance";
import { PrismaClient } from "@prisma/client";

const fakeDatasetCount = 5;
const chance = new Chance();
const prisma = new PrismaClient();

const seedRacksData = async () => {
  if ((await prisma.rack.count()) === 0) {
    Array(fakeDatasetCount)
      .fill(0)
      .forEach(async (_, index) => {
        await prisma.rack.create({
          data: {
            id: chance.guid({ version: 4 }),
            order: index,
            rackName: chance.word({ length: 5 }),
            rackCapacity: chance.floating({ min: 1, max: 20, fixed: 2 }),
            capacityWiseRank: 0,
            storageCoefficient: 0,
            measurement: "cubic feet",
            createdAt: dayjs().format(),
            updatedAt: dayjs().format(),
          },
        });
      });
  } else {
    console.log("Default rack already created");
  }
};

const seedSkuData = async () => {
  if ((await prisma.sku.count()) === 0) {
    Array(fakeDatasetCount)
      .fill(0)
      .forEach(async () => {
        await prisma.sku.create({
          data: {
            id: chance.guid({ version: 4 }),
            skuName: chance.word({ length: 5 }),
            skuCapacity: chance.floating({ min: 1, max: 20, fixed: 2 }),
            measurement: "cubic feet",
            createdAt: dayjs().format(),
            updatedAt: dayjs().format(),
          },
        });
      });
  } else {
    console.log("Default sku already created");
  }
};

const run = async () => {
  await seedRacksData();
  await seedSkuData();
  await prisma.$disconnect();
  console.log("Data seeding complete");
  process.exit(0);
};

run()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
