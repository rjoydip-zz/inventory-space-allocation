import { NextApiRequest, NextApiResponse } from 'next'
import { _getById, _create, _deleteById } from "../../../utils/db/sku";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
    method,
  } = req;
  switch (method) {
    case "GET":
      const _getSkus = await _getById(id);
      res.status(200).json(_getSkus);
      break;
    case "POST":
      const _createSku = await _create(body);
      res.status(200).json(_createSku);
      break;
    case "DELETE":
      const _deleteSku = await _deleteById(id);
      res.status(200).json(_deleteSku);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
