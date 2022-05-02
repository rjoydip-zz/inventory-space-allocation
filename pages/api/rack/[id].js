import {
  _getById,
  _create,
  _deleteById,
  _updateById,
} from "../../../utils/db/rack";

export default async function handler(req, res) {
  const {
    query: { id },
    body,
    method,
  } = req;
  switch (method) {
    case "GET":
      const _getRacks = await _getById(id);
      res.status(200).json(_getRacks);
      break;
    case "POST":
      const _createRack = await _create(body);
      res.status(200).json(_createRack);
      break;
    case "PUT":
      const _updateRack = await _updateById(id, body);
      res.status(200).json(_updateRack);
      break;
    case "DELETE":
      const _deleteRack = await _deleteById(id);
      res.status(200).json(_deleteRack);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
