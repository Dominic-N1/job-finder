const express = require("express");
const router = express.Router();
const {
    getAllJobs,
    createJobs,
    getJob,
    updateJob,
    deleteJob,
} = require("../controler/jobs");

router.route("/").get(getAllJobs).post(createJobs);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
