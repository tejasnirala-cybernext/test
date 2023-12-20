const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')

const PORT = 8000
const app = express()

// Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/nodejs")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo error: ", err));

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["M", "F", "O"],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    }
}, {timestamps : true})

// Model
const User = mongoose.model("user", userSchema)

// Middlewares - Plugin
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    console.log("Hello from middleware 1")
    next();
})

app.use((req, res, next) => {
    console.log("Hello from middleware 2");
    fs.appendFile(
        'logs.log', 
        `\n${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`, 
        (req, res) => {
            next();
        }
    )
})

// Routes
app.get('/users', async (req, res) => {
    const dbUsers = await User.find({})
    const html = `
    <ul>
        ${dbUsers.map((user) => `<li>${user.firstName} ${user.lastName} - ${user.email}</li>`).join("")}
    </ul>
    `
    res.status(200).send(html)
})

app.route('/api/users')
    .get(async (req, res) => {
        // Get details of all users
        const dbUsers = await User.find({})
        return res.status(200).json(dbUsers);
    })
    .post(async (req, res) => {
        // Create new user
        try {
            const body = req.body;
            if(
                !body ||
                !body.first_name ||
                !body.last_name ||
                !body.gender ||
                !body.email ||
                !body.city
            ) {
                return res.status(400).json({ msg: "All fields are required..!"})
            }

            const result = await User.create({
                firstName: body.first_name,
                lastName: body.last_name,
                gender: body.gender,
                email: body.email,
                city: body.city
            })

            console.log("Result: ", result);
            return res.status(201).json({ msg: "User Created successfully."})

            // users.push({ ...body, id: users.length + 1 })
            // await fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, res) => {
            //     return res.json({ status: "success", id: users.length });
            // })
            
        } catch (error) {
            console.error("ERROR: ", error);
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    })

app.route('/api/users/:ID')
    .get(async (req, res) => {
        // Get the user with ID
        const user = await User.findById(req.params.ID)
        return res.json(user);
    })
    .patch(async (req, res) => {
        // Update the user with ID
        const key = req.body.key;
        const value = req.body.value;
        await User.findByIdAndUpdate(req.params.ID, { $set : { [key] : value }})
        return res.status(200).json({ status: `Updated ${req.body.key}` });
        
        // const city = req.body.city;
        // users[id - 1]["city"] = city;
        // fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users))
        // return res.json({ status: `Updated` });
    })
    .delete(async (req, res) => {
        // Delete the user with ID
        await User.findByIdAndDelete(req.params.ID)
        return res.status(200).json({ status: "User deleted successfully"})

        // const index = Number(req.params.ID - 1);
        // users.splice(index, 1);
        // fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users))
        // return res.json({ status: "Deleted" })
    })

app.listen(PORT, () => console.log(`Server started on PORT:${PORT} !`))
