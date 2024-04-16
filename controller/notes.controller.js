const notesService = require("../services/notes.service");
const authService = require("../services/user.service");
const controller = {
  create: async (req, res) => {
    let title = req.body.title ? req.body.title : "";
    let body = req.body.body ? req.body.body : "";
    let token = res.locals.userData;
    const email = token.email;
    let response = {};

    try {
      const user = await authService.check({ email: email, deletedAt: null });
      if (user.isLogin !== "true") {
        response.message = "user has log out.. please login first";
        return res.json(response);
      }
      let data = {
        title,
        body,
        userId: user.id,
      };

      const isNoteName = await notesService.findOne({
        title: title,
        deletedAt: null,
      });
      if (isNoteName) {
        response.error = "Duplicate_Title_Name";
        response.message = "Title name can't be duplicate";
        return res.json(response);
      }

      let result = await notesService.create(data);
      if (!result) {
        response.statusCode = 504;
        response.errorMsg = "Something_Went_wrong";
        response.message = "something went wrong on server";
        return res.json(response);
      }
      response.statusCode = 201;
      response.status = "success";
      response.message = "Note created successfully";
      response.result = result;
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
  list: async (req, res) => {
    let response = {};
    try {
      let list = await notesService.notesList({ deletedAt: null });

      if (list.length < 0) {
        response.statusCode = 504;
        response.error = "Something_went_wrong";
        response.message = "Something went wrong on server ";
        return res.json(response);
      }
      return res.json({ notesList: list });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    let title = req.body.categoryName ? req.body.categoryName : "";
    let body = req.body.productName ? req.body.productName : "";
    let id = req.params.noteId ? req.params.noteId : "";
    let response = {};
    console.log(req.params);
    try {
      let where = {
        id: id,
        deletedAt: null,
      };
      let isNotes = await notesService.findOne(where);
      console.log(isNotes, "____________");
      if (!isNotes) {
        response.statusCode = 404;
        response.error = "Not_found";
        response.message = "note id is not found....";
        return res.json(response);
      }
      let updateData = {
        updatedAt: new Date(),
      };
      if (title !== "") {
        updateData.title = title;
      }
      if (body !== "") {
        updateData.body = body;
      }

      const update = await notesService.update(updateData, where);
      if (!update) {
        response.statusCode = 504;
        response.error = "server error";
        response.message = "something went wrong on server";
        return res.json(response);
      }
      response.statusCode = 201;
      response.status = "Success";
      response.message = "product updated successfully";
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    let response = {};
    let id = req.params.noteId ? req.params.noteId : "";
    try {
      let where = { id: id, deletedAt: null };
      let isNote = await notesService.findOne(where);
      if (!isNote) {
        response.statusCode = 404;
        response.error = "Not_found";
        response.message = "Product id is not found....";
        return res.json(response);
      }
      let update = { deletedAt: new Date() };
      const deleteProduct = await notesService.update(update, where);
      if (!deleteProduct) {
        response.statusCode = 504;
        response.error = "server error";
        response.message = "something went wrong on server";
        return res.json(response);
      }
      response.statusCode = 201;
      response.status = "Success";
      response.message = "note deleted successfully";
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  getNote: async (req, res) => {
    let id = req.params.noteId ? req.params.noteId : "";
    let response = {};
    try {
      let list = await notesService.findOne({ deletedAt: null, id: id });

      if (!list) {
        response.statusCode = 404;
        response.error = "Not_found";
        response.message = "noteId is not in db..please try valid noteId";
        return res.json(response);
      }
      return res.json({ notesList: list });
    } catch (error) {
      console.log(error);
    }
  },
  searching: async (req, res) => {
    const search = req.query.search ? req.query.search : "";
    let response = {};

    try {
      if (search == "") {
        let list = await notesService.notesList({ deletedAt: null });
        if (list.length < 0) {
          response.statusCode = 504;
          response.error = "Something_went_wrong";
          response.message = "Something went wrong on server ";
          return res.json(response);
        }
        return res.json({ notesList: list });
      }
      let result = await notesService.search({
        deletedAt: null,
        search: search,
      });
      if (!result) {
        response.message = "no result found";
        return response.json(response);
      }
      response.result = result;
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = controller;
