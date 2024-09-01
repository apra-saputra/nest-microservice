const { express } = require("../config/main");
const router = express.Router();
const { AuthController } = require("../controllers/auth");

/**
 * user {
 *   id: 1,
 *   name: "<NAME>",
 *   email: "<EMAIL>",
 * }
 */

// Create User
router.post("/", AuthController.register);

// Read User
// router.get("/", (req, res) => {
//   const users = user;
//   res.status(200).json({ code: 200, status: "SUCCESS", data: { users } });
// });

// Update User
router.get("/:id", AuthController.getUser);

// Delete User
router.delete("/:id", AuthController.deleteUser);

module.exports = router;
