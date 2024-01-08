import multer from "npm:multer";

const fileStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "images");
  },
  filename: (req: any, file: any, cb: any) => {
    req.body.img = "/images/" + Date.now() + "_" + file.originalname;
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const singleUpload = multer({
  storage: fileStorage,
  // limits: { fileSize: 1024 * 1024 },
}).single("file");

export default singleUpload;
