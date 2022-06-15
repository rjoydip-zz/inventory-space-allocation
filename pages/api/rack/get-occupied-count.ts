import { NextApiRequest, NextApiResponse } from "next";
import { _getCountOfOccupiedRack } from "../../../utils/db/rack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: {},
    method,
  } = req;
  switch (method) {
    case "GET":
      res.status(200).json({ count: await _getCountOfOccupiedRack() });
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
