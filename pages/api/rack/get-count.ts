import { NextApiRequest, NextApiResponse } from "next";
import { _getbyCount } from "../../../utils/db/rack";

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
      res.status(200).json({ count: await _getbyCount() });
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
