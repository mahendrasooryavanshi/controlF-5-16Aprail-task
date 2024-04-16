const express = require("express");
const router = express.Router();
const {
  signupValidation,
  loginValidation,
} = require("../validation/auth.validation");
const { notesValidation } = require("../validation/notes.validation");
const userController = require("../controller/auth.controller");
const noteController = require("../controller/notes.controller");
const tokenMiddleware = require("../middleware/token.middleware");
// API Endpoints:
//    - POST /users/register: Register a new user.

router.post("/users/register", [signupValidation], userController.signup);

//    - POST /users/login: Authenticate a user and return a token.
router.post("/users/login", [loginValidation], userController.login);

// API for Notes

router.post(
  "/notes/create",
  [tokenMiddleware],
  [notesValidation],
  noteController.create
);

// router.get("/notes", [tokenMiddleware], noteController.list);

// router.get("/notes/:noteId", [tokenMiddleware], noteController.getNote);

// router.put("/notes/update/:noteId", [tokenMiddleware], noteController.update);

// router.delete("/notes/:noteId", [tokenMiddleware], noteController.delete);

router.get("/notes/search", [tokenMiddleware], noteController.searching);

module.exports = router;
