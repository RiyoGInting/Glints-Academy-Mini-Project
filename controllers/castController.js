const { cast, movie } = require("../models");

class CastController {
  //get all data
  async getAll(req, res) {
    try {
      //find all data
      let data = await cast.find();

      //if no data
      if (data.length === 0) {
        return res.status(404).json({
          message: "Data Not Found",
        });
      }
      //if success
      return res.status(200).json({
        message: "Success Get All Data",
        data,
      });
      //if error
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }

  //get one data
  async getOne(req, res) {
    try {
      //find all data
      let data = await cast
        .findOne({
          _id: req.params.id,
        })
        .populate("movie");
      //if no data
      if (!data) {
        return res.status(404).json({
          message: "Data Not Found",
        });
      }
      //if success
      return res.status(200).json({
        message: "Success Get One Data",
        data,
      });
      //if error
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }

  //create data
  async create(req, res) {
    try {
      //find all data
      let data = await cast.create(req.body);
      //if success
      return res.status(200).json({
        message: "Success Create Data",
        data,
      });
      //if error
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }

  //update data
  async update(req, res) {
    try {
      //update and find one data all data
      let data = await cast.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        {
          new: true,
        }
      );
      //if no data
      if (!data) {
        return res.status(404).json({
          message: "Data Not Found",
        });
      }
      //if success
      return res.status(200).json({
        message: "Success Update Data",
        data,
      });
      //if error
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }

  //delete data
  async delete(req, res) {
    try {
      //find one data
      let findData = await cast.findOne({
        _id: req.params.id,
      });
      //if no data
      if (!findData) {
        return res.status(404).json({
          message: "Data Not Found",
        });
      }
      //delete one data
      await cast.delete({
        _id: req.params.id,
      });
      //if success
      return res.status(200).json({
        message: "Success Delete Data",
        deleted: findData,
      });
      //if error
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }
}

module.exports = new CastController();
