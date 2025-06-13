const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

const upload = require("./utils/multer"); // Just use the imported one
const cloudinary = require("./utils/cloudinary");
const fs = require("fs");

const User = require('./models/User');
const OnlyUser = require('./models/OnlyUser');

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://aliusmandata:Xvp44hMaap3lPxdf@lawyers.g5rvn1y.mongodb.net/lawyerHiring?retryWrites=true&w=majority&appName=Lawyers"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));





//Active Cases Schema & Model
const activeCasesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "OnlyUser" },
  username: String,
  userphone: String, // Add phone field
  useremail: String,
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lawyername: String,
  lawyerphone: String, // Add phone field
  courtdate: String,
  hearings: String,
  meetings: String,
  updatesincases: String,
  status: String,
  averageRating: Number,
  // ratings: {
  //   type: [Number], // array of numbers
  //   default: []
  // },
  image: String,
});

const ActiveCases = mongoose.model("ActiveCases", activeCasesSchema);

////// Book Lawyer
app.post("/book-lawyer/:id", async (req, res) => {
  const userId = req.params.id;
  const { lawyerId } = req.body;
  // console.log(userId);

  try {
    const existsLawyer = await User.findById(lawyerId);
    const existsUser = await OnlyUser.findById(userId);
    // console.log(existsLawyer, existsUser);

    if (existsLawyer && existsUser) {
      const userCases = await ActiveCases.find({ lawyerId: lawyerId });
      console.log(userCases)
      if (!userCases) {
        const booklawyer = await ActiveCases.create({
          userId: userId,
          username: existsUser.username,
          userphone: existsUser.phone,
          useremail: existsUser.email,
          lawyerId: lawyerId,
          lawyername: existsLawyer.username,
          lawyerphone: existsLawyer.phone,
          lawyeremail: existsLawyer.email,
          averageRating: existsLawyer.averageRating,
          // ratings: existsLawyer.ratings,
        });

        await transporter.sendMail({
          from: "aliusmandata@gmail.com",
          to: existsLawyer.email,
          subject: "Booded for Case",
          html: `<p>You are booked by ${existsUser.username} check active cases.
Contact Email: ${existsUser.email}
Phone: ${existsUser.phone}
Please ensure you are available and respond to them.</p>`,
        });
        console.log(booklawyer);
        res.status(200).json({ message: "lawyer Booked Successfuly" });
      }
      const result = userCases.filter(item => item.userId.equals(userId));
      console.log("Results"+result)
      if (!result[0]) {
        const booklawyer = await ActiveCases.create({
          userId: userId,
          username: existsUser.username,
          userphone: existsUser.phone,
          useremail: existsUser.email,
          lawyerId: lawyerId,
          lawyername: existsLawyer.username,
          lawyerphone: existsLawyer.phone,
          lawyeremail: existsLawyer.email,
          averageRating: existsLawyer.averageRating,
          // ratings: existsLawyer.ratings,
        });

        await transporter.sendMail({
          from: "aliusmandata@gmail.com",
          to: existsLawyer.email,
          subject: "Booded for Case",
          html: `<p>You are booked by ${existsUser.username} check active cases.
Contact Email: ${existsUser.email}
Phone: ${existsUser.phone}
Please ensure you are available and respond to them.</p>`,
        });
        console.log(booklawyer);
        res.status(200).json({ message: "lawyer Booked Successfuly" });
      }
      else {
        return res.status(400).json({ message: "Already Booked" })
      }

      
    } else {
      res.status(500).json({ message: "Failed to book Lawyer" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to book Lawyer" });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from 'Authorization: Bearer token'

  if (!token) {
    return res.status(403).json({ message: "No token, authorization denied." });
  }

  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = user; // Attach the user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Email Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aliusmandata@gmail.com",
    pass: "ilmvuuypymtkdldx", // App password
  },
});

app.post("/rate-lawyer", authenticateToken, async (req, res) => {
  const { lawyerId, rating } = req.body;
  const userId = req.user.id;
  const userRole = req.user.role;

  if (userRole !== "user") {
    return res.status(403).json({ message: "Only users can rate lawyers." });
  }

  if (userId === lawyerId) {
    return res.status(400).json({ message: "You cannot rate yourself." });
  }

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid rating value." });
  }

  try {
    const lawyer = await User.findById(lawyerId);
    if (!lawyer || lawyer.role !== "lawyer") {
      return res.status(404).json({ message: "Lawyer not found." });
    }

    // Find if user already rated this lawyer
    const existingIndex = lawyer.ratings.findIndex(
      (r) => r.userId.toString() === userId
    );

    if (existingIndex !== -1) {
      lawyer.ratings[existingIndex].rating = rating;
    } else {
      lawyer.ratings.push({ userId, rating });
    }

    // Recalculate average rating
    const total = lawyer.ratings.reduce((acc, r) => acc + r.rating, 0);
    lawyer.averageRating = total / lawyer.ratings.length;

    await lawyer.save();

    res.json({
      message: "Rating submitted",
      averageRating: lawyer.averageRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit rating" });
  }
});

// Pending OTP Users (Temp Store)
const pendingUsers = new Map();
// Signup layer Route (Sends OTP)
app.post("/signup", upload.single("image"), async (req, res) => {
  // console.log(req.body)

  const localPath = req.file.path;
  const projectName = req.body.projectName || "lawyer";

  const { username, email, password, gender, cnic, role, phone } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    // Upload to Cloudinary folder
    const cloudinaryResult = await cloudinary.uploader.upload(localPath, {
      folder: `/${projectName}`,
    });
    console.log(cloudinaryResult.secure_url);
    fs.unlinkSync(localPath);
    // Check if phone number starts with 0 and replace it with +92
    const phoneWithCountryCode = phone.startsWith("0")
      ? `+92${phone.slice(1)}`
      : phone;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      image: cloudinaryResult.secure_url,
      password: hashedPassword,
      gender,
      phone: phoneWithCountryCode, // Store phone with country code
      cnic,
      role: "lawyer",
      otp: otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });
    // await user.save()

    await transporter.sendMail({
      from: "aliusmandata@gmail.com",
      to: email,
      subject: "Your OTP Verification Code",
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });
    res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});


// Signup layer Route (Sends OTP)
app.post("/signup-user", async (req, res) => {
  const { username, email, password, gender, cnic, role, phone } = req.body;

  try {
    const exists = await OnlyUser.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    // Check if phone number starts with 0 and replace it with +92
    const phoneWithCountryCode = phone.startsWith("0")
      ? `+92${phone.slice(1)}`
      : phone;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await OnlyUser.create({
      username,
      email,
      password: hashedPassword,
      gender,
      phone: phoneWithCountryCode, // Store phone with country code
      cnic,
      role: "user",
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });
    await user.save();

    await transporter.sendMail({
      from: "aliusmandata@gmail.com",
      to: email,
      subject: "Your OTP Verification Code",
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// Verify OTP Route
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    console.log(user);
    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    if (user.isVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }
    user.isVerified = true;
    user.otp = null;
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save user", error: err.message });
  }
});

// Verify uer OTP Route
app.post("/verify-user-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await OnlyUser.findOne({ email });

    console.log(user);
    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    if (user.isVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }
    user.isVerified = true;
    user.otp = null;
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save user", error: err.message });
  }
});

//Adovecate Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in." });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

//user Login Route
app.post("/user-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await OnlyUser.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in." });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

app.post("/update-profile", authenticateToken, async (req, res) => {
  const { username, phone, age, qualification, gender, picture } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { username, phone, age, qualification, gender, picture },
    { new: true }
  );
  res.json({ message: "Profile updated successfully", user });
});

