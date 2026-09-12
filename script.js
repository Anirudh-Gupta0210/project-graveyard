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
// SEARCH PROJECTS
// =============================

function setupSearch() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("input", function () {

        const searchText = this.value.toLowerCase();

        const projects =
            document.querySelectorAll(".project-card");

        projects.forEach(function (project) {

            const projectText =
                project.innerText.toLowerCase();

            if (projectText.includes(searchText)) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }

        });

    });

}


// =============================
// FILTER PROJECTS BY CATEGORY
// =============================

function filterProjects(category, clickedButton) {

    const projects =
        document.querySelectorAll(".project-card");

    const filters =
        document.querySelectorAll(".filter");

    filters.forEach(function (button) {
        button.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    projects.forEach(function (project) {

        if (
            category === "all" ||
            project.dataset.category === category
        ) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }

    });

}


// =============================
// FILTER PROJECTS BY STATUS
// =============================

function filterByStatus(status, clickedButton) {

    const projects =
        document.querySelectorAll(".project-card");

    const statusFilters =
        document.querySelectorAll(".status-filter");

    statusFilters.forEach(function (button) {
        button.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    projects.forEach(function (project) {

        if (
            status === "all" ||
            project.dataset.status === status
        ) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }

    });

}


// =============================
// VIEW PROJECT
// =============================

function viewProject(projectId) {

    window.location.href =
        "project-details.html?id=" + projectId;

}


// =============================
// REVIVE PROJECT
// =============================

async function reviveProject(projectId, projectName) {

    try {

        await addDoc(
            collection(db, "revivalRequests"),
            {
                projectName: projectName,

                projectId: projectId,

                status: "pending",

                requestedAt: serverTimestamp()
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

function getDifficultyStars(difficulty) {

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
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeJS(text) {

    return String(text)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r");

}


// =============================
// MAKE FUNCTIONS AVAILABLE TO HTML
// =============================

window.filterProjects = filterProjects;

window.filterByStatus = filterByStatus;

window.viewProject = viewProject;

window.reviveProject = reviveProject;

window.setupSearch = setupSearch;

window.getDifficultyStars = getDifficultyStars;

window.escapeHTML = escapeHTML;

window.escapeJS = escapeJS;


// =============================
// START
// =============================

setupSearch();