const express = require("express");
const dbConnection = require("./db");
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const Hotel = require("./hotel.model");
const Food = require("./food.model");
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

const authenticate = async (req, res, next) => {
    const accessToken = req.headers["authorization"];

    if (!accessToken) {
        return res.status(401).send("Access Denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(accessToken, "pass");
        // console.log(decoded[0]._id);
        
        const user = await User.findById({ _id: decoded[0]._id });
        req.user = user;
        next();
    } catch (error) {
        // console.log(error);
        
        return res.status(400).send("Invalid Token.");
    }
};

app.post("/user", async (req, res) => {
    const { email, pass } = req.body;

    const user = await User.create({
        email: email,
        pass: pass,
    });

    res.json({
        success: true
    })
});

app.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    const user = await User.find(
        {
            email: email,
            pass: pass,
        },
        {
            pass: 0,
            __v: 0
        }
    );
    
    if (!user) {
        res.json({
            success: false,
        });
    }

    const token = jwt.sign(
        {
            ...user,
        },
        "pass",
        {
            expiresIn: "1D",
        }
    );

    res.json({
        success: true,
        token: token,
    });
});

app.post("/hotel", authenticate, async (req, res) => {
    const { name } = req.body;

    let id = getStrings(3, 1, 0) + getStrings(2, 0, 1);
    console.log(id);

    const hotel = new Hotel({
        id: id,
        name: name,
        user: req.user.id,
    });

    await hotel.save();

    const userId = hotel.id + getStrings(5, 0, 1);

    const user = await User.findOneAndUpdate(
        {
            email: req.user.email,
        },
        {
            id: userId,
            hotelId: hotel.id,
        }
    );

    res.json({
        success: true,
        hotel: hotel
    })
});

app.post('/food', authenticate, async(req, res) => {
    const {name} = req.body;
    const id = req.user.hotelId + getStrings(5, 0, 1);

    const food = new Food({
        id: id,
        name: name,
        hotel: req.user.hotelId
    })

    await food.save();

    res.json({
        success: true,
        data: food
    })
})

function getStrings(length, alps, nums) {
    let result = "";
    let characters = "";
    if (alps) {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (nums) {
        characters += "0123456789";
    }
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

dbConnection()
    .then(() => {
        app.listen(3005, () => {
            console.log("Server started at 3005");
        });
    })
    .catch((error) => {
        console.log("MongoDb connection failed: ", error);
    });
