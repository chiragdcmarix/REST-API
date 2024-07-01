import express, { response } from "express"
import userData from "../json_data/DATA.json" assert { type: 'json'}
import { writeFile } from "fs/promises";

const router = express.Router()

// API endpoint to get user data
router.get("/users", (req, res) => {
    return res.json(userData);
});

// Route to render the EJS page with user data
router.get("/get", (req, res) => {
    res.render("get", { userData })
})

// Route to render the form for adding a new user
router.get("/post", (req, res) => {
    res.render("post")
})

// API endpoint to handle POST request
router.post("/postData", async (req, res) => {
    const newUser = {
        id: userData.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    };
    userData.push(newUser);
    // Updating json file with new user 
    await writeFile("./json_data/Data.json", JSON.stringify(userData))
    res.redirect('/api/get')
    return res.json({ status: "done" })
})

router.get("/delete", async (req, res) => {
    if (userData.length > 0) {
        // Remove the first user from userData array
        userData.shift();
        // Updating json file with new user 
        await writeFile("./json_data/Data.json", JSON.stringify(userData))
        res.redirect('/api/get')
    }
    else {
        res.send("No users to delete !")
        
    }
})

export default router

