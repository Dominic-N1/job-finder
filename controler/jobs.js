const Job = require("../models/Job");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllJobs = asyncWrapper(async (req, res) => {
    const jobs = await Job.find({});
    res.status(200).json({ jobs });
});

const createJobs = asyncWrapper(async (req, res) => {
    const job = await Job.create(req.body);
    res.status(201).json({ job });
});

const getJob = asyncWrapper(async (req, res, next) => {
    const { id: jobID } = req.params;
    const job = await Job.findOne({ _id: jobID.trim() });
    if (!job) {
        return next(createCustomError(`No job with ObjectId: ${jobID}`, 404));
    }
    res.status(200).json({ job });
});

const updateJob = asyncWrapper(async (req, res, next) => {
    const { id: jobID } = req.params;
    const job = await Job.findOneAndUpdate({ _id: jobID.trim() }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!job) {
        return next(createCustomError(`No job with ObjectId: ${jobID}`, 404));
    }
    res.status(200).json({ job });
});

const deleteJob = asyncWrapper(async (req, res, next) => {
    const { id: jobID } = req.params;
    const job = await Job.findOneAndDelete({ _id: jobID.trim() });
    if (!job) {
        return next(createCustomError(`No job with ObjectId: ${jobID}`, 404));
    }
    res.status(200).json({ job });
});

module.exports = {
    getAllJobs,
    createJobs,
    getJob,
    updateJob,
    deleteJob,
};
