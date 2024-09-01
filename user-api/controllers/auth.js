import { user } from "../data/user";

export class AuthController {
  static register(req, res) {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        code: 400,
        status: "BAD_REQUEST",
        message: "Name and Email are required",
      });
    }

    const newUser = { id: user.length + 1, name, email };
    user.push(newUser);
    res.status(201).json({ code: 201, status: "CREATED", data: { user } });
  }

  static getUser(req, res) {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({
        code: 400,
        status: "BAD_REQUEST",
        message: "Name and Email are required",
      });

    const data = user.find((el) => el.id === id);

    if (!data)
      return res.status(404).json({
        code: 404,
        status: "NOT_FOUND",
        messsage: "Content is not found",
      });

    return res.status(200).json({
      code: 200,
      status: "SUCCESS_GET",
      data: { data },
    });
  }

  static deleteUser(req, res) {
    const id = req.params.id;

    if (!id)
      return res.status(400).json({
        code: 400,
        status: "BAD_REQUEST",
        message: "Name and Email are required",
      });

    const index = user.findIndex((user) => user.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({
        code: 404,
        status: "NOT_FOUND",
        message: `User with ID ${id} not found`,
      });
    }

    user.splice(index, 1);

    res.status(200).json({
      code: 200,
      status: "SUCCESS",
      data: { message: `User with ID ${id} deleted successfully` },
    });
  }
}
