// =============================
// PROJECT GRAVEYARD FUNCTIONALITY
// =============================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// =============================
// FILTER STATE
// =============================

let selectedCategory = "all";
let selectedStatus = "all";


// =============================
// QUICK SEARCH CHIPS
// =============================

function setupQuickSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    if (document.getElementById("quickSearch")) {
        return;
    }

    const quickSearch =
        document.createElement("div");

    quickSearch.id = "quickSearch";

    quickSearch.innerHTML = `
        <span class="quick-search-label">
            Quick search:
        </span>

        <button type="button" data-search="">
            All Projects
        </button>

        <button type="button" data-search="AI">
            🤖 AI / ML
        </button>

        <button type="button" data-search="Python">
            🐍 Python
        </button>

        <button type="button" data-search="JavaScript">
            💻 JavaScript
        </button>

        <button type="button" data-search="React">
            ⚛️ React
        </button>

        <button type="button" data-search="Firebase">
            🔥 Firebase
        </button>

        <button type="button" data-search="Web">
            🌐 Web
        </button>

        <button type="button" data-search="Mobile">
            📱 Mobile
        </button>
    `;

    searchInput.insertAdjacentElement(
        "afterend",
        quickSearch
    );


    // =============================
    // QUICK SEARCH STYLING
    // =============================

    const style =
        document.createElement("style");

    style.textContent = `

        #quickSearch {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 12px;
            margin-bottom: 4px;
        }

        .quick-search-label {
            color: #a9a7b2;
            font-size: 13px;
            margin-right: 4px;
        }

        #quickSearch button {
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(255,255,255,0.035);
            color: #b9b7c2;
            padding: 7px 12px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition:
                background 0.2s ease,
                border-color 0.2s ease,
                color 0.2s ease,
                transform 0.2s ease;
        }

        #quickSearch button:hover {
            background: rgba(190,30,60,0.12);
            border-color: rgba(220,55,80,0.45);
            color: #f2a1ad;
            transform: translateY(-1px);
        }

        #quickSearch button.active {
            background: rgba(190,30,60,0.18);
            border-color: #c51f43;
            color: #f3a1ad;
        }

        @media (max-width: 600px) {

            #quickSearch {
                gap: 6px;
            }

            .quick-search-label {
                width: 100%;
                margin-bottom: 2px;
            }

            #quickSearch button {
                font-size: 11px;
                padding: 7px 10px;
            }

        }

    `;

    document.head.appendChild(style);


    // =============================
    // CHIP CLICK EVENTS
    // =============================

    const chips =
        quickSearch.querySelectorAll("button");


    chips.forEach(function (chip) {

        chip.addEventListener("click", function () {

            const searchValue =
                this.dataset.search || "";


            // =============================
            // ALL PROJECTS
            // =============================

            if (searchValue === "") {

                searchInput.value = "";

                selectedCategory = "all";

                selectedStatus = "all";


                document
                    .querySelectorAll(".filter")
                    .forEach(function (button) {

                        button.classList.remove("active");

                    });


                const allCategory =
                    document.querySelector(
                        '.filter[onclick*="filterProjects(\'all\'"]'
                    );


                if (allCategory) {
                    allCategory.classList.add("active");
                }


                document
                    .querySelectorAll(".status-filter")
                    .forEach(function (button) {

                        button.classList.remove("active");

                    });


                const allStatus =
                    document.querySelector(
                        '.status-filter[onclick*="filterByStatus(\'all\'"]'
                    );


                if (allStatus) {
                    allStatus.classList.add("active");
                }

            }


            // =============================
            // WEB
            // =============================

            else if (searchValue === "Web") {

                searchInput.value = "";

                selectedCategory = "web";


                document
                    .querySelectorAll(".filter")
                    .forEach(function (button) {

                        button.classList.remove("active");

                    });


                const webButton =
                    document.querySelector(
                        '.filter[onclick*="filterProjects(\'web\'"]'
                    );


                if (webButton) {
                    webButton.classList.add("active");
                }

            }


            // =============================
            // MOBILE
            // =============================

            else if (searchValue === "Mobile") {

                searchInput.value = "";

                selectedCategory = "mobile";


                document
                    .querySelectorAll(".filter")
                    .forEach(function (button) {

                        button.classList.remove("active");

                    });


                const mobileButton =
                    document.querySelector(
                        '.filter[onclick*="filterProjects(\'mobile\'"]'
                    );


                if (mobileButton) {
                    mobileButton.classList.add("active");
                }

            }


            // =============================
            // AI / ML
            // =============================

            else if (searchValue === "AI") {

                searchInput.value = "";

                selectedCategory = "ai";


                document
                    .querySelectorAll(".filter")
                    .forEach(function (button) {

                        button.classList.remove("active");

                    });


                const aiButton =
                    document.querySelector(
                        '.filter[onclick*="filterProjects(\'ai\'"]'
                    );


                if (aiButton) {
                    aiButton.classList.add("active");
                }

            }


            // =============================
            // TECHNOLOGY SEARCH
            // =============================

            else {

                // IMPORTANT:
                // Technology searches such as React,
                // Python, JavaScript and Firebase
                // should search ALL categories.

                selectedCategory = "all";


                document
                    .querySelectorAll(".filter")
                    .forEach(function (button) {

                        button.classList.remove("active");

                    });


                const allCategory =
                    document.querySelector(
                        '.filter[onclick*="filterProjects(\'all\'"]'
                    );


                if (allCategory) {
                    allCategory.classList.add("active");
                }


                searchInput.value =
                    searchValue;

            }


            // =============================
            // ACTIVE CHIP
            // =============================

            chips.forEach(function (button) {

                button.classList.remove("active");

            });


            this.classList.add("active");


            applyProjectFilters();

        });

    });

}