app.get("/lawyers", async (req, res) => {
  try {
    const lawyers = await User.find({ role: "lawyer" });
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lawyers" });
  }
});

app.get("/lawyer/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const lawyers = await User.find({ _id: id });
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lawyers" });
  }
});

// Update user details by ID

app.put("/lawyer/:id", async (req, res) => {
  // console.log(req.body);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          gender: req.body.gender,
          phone: req.body.phone,
          age: req.body.age,
          cnic: req.body.cnic,
          experience: req.body.experience,
          qualification: req.body.qualification,
          totalCases: req.body.totalCases,
          specializedIn: req.body.specializedIn,
          address: req.body.address,
          fee: req.body.fee,
        },
      },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/lawyer/status/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Toggle status
    user.status = user.status === "available" ? "inactive" : "available";
    await user.save();

    res.status(200).json({ message: "Status updated", status: user.status });
  } catch (err) {
    console.error("Status Toggle Error:", err);
    res.status(500).json({ message: "Error updating status" });
  }
});

//////////// get login user cases

app.get("/activecasesuser/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // User ke naam aur phone ke basis pe filter kar rahe hain
    const user = await OnlyUser.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const activeCases = await ActiveCases.find({ userId: userId });

    const enrichedCases = await Promise.all(
      activeCases.map(async (caseItem) => {
        const lawyer = await User.findById(caseItem.lawyerId).lean();
        return {
          ...caseItem.toObject(),
          ratings: lawyer?.ratings || [],
          averageRating: lawyer?.averageRating || 0,
          image: lawyer?.image || '',
        };
      })
    );

    res.status(200).json(enrichedCases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get active cases" });
  }
});

