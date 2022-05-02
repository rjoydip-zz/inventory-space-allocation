import prisma from ".";

const dbRef = prisma.rack;

export const _getById = async (id) => {
  return await dbRef.findMany({
    where: {
      id,
      isOccupied: false,
    },
  });
};

export const _getAll = async () => {
  return await dbRef.findMany({
    where: {
      isOccupied: false,
    },
  });
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
