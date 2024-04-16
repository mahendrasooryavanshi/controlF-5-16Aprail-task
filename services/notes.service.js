const connection = require("../models");
const { sequelize, Sequelize } = connection;
const Model = sequelize.models;
const { Op } = require("sequelize");
const { Note } = Model;
const productService = {
  create: async (data) => {
    try {
      console.log(data);
      return await Note.create(data);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  findOne: async (data) => {
    try {
      return await Note.findOne({
        where: data,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  notesList: async (data) => {
    try {
      return await Note.findAll({
        where: data,
        raw: true,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  update: async (data, where) => {
    try {
      return await Note.update(data, {
        where: where,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  search: async (data) => {
    try {
      return await Note.findAll({
        where: data.deletedAt,
        [Op.or]: [
          { title: { [Op.like]: `${data.search}%` } },
          { body: { [Op.like]: `${data.search}%` } },
        ],
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
module.exports = productService;
