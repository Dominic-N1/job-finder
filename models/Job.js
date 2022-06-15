const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide name"],
        trim: true,
        maxlength: [35, "name can not be more that 35 characters"],
    },
    title: {
        type: String,
        required: [true, "must provide title"],
        trim: true,
        maxlength: [35, "name can not be more that 35 characters"],
    },
    completed: { type: Boolean, default: false },
    website: {
        type: String,
        required: [true, "must provide address"],
        trim: true,
    },
    country: {
        type: String,
        required: [true, "must provide Country name"],
        trim: true,
        maxlength: [35, "name can not be more that 35 characters"],
    },
    updated: { type: Date, default: Date.now },
    stage: { type: String, default: "one" },
});

module.exports = mongoose.model("Job", JobSchema);
