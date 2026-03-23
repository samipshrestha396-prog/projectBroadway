import express from "express";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// this is to upload image on cloudinary(a image and video  uploading platform)
cloudinary.config({
  cloud_name: "depuwy7ob",
  api_key: "338532944426837",
  api_secret: "Jb8SOAPYeHtyWUvz-s3CpLKYNSo",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },

  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("only image allowed", false));
  }
};

const upload = multer({
  storage,
  filterFile: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  //   res.send({ message: "image uploaded", file: req.file.path });
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecomm",
    });

    res.send({
      message: "image uploade successfully",
      image: result.secure_url,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
