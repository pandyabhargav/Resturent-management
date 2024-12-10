const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "http://localhost:5000","https://resturent-management-fg3v.vercel.app"],  // Allow images from backend
    },
  })
);
// app.use(morgan("dev"));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// Routes
app.use("/", require("./routes/index.js"));

// Welcome Route
app.get("/", (req, res) => {
  res.send(`
    <center>
        <h1>Welcome to Restaurant Management System!</h1>
        <br>
        <p>
            Get Restaurant Management: 
        <a href="https://github.com/MaulikPatel63" target="_blank">
        </a>
        </p>
    </center>
  `);
});

// Error Handler Middleware (placed after routes)
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
