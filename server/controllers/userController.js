import generateRefreshToken from "../config/refreshToken";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import User from "../models/User";
import { cloudinaryUploader } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";
import { fileRemover } from "../utils/fileRemover";
const cloudinary = require("cloudinary");

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, location } = req.body;
  if (!name || !email || !password || !location) {
    return next(new ErrorHandler("All feild are Required ...", 404));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User Already Exists ....", 401));
  }
  try {
    // if (req.file !== undefined) {
    //   const result = await cloudinaryUploader(req.file.path);
    //   const user = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     location: req.body.location,
    //     avatar: {
    //       public_id: result.public_id,
    //       url: result.url,
    //     },
    //     admin: req.body.admin,
    //   });
    //   fileRemover(req.file.filename);
    //   await user.save();
    //   return res.status(201).json({
    //     _id: user._id,
    //     avatar: user.avatar,
    //     name: user.name,
    //     email: user.email,
    //     location: user.location,
    //     verified: user.verified,
    //     admin: user.admin,
    //     token: await user.generateJWT(),
    //   });
    // } else {
    const user = await User.create({
      name,
      email,
      password,
      location,
      avatar: "",
    });
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      location: user.location,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
    // }
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
});

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("All feild are Required ...", 404));
  }

  let user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User Not Found ....", 404));
  }

  if (await user.comparePassword(password)) {
    const RefreshToken = await generateRefreshToken(user._id);

    const updateUser = await User.findByIdAndUpdate(
      {
        _id: user._id,
      },
      {
        refershToken: RefreshToken,
      },
      {
        new: true,
      }
    );

    res.cookie("refreshToken", RefreshToken, {
      httpOnly: false,
      maxAge: 72 * 60 * 60 * 1000,
      withCredentials: true,
    });
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } else {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
});

const handleRefreshToken = catchAsyncErrors(async (req, res) => {
  const cookie = req.cookies;

  if (cookie.refreshToken == null) {
    return next(new ErrorHandler("No refresh token found in cookie", 401));
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refershToken: refreshToken });
  if (!user) {
    return next(
      new ErrorHandler("No Refresh Token found in Db not matched ..", 403)
    );
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decode) => {
    if (err || user._id != decode.id) {
      return next(
        new ErrorHandler(
          "This is Somthing went to wrong with Refresh Token ...",
          401
        )
      );
    }
    const accessToken = await user.generateJWT();
    res.json({ acessToken: accessToken });
  });
});

const userProfile = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req.user._id);

  if (user) {
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
    });
  } else {
    return next(new ErrorHandler("User Not Found Error ...", 404));
  }
});

const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  await cloudinary.v2.uploader.destroy(
    user.avatar.public_id,
    async (error, result) => {
      if (error) {
        return next(new ErrorHandler(error.massage, 404));
      }
      await User.findByIdAndDelete(req.user._id);

      return res.clearCookie("refreshToken").status(200).json({
        message: "User Deleted SuccessFully ....",
      });
    }
  );
});

const updateProfile = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("User Not Found ...", 404));
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password && req.body.password.length < 6) {
    return next(
      new ErrorHandler("Password length must be at least 6 character")
    );
  } else if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUserProfile = await user.save();

  res.json({
    _id: updatedUserProfile._id,
    avatar: updatedUserProfile.avatar,
    name: updatedUserProfile.name,
    email: updatedUserProfile.email,
    verified: updatedUserProfile.verified,
    admin: updatedUserProfile.admin,
    token: await updatedUserProfile.generateJWT(),
  });
});

const updateProfilePicture = catchAsyncErrors(async (req, res, next) => {
  const upload = uploadPicture.single("avatar");

  upload(req, res, async function (err) {
    if (err) {
      const error = new Error(
        "An unknown error occured when uploading " + err.message
      );
      return next(new ErrorHandler(error.message, error.statusCode));
    } else {
      // every thing went well
      if (req.file) {
        let filename;
        let updatedUser = await User.findById(req.user._id);
        filename = updatedUser.avatar;
        if (filename) {
          fileRemover(filename);
        }
        updatedUser.avatar = req.file.filename;
        await updatedUser.save();
        res.json({
          _id: updatedUser._id,
          avatar: updatedUser.avatar,
          name: updatedUser.name,
          email: updatedUser.email,
          verified: updatedUser.verified,
          admin: updatedUser.admin,
          token: await updatedUser.generateJWT(),
        });
      } else {
        let filename;
        let updatedUser = await User.findById(req.user._id);
        filename = updatedUser.avatar;
        updatedUser.avatar = "";
        await updatedUser.save();
        fileRemover(filename);
        res.json({
          _id: updatedUser._id,
          avatar: updatedUser.avatar,
          name: updatedUser.name,
          email: updatedUser.email,
          verified: updatedUser.verified,
          admin: updatedUser.admin,
          token: await updatedUser.generateJWT(),
        });
      }
    }
  });
});

export {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
  handleRefreshToken,
  deleteUser,
};
