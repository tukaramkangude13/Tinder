import express from "express";
import { connectdb } from "./config/database.js";
import { Usermodel } from "./models/user.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import validator from "validator";

import Jwt from "jsonwebtoken";
import { userAuth } from "./middlewares/auth.js";
const main = express();
main.use(express.json());
main.use(cookieParser());
// Debug Logger
const debug = (message, data = null) => {
    console.log(`[DEBUG] ${message}`, data ? JSON.stringify(data, null, 2) : '');
};

// Signup Endpoint
main.post("/signup", async (req, res) => {
    try {
        debug("Signup request body:", req.body);

        const { password, ...otherDetails } = req.body;
        if (!password) {
            return res.status(400).send({ message: "Password is required" });
        }

        const passwordHash = await bcrypt.hash(password, 1);
        debug("Password hashed successfully.");

        const userobject = { ...otherDetails, password: passwordHash };
        const user = new Usermodel(userobject);
        await user.save();

        debug("User saved successfully:", user);
        res.status(201).send({ message: "Signup successful", data: user });
    } catch (err) {
        console.error("[ERROR] Error in /signup:", err);
        res.status(500).send({ message: "Internal Server Error", error: err.message });
    }
});

main.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // Validate the input
        if (!emailId || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        // Check if the email exists in the database
        const user = await Usermodel.findOne({ emailId });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        // Generate a token for the authenticated user
        const token = Jwt.sign({ _id: user._id }, "tukaram", { expiresIn: "7d" });
        res.cookie("token", token, { httpOnly: true });

        // Respond with user data and token
        res.status(200).send({
            message: "Login successful",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
            },
            token,
        });
    } catch (err) {
        console.error("[ERROR] Error in /login:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


main.post("/userprofile", userAuth, async (req, res) => {
    try {
        // Retrieve the user from the middleware
        const user = req.user;

        // Respond with the user profile
        res.status(200).send({
            message: "User profile retrieved successfully",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                address: user.address,
                age: user.age,
                gender: user.gender,
                phoneNo: user.phoneNo,
            },
        });
    } catch (err) {
        console.error("[ERROR] Error in /userprofile:", err);
        res.status(500).send({ message: "Internal Server Error", error: err.message });
    }
});

main.get("/feed", async (req, res) => {
    try {
        const { firstName } = req.query;
        debug("Feed query parameter:", { firstName });

        const user = await Usermodel.findOne({ firstName });
        debug("User retrieved for feed:", user);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ user });
    } catch (err) {
        console.error("[ERROR] Error in /feed:", err);
        res.status(500).send({ message: "Internal Server Error", error: err.message });
    }
});

// Connect to Database and Start Server
connectdb()
    .then(() => {
        main.listen(7777, () => {
            console.log("[INFO] Server is running on port 7777");
        });
        console.log("[INFO] Database is connected");
    })
    .catch((err) => {
        console.error("[ERROR] Failed to connect to the database:", err);
    });
