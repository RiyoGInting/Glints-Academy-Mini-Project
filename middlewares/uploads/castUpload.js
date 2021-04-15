const crypto = require("crypto");

function castUpload(req, res, next) {
  let sampleFile;
  let uploadPath;
  let fileName = crypto.randomBytes(16).toString("hex");

  if (!req.files || Object.keys(req.files).length === 0) {
    req.body.image = `/images/default/profile-picture.jpg`;
    next();
  } else {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.image;

    // Check file size (max 1MB)
    if (sampleFile.size > 10000000) {
      return res.status(400).json({ message: "Image must be less than 1MB" });
    }

    if (
      sampleFile.mimetype == "image/jpeg" ||
      sampleFile.mimetype == "image/png" ||
      sampleFile.mimetype == "image/gif" ||
      sampleFile.mimetype == "image/bmp"
    ) {
      fileName += "." + sampleFile.mimetype.substring(6);
      uploadPath = "./public/images/casts/" + fileName;
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });

      req.body.image = `/images/casts/${fileName}`;
      next();
    } else {
      return res.status(400).send("file is not an image");
    }
  }
}

module.exports = castUpload;
