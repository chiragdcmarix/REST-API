import express from "express"
import apiRoute from "./routes/api.route.js"
import homeroute from "./routes/home.route.js"


const app = express() 
const PORT = 8000

// middleware for handling post data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// setting static folder
app.use(express.static("public"))

// Setting view engine as ejs for SSR 
app.set("view engine", "ejs")

// Router level Middlewares 
app.use("/", homeroute)

app.use("/api", apiRoute)


//Middleware for handling wrong urls 
app.use((req, res) => {
    res.send("Page not found !")
})

app.listen(PORT, () => console.log("Server has started.")   )