// =============================
// SMART SEARCH PROJECTS
// =============================

function setupSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener(
        "input",
        function () {

            document
                .querySelectorAll("#quickSearch button")
                .forEach(function (button) {

                    button.classList.remove("active");

                });

            applyProjectFilters();

        }
    );

}


// =============================
// COMBINED PROJECT FILTERING
// =============================

function applyProjectFilters() {

    const searchInput =
        document.getElementById("searchInput");

    const searchText =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    const projects =
        document.querySelectorAll(".project-card");


    let visibleProjects = 0;


    projects.forEach(function (project) {

        const projectText =
            project.innerText.toLowerCase();


        const category =
            (project.dataset.category || "")
                .toLowerCase();


        const status =
            (project.dataset.status || "")
                .toLowerCase();


        const searchableText =
            projectText +
            " " +
            category +
            " " +
            status;


        let matchesSearch = true;


        if (searchText !== "") {

            const searchWords =
                searchText.split(/\s+/);


            matchesSearch =
                searchWords.every(
                    function (word) {

                        return searchableText
                            .includes(word);

                    }
                );

        }


        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        const matchesStatus =
            selectedStatus === "all" ||
            status === selectedStatus;


        if (
            matchesSearch &&
            matchesCategory &&
            matchesStatus
        ) {

            project.style.display = "block";

            visibleProjects++;

        } else {

            project.style.display = "none";

        }

    });


    // =============================
    // NO RESULTS MESSAGE
    // =============================

    const projectGrid =
        document.getElementById("projectGrid");


    if (!projectGrid) {
        return;
    }


    const oldMessage =
        projectGrid.querySelector(
            ".no-search-results"
        );


    if (oldMessage) {
        oldMessage.remove();
    }


    if (
        projects.length > 0 &&
        visibleProjects === 0
    ) {

        const noResults =
            document.createElement("div");


        noResults.className =
            "no-projects no-search-results";


        const searchDisplay =
            searchText
                ? `"${searchText}"`
                : "your selected filters";


        noResults.innerHTML = `

            <div class="tombstone">
                ⚰️
            </div>

            <h2>
                ☠️ No Projects Found
            </h2>

            <p>
                We couldn't find any projects
                matching ${searchDisplay}.
            </p>

            <p>
                Try another search or clear
                your filters.
            </p>

            <button
                class="view-btn"
                onclick="clearProjectFilters()"
                style="margin-top: 15px;"
            >
                🔄 Clear Filters
            </button>

        `;


        projectGrid.appendChild(
            noResults
        );

    }

}


