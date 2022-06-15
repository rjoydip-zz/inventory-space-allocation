import { NextApiRequest, NextApiResponse } from "next";
import { _getAll, _deleteAll, _updateById } from "../../../utils/db/rack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: {},
    body,
    method,
  } = req;
  switch (method) {
    case "GET":
      const _getRacks = await _getAll();
      res.status(200).json(_getRacks);
      break;
    case "POST":
      const _updateRack = await body.map(async (item) => {
        return await _updateById(item.id, item);
      });
      res.status(200).json(await Promise.all(_updateRack));
      break;
    case "DELETE":
      const _deleteAllRacks = await _deleteAll();
      res.status(200).json(_deleteAllRacks);
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
