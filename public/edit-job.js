const jobIDDOM = document.querySelector(".job-edit-id");
const jobNameDOM = document.querySelector(".job-edit-name");
const jobTitleDOM = document.querySelector(".job-edit-title");
const jobWebsiteDOM = document.querySelector(".job-edit-website");
const jobCountryDOM = document.querySelector(".job-edit-country");
const jobUpdateDOM = document.querySelector(".job-edit-update");
const jobFieldsetDOM = document.querySelector("fieldset");
const jobCompletedDOM = document.querySelector(".job-edit-completed");
const editFormDOM = document.querySelector(".single-job-form");
const editBtnDOM = document.querySelector(".job-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;

const dateTimeFormatFunction = function (updated) {
    return new Intl.DateTimeFormat(`${navigator.language}`, {
        dateStyle: "long",
        timeStyle: "long",
    }).format(new Date(updated));
};

const showJob = async () => {
    try {
        const {
            data: { job },
        } = await axios.get(`/api/v1/jobs/${id}`);

        const {
            _id: jobID,
            country,
            completed,
            name,
            updated,
            title,
            stage,
            website,
        } = job;
        jobIDDOM.textContent = jobID;
        jobNameDOM.value = name;
        jobTitleDOM.value = title;
        jobWebsiteDOM.value = website;
        jobCountryDOM.value = country;

        // stage

        jobUpdateDOM.textContent = dateTimeFormatFunction(updated);

        tempName = name;
        if (completed) {
            jobCompletedDOM.checked = true;
        }
    } catch (error) {
        console.log(error);
    }
};

showJob();

editFormDOM.addEventListener("submit", async (e) => {
    editBtnDOM.textContent = "Loading...";
    e.preventDefault();
    try {
        const data = [...new FormData(editFormDOM)];
        const [jobName, jobTitle, jobWebsite, jobCountry, jobStage] = data.map(
            (entry) => entry.at(1)
        );
        const jobCompleted = jobCompletedDOM.checked;
        const {
            data: { job },
        } = await axios.patch(`/api/v1/jobs/${id}`, {
            name: jobName,
            title: jobTitle,
            website: jobWebsite,
            country: jobCountry,
            stage: jobStage,
            completed: jobCompleted,
            updated: new Date(),
        });

        const {
            _id: jobID,
            completed,
            name,
            title,
            website,
            country,
            updated,
            stage,
        } = job;

        jobIDDOM.textContent = jobID;
        jobNameDOM.value = name;
        jobTitleDOM.value = title;
        jobWebsiteDOM.value = website;
        jobCountryDOM.value = country;
        jobUpdateDOM.textContent = dateTimeFormatFunction(updated);

        tempName = name;
        if (completed) {
            jobCompletedDOM.checked = true;
        }
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = `success, edited job`;
        formAlertDOM.classList.add("text-success");
    } catch (error) {
        jobNameDOM.value = tempName;
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = `error, please try again`;
    }
    editBtnDOM.textContent = "Edit";
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});
