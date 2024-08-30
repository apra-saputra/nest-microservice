const { express } = require("../config/main");
const router = express.Router();

const { user } = require("../data/user");

/**
 * user {
 *   id: 1,
 *   name: "<NAME>",
 *   email: "<EMAIL>",
 * }
 */

// Create User
router.post("/", (req, res) => {
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
});

// Read User
router.get("/", (req, res) => {
  const users = user;
  res.status(200).json({ code: 200, status: "SUCCESS", data: { users } });
});

// Update User
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({
      code: 400,
      status: "BAD_REQUEST",
      message: "Name and Email are required",
    });
  }

  const userById = user.find((user) => user.id === parseInt(id));

  if (!userById) {
    return res.status(404).json({
      code: 404,
      status: "NOT_FOUND",
      message: `User with ID ${id} not found`,
    });
  }

  userById.name = userById.name;
  userById.email = userById.email;

  res.status(200).json({ code: 200, status: "SUCCESS", data: { userById } });
});

// Delete User
router.delete("/:id", (req, res) => {
  const id = req.params.id;
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
});

module.exports = router;
