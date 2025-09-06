import express from "express";
import Country from "../models/Country.js";
import State from "../models/State.js";
import City from "../models/City.js";

const router = express.Router();

// Get all countries

router.post("/addcountry", async (req, res) => {
    try {
        const { sortname, name } = req.body;
        const exists = await Country.findOne({ name });
        if (exists) return res.status(400).json({ msg: "Country Name already registered" });

        const country = await Country.create({ sortname, name });


        res.status(201).json({
            success: true,
            country,

        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

router.post("/addstate", async (req, res) => {
    try {
        const { name, country_id } = req.body;
        const exists = await State.findOne({ name });
        if (exists) return res.status(400).json({ msg: "State Name already registered" });

        const state = await State.create({ name, country_id });


        res.status(201).json({
            success: true,
            state,

        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})


router.post("/addcity", async (req, res) => {
    try {
        const { name, state_id } = req.body;
        const exists = await City.findOne({ name });
        if (exists) return res.status(400).json({ msg: "city Name already registered" });

        const city = await City.create({ name, state_id });


        res.status(201).json({
            success: true,
            city,

        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

router.get("/countries", async (req, res) => {
    try {
        const countries = await Country.find();
        res.json({ success: true, countries });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching countries" });
    }
});

// Get states by country
router.get("/states/:countryId", async (req, res) => {
    try {
        const states = await State.find({ country_id: req.params.countryId });
        res.json({ success: true, states });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching states" });
    }
});

// Get cities by state
router.get("/cities/:stateId", async (req, res) => {
    try {
        const cities = await City.find({ state_id: req.params.stateId });
        res.json({ success: true, cities });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching cities" });
    }
});



export default router;