//////////// get login lawyer cases

app.get("/activecaselawyer/:id", async (req, res) => {
  const lawyerId = req.params.id;
  try {
    // User ke naam aur phone ke basis pe filter kar rahe hain
    const user = await User.findById(lawyerId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const activeCases = await ActiveCases.find({ lawyerId: lawyerId });
    // console.log(activeCases)

    const enrichedCases = await Promise.all(
      activeCases.map(async (caseItem) => {
        return {
          ...caseItem.toObject(),
          ratings: user.ratings || [],
          averageRating: user?.averageRating || 0,
          image: user?.image || '',
        };
      })
    );

    res.status(200).json(enrichedCases);
    // res.status(200).json(activeCases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get active cases" });
  }
});

app.get("/lawyerEditCases/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const cases = await ActiveCases.findById(id);
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cases" });
  }
});


app.put("/caseeditput/:id", async (req, res) => {
  const court = (req.body.courtdate)
  const hire = (req.body.hearings)
  const meet = (req.body.meetings)

  console.log(court.split('T')[0])
  try {
    const updatedCase = await ActiveCases.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          courtdate: court.split('T')[0],
          hearings: hire.split('T')[0],
          meetings: meet.split('T')[0],
          status: req.body.status,

        },
      },
      { new: true }
    );

    if (!updatedCase)
      return res.status(404).json({ message: "Case not found" });

    console.log("581" + updatedCase)


    await transporter.sendMail({
      from: "aliusmandata@gmail.com",
      to: updatedCase.useremail,
      subject: "Your Case Progress Update",
      html: `<p>Your case status is currently marked as ${updatedCase.status}.
Court Date: ${updatedCase.courtdate}
Next Hearing: ${updatedCase.hearings}
Meeting with Lawyer: ${updatedCase.meetings}
Please ensure you are available and prepared for the mentioned dates.</p>`,
    });
    res.json(updatedCase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//user send message to admin Route
app.post("/contact-with-admin", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    console.log(email)
    const user = await OnlyUser.findOne({ email:email })
    const lawyer = await User.findOne({ email:email })
    console.log(user, lawyer)
    if (user) {
      await transporter.sendMail({
        from: "aliusmandata@gmail.com",
        to: "aliusmandata@gmail.com",
        subject: "Contact with admin",
        html: `<p>
      <strong>Dear Admin!</strong>
      Name: ${name} Email: ${email} Message: ${message}
      </p>`,
      });
      return res.status(200).json({ message: "Message sent successfully" })
    }
    else if (lawyer) {
      await transporter.sendMail({
        from: "aliusmandata@gmail.com",
        to: "aliusmandata@gmail.com",
        subject: "Contact with admin",
        html: `<p>
      <strong>Dear Admin!</strong>
      Name: ${name} Email: ${email} Message: ${message}
      </p>`,
      });
      return res.status(200).json({ message: "Message sent successfully" })
    }
    else {
      res.status(500).json({ message: "Error send message", error: err.message });

    }

  } catch (err) {
    res.status(500).json({ message: "Error send message", error: err.message });
  }
});


app.get("/users", async (req, res) => {
  try {
    const users = await OnlyUser.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

app.get("/activecases", async (req, res) => {
  try {
    const cases = await ActiveCases.find();
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Active Cases" });
  }
});

app.put('/lawyerSpecializedCase/:id', async (req, res) => {
  const { id } = req.params;

  console.log(id, req.body)
  const { valueToRemove } = req.body;
  try {
    const lawyer = await User.findById(id);
    if (!lawyer) return res.status(404).json({ error: 'Lawyer not found' });

    // Filter the array to remove the value
    lawyer.specializedIn = lawyer.specializedIn.filter(
      (specialization) => specialization !== valueToRemove
    );

    console.log(lawyer)

    await lawyer.save();
    res.status(200).json({ message: 'Specialization updated', data: lawyer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