// =============================
// CLEAR ALL FILTERS
// =============================

function clearProjectFilters() {

    const searchInput =
        document.getElementById("searchInput");


    if (searchInput) {
        searchInput.value = "";
    }


    selectedCategory = "all";

    selectedStatus = "all";


    document
        .querySelectorAll(".filter")
        .forEach(function (button) {

            button.classList.remove("active");

        });


    const allCategory =
        document.querySelector(
            '.filter[onclick*="filterProjects(\'all\'"]'
        );


    if (allCategory) {
        allCategory.classList.add("active");
    }


    document
        .querySelectorAll(".status-filter")
        .forEach(function (button) {

            button.classList.remove("active");

        });


    const allStatus =
        document.querySelector(
            '.status-filter[onclick*="filterByStatus(\'all\'"]'
        );


    if (allStatus) {
        allStatus.classList.add("active");
    }


    document
        .querySelectorAll("#quickSearch button")
        .forEach(function (button) {

            button.classList.remove("active");

        });


    const allProjectsChip =
        document.querySelector(
            '#quickSearch button[data-search=""]'
        );


    if (allProjectsChip) {
        allProjectsChip.classList.add("active");
    }


    applyProjectFilters();

}


// =============================
// FILTER PROJECTS BY CATEGORY
// =============================

function filterProjects(
    category,
    clickedButton
) {

    selectedCategory = category;


    document
        .querySelectorAll(".filter")
        .forEach(function (button) {

            button.classList.remove("active");

        });


    if (clickedButton) {
        clickedButton.classList.add("active");
    }


    applyProjectFilters();

}


// =============================
// FILTER PROJECTS BY STATUS
// =============================

function filterByStatus(
    status,
    clickedButton
) {

    selectedStatus = status;


    document
        .querySelectorAll(".status-filter")
        .forEach(function (button) {

            button.classList.remove("active");

        });


    if (clickedButton) {
        clickedButton.classList.add("active");
    }


    applyProjectFilters();

}


// =============================
// VIEW PROJECT
// =============================

function viewProject(projectId) {

    window.location.href =
        "project-details.html?id=" +
        projectId;

}


// =============================
// REVIVE PROJECT
// =============================

async function reviveProject(
    projectId,
    projectName
) {

    try {

        await addDoc(
            collection(
                db,
                "revivalRequests"
            ),
            {
                projectName:
                    projectName,

                projectId:
                    projectId,

                status:
                    "pending",

                requestedAt:
                    serverTimestamp()
            }
        );


        alert(
            "🧟 Revival Request Sent!\n\n" +
            projectName +
            " has been added to the revival requests."
        );


    } catch (error) {

        console.error(
            "Error sending revival request:",
            error
        );


        alert(
            "❌ Could not send revival request.\n\n" +
            "Please try again."
        );

    }

}


// =============================
// DIFFICULTY STARS
// =============================

function getDifficultyStars(
    difficulty
) {

    if (difficulty === "easy") {
        return "⭐";
    }

    if (difficulty === "medium") {
        return "⭐⭐";
    }

    if (difficulty === "hard") {
        return "⭐⭐⭐";
    }

    return "❓";

}


// =============================
// SECURITY HELPERS
// =============================

function escapeHTML(text) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeJS(text) {

    return String(text)

        .replace(
            /\\/g,
            "\\\\"
        )

        .replace(
            /'/g,
            "\\'"
        )

        .replace(
            /\n/g,
            "\\n"
        )

        .replace(
            /\r/g,
            "\\r"
        );

}


// =============================
// MAKE FUNCTIONS AVAILABLE TO HTML
// =============================

window.filterProjects =
    filterProjects;

window.filterByStatus =
    filterByStatus;

window.viewProject =
    viewProject;

window.reviveProject =
    reviveProject;

window.setupSearch =
    setupSearch;

window.getDifficultyStars =
    getDifficultyStars;

window.escapeHTML =
    escapeHTML;

window.escapeJS =
    escapeJS;

window.applyProjectFilters =
    applyProjectFilters;

window.clearProjectFilters =
    clearProjectFilters;


// =============================
// START
// =============================

setupSearch();

setupQuickSearch();