const jobsDOM = document.querySelector(".jobs");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".job-form");
const jobInputDOM = document.querySelector(".job-input");
const titleInputDOM = document.querySelector(".title-input");
const websiteInputDOM = document.querySelector(".website-input");
const countryInputDOM = document.querySelector(".country-input");
const formAlertDOM = document.querySelector(".form-alert");
// Load jobs from /api/jobs
const showJobs = async () => {
    loadingDOM.style.visibility = "visible";
    try {
        const {
            data: { jobs },
        } = await axios.get("/api/v1/jobs");
        if (jobs.length < 1) {
            jobsDOM.innerHTML =
                '<h5 class="empty-list">No jobs in your list</h5>';
            loadingDOM.style.visibility = "hidden";
            return;
        }
        const allJobs = jobs
            .map((job) => {
                const {
                    stage,
                    completed,
                    _id: jobID,
                    name,
                    website: url,
                } = job;
                let numString = completed ? false : stage;
                return `<div class="single-job  ${
                    completed && "job-completed-1"
                }">
                  <h5><span>${
                      numString
                          ? `<i class="fas fa-dice-${numString}"></i>`
                          : ""
                  }
                  ${numString ? "" : '<i class="far fa-check-circle"></i>'}
                  </span><a href="${url}" class="">${name}</a></h5>
                  <div class="job-links">
                    <!-- edit link -->
                    <a href="job.html?id=${jobID}"  class="edit-link">
                      <i class="fas fa-edit"></i>
                    </a>
                    <!-- delete btn -->
                    <button type="button" class="delete-btn" data-id="${jobID}">
                    <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>`;
            })
            .join("");
        jobsDOM.innerHTML = allJobs;
    } catch (error) {
        console.log(error);
        jobsDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>';
    }
    loadingDOM.style.visibility = "hidden";
};

showJobs();

// delete job /api/jobs/:id

jobsDOM.addEventListener("click", async (e) => {
    const el = e.target;
    if (el.parentElement.classList.contains("delete-btn")) {
        loadingDOM.style.visibility = "visible";
        const id = el.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/jobs/${id}`);
            showJobs();
        } catch (error) {
            console.log(error);
        }
    }
    loadingDOM.style.visibility = "hidden";
});

// form

formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = jobInputDOM.value;
    const title = titleInputDOM.value;
    const website = websiteInputDOM.value;
    const country = countryInputDOM.value;

    try {
        await axios.post("/api/v1/jobs", {
            name,
            title,
            website,
            country,
        });
        showJobs();

        jobInputDOM.value = "";
        titleInputDOM.value = "";
        websiteInputDOM.value = "";
        countryInputDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = `success, job added`;
        formAlertDOM.classList.add("text-success");
    } catch (error) {
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = `error, please try again`;
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});
