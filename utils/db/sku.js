import prisma from ".";

const dbRef = prisma.sku;

export const _getById = async (id) => {
  return await dbRef.findMany({
    where: {
      id,
    },
  });
};

export const _getAll = async () => {
  return await dbRef.findMany();
};

export const _create = async (data) => {
  return await dbRef.create({ data });
};

export const _updateById = async (id, data) => {
  return await dbRef.update({ where: { id }, data });
};

export const _deleteById = async (id) => {
  return await dbRef.delete({
    where: {
      id,
    },
  });
};

export const _deleteAll = async () => {
  return await dbRef.deleteMany();
};
