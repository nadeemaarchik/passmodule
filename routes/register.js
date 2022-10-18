const express = require("express");
const router = express.Router();
// import controller
const {
    registerUser,
    loginUser
} = require("../controllers/register");

router.post(
    "/registerUser",
    registerUser
  );
  router.post(
    "/login",
    loginUser
  );
//   router.get(
//     "/findAllBook",
//     findAllBook
//   );
//   router.delete(
//     "/deleteBook",
//     deleteBook
//   );
//   router.put(
//     "/updateBookdetails",
//     updateBookdetails
//   );
  module.exports = router;