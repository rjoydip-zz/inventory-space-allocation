import { _getAll, _deleteAll } from "../../../utils/db/sku";

export default async function handler(req, res) {
  const {
    query: {},
    method,
  } = req;
  switch (method) {
    case "GET":
      const _getSkus = await _getAll();
      res.status(200).json(_getSkus);
      break;
    case "DELETE":
      const _deleteAllSkus = await _deleteAll();
      res.status(200).json(_deleteAllSkus);
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
