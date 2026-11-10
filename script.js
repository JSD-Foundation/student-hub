/* ============================================================
   EDUSPHERE ACADEMIC MANAGEMENT PORTAL
   Frontend / localStorage version
============================================================ */


/* ============================================================
   STORAGE
============================================================ */

const STORAGE_KEY = "edusphere_database_v3";
const SESSION_KEY = "edusphere_session";


/* ============================================================
   DEFAULT DATABASE
============================================================ */

const defaultDatabase = {

    admin: {
        username: "Jashan",
        password: "123456",
        name: "Jashan"
    },

    students: [
        {
            id: "ST001",
            name: "Aman Kumar",
            roll: "BCA001",
            password: "student123",
            email: "aman@example.com",
            phone: "9876543210",
            course: "BCA (AI-ML)",
            semester: "3",
            section: "A",
            mentorId: "T001",

            fees: {
                total: 90000,
                paid: 60000,
                pending: 30000
            },

            subjects: [
                {
                    id: "SUB001",
                    name: "Web Technologies",
                    code: "WT",
                    credits: 4,
                    marks: 82,
                    grade: "A"
                },
                {
                    id: "SUB002",
                    name: "Logic Building",
                    code: "LB",
                    credits: 4,
                    marks: 76,
                    grade: "B+"
                },
                {
                    id: "SUB003",
                    name: "Python Programming",
                    code: "PY",
                    credits: 4,
                    marks: 88,
                    grade: "A+"
                }
            ],

            sgpa: 8.2,
            cgpa: 8.0
        },

        {
            id: "ST002",
            name: "Simran Kaur",
            roll: "BCA002",
            password: "student123",
            email: "simran@example.com",
            phone: "9876543211",
            course: "BCA (AI-ML)",
            semester: "3",
            section: "A",
            mentorId: "T001",

            fees: {
                total: 90000,
                paid: 75000,
                pending: 15000
            },

            subjects: [
                {
                    id: "SUB001",
                    name: "Web Technologies",
                    code: "WT",
                    credits: 4,
                    marks: 90,
                    grade: "A+"
                },
                {
                    id: "SUB002",
                    name: "Logic Building",
                    code: "LB",
                    credits: 4,
                    marks: 84,
                    grade: "A"
                }
            ],

            sgpa: 8.7,
            cgpa: 8.5
        },

        {
            id: "ST003",
            name: "Rahul Singh",
            roll: "AIDS001",
            password: "student123",
            email: "rahul@example.com",
            phone: "9876543212",
            course: "BCA (AI-DS)",
            semester: "3",
            section: "B",
            mentorId: "T002",

            fees: {
                total: 90000,
                paid: 50000,
                pending: 40000
            },

            subjects: [
                {
                    id: "SUB004",
                    name: "Data Analytics",
                    code: "DA",
                    credits: 4,
                    marks: 78,
                    grade: "B+"
                },
                {
                    id: "SUB005",
                    name: "Database Systems",
                    code: "DB",
                    credits: 4,
                    marks: 81,
                    grade: "A"
                }
            ],

            sgpa: 8.1,
            cgpa: 7.9
        }
    ],

    teachers: [

        {
            id: "T001",
            name: "Dr. Neha Sharma",
            username: "neha",
            password: "teacher123",
            email: "neha@example.com",
            role: "mentor",
            department: "Computer Science",

            subjects: [
                "SUB001",
                "SUB002"
            ],

            maxStudents: 40
        },

        {
            id: "T002",
            name: "Mr. Arjun Mehta",
            username: "arjun",
            password: "teacher123",
            email: "arjun@example.com",
            role: "teacher",
            department: "Artificial Intelligence",

            subjects: [
                "SUB004",
                "SUB005"
            ],

            maxStudents: 40
        }
    ],

    subjects: [

        {
            id: "SUB001",
            name: "Web Technologies",
            code: "WT",
            course: "BCA (AI-ML)",
            semester: "3",
            credits: 4
        },

        {
            id: "SUB002",
            name: "Logic Building",
            code: "LB",
            course: "BCA (AI-ML)",
            semester: "3",
            credits: 4
        },

        {
            id: "SUB003",
            name: "Python Programming",
            code: "PY",
            course: "BCA (AI-ML)",
            semester: "3",
            credits: 4
        },

        {
            id: "SUB004",
            name: "Data Analytics",
            code: "DA",
            course: "BCA (AI-DS)",
            semester: "3",
            credits: 4
        },

        {
            id: "SUB005",
            name: "Database Systems",
            code: "DB",
            course: "BCA (AI-DS)",
            semester: "3",
            credits: 4
        }
    ],

    attendance: {},

    notices: [
        {
            id: "N001",
            title: "Welcome to EduSphere",
            message: "Academic portal is ready for students, teachers and mentors.",
            date: new Date().toISOString()
        }
    ]

};


/* ============================================================
   DATABASE
============================================================ */

let db = loadDatabase();

let session = loadSession();

let currentPage = "dashboard";


function loadDatabase() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultDatabase)
        );

        return structuredClone(defaultDatabase);
    }

    try {

        const parsed = JSON.parse(saved);

        return {
            ...structuredClone(defaultDatabase),
            ...parsed
        };

    } catch {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultDatabase)
        );

        return structuredClone(defaultDatabase);
    }
}


function saveDatabase() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(db)
    );
}


function loadSession() {

    const saved = sessionStorage.getItem(SESSION_KEY);

    if (!saved) return null;

    try {
        return JSON.parse(saved);
    } catch {
        return null;
    }
}


function saveSession() {

    sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session)
    );
}


function clearSession() {

    sessionStorage.removeItem(SESSION_KEY);

    session = null;
}


/* ============================================================
   HELPERS
============================================================ */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function generateId(prefix) {

    return prefix +
        Date.now() +
        Math.random()
            .toString(36)
            .substring(2, 7);
}


function initials(name) {

    return String(name)
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(x => x[0])
        .join("")
        .toUpperCase();
}


function getStudent(id) {

    return db.students.find(
        student => student.id === id
    );
}


function getTeacher(id) {

    return db.teachers.find(
        teacher => teacher.id === id
    );
}


function getSubject(id) {

    return db.subjects.find(
        subject => subject.id === id
    );
}


function getMentorStudents(teacherId) {

    return db.students.filter(
        student => student.mentorId === teacherId
    );
}


function formatCurrency(value) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(Number(value) || 0);
}


function formatDate(date) {

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


function calculateAttendance(studentId, subjectId = null) {

    const records = Object.values(
        db.attendance
    );

    const filtered = records.filter(record => {

        if (record.studentId !== studentId) {
            return false;
        }

        if (
            subjectId &&
            record.subjectId !== subjectId
        ) {
            return false;
        }

        return true;
    });

    if (!filtered.length) return 0;

    const present = filtered.filter(
        record => record.status === "present"
    ).length;

    return Math.round(
        present / filtered.length * 100
    );
}


function gradeFromMarks(marks) {

    marks = Number(marks);

    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";

    return "F";
}


function calculateSGPA(student) {

    if (!student.subjects.length) {
        return 0;
    }

    let totalCredits = 0;
    let totalPoints = 0;

    student.subjects.forEach(subject => {

        const credits = Number(subject.credits) || 0;

        const marks = Number(subject.marks) || 0;

        let point = 0;

        if (marks >= 90) point = 10;
        else if (marks >= 80) point = 9;
        else if (marks >= 70) point = 8;
        else if (marks >= 60) point = 7;
        else if (marks >= 50) point = 6;
        else if (marks >= 40) point = 5;

        totalCredits += credits;
        totalPoints += point * credits;
    });

    if (!totalCredits) return 0;

    return Number(
        (totalPoints / totalCredits).toFixed(2)
    );
}


/* ============================================================
   LOGIN
============================================================ */

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const role =
            document.getElementById("loginRole").value;

        const username =
            document.getElementById("loginUsername").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        let authenticated = false;

        if (role === "admin") {

            if (
                username === db.admin.username &&
                password === db.admin.password
            ) {

                session = {
                    role: "admin",
                    id: "ADMIN",
                    name: db.admin.name
                };

                authenticated = true;
            }
        }

        else if (role === "student") {

            const student =
                db.students.find(
                    s =>
                        s.roll.toLowerCase() ===
                        username.toLowerCase() &&
                        s.password === password
                );

            if (student) {

                session = {
                    role: "student",
                    id: student.id,
                    name: student.name
                };

                authenticated = true;
            }
        }

        else if (role === "teacher") {

            const teacher =
                db.teachers.find(
                    t =>
                        t.username.toLowerCase() ===
                        username.toLowerCase() &&
                        t.password === password
                );

            if (teacher) {

                session = {
                    role: "teacher",
                    id: teacher.id,
                    name: teacher.name
                };

                authenticated = true;
            }
        }


        if (!authenticated) {

            loginMessage.textContent =
                "Invalid login credentials.";

            loginMessage.style.color =
                "var(--danger)";

            return;
        }

        saveSession();

        loginMessage.textContent = "";

        initializeApplication();
    }
);


/* ============================================================
   PASSWORD TOGGLE
============================================================ */

document
    .getElementById("togglePassword")
    .addEventListener(
        "click",
        function() {

            const input =
                document.getElementById("loginPassword");

            const icon =
                this.querySelector("i");

            if (input.type === "password") {

                input.type = "text";

                icon.className =
                    "fa-solid fa-eye-slash";

            } else {

                input.type = "password";

                icon.className =
                    "fa-solid fa-eye";
            }
        }
    );


/* ============================================================
   APPLICATION INIT
============================================================ */

function initializeApplication() {

    document
        .getElementById("loginScreen")
        .classList.add("hidden");

    document
        .getElementById("app")
        .classList.remove("hidden");

    setupUserInterface();

    renderSidebar();

    navigateTo(
        session.role === "admin"
            ? "dashboard"
            : session.role === "teacher"
                ? "teacherDashboard"
                : "dashboard"
    );
}


function setupUserInterface() {

    const name =
        session.name;

    const role =
        session.role;

    document.getElementById(
        "sidebarName"
    ).textContent = name;

    document.getElementById(
        "topbarName"
    ).textContent = name;

    document.getElementById(
        "sidebarRole"
    ).textContent =
        roleLabel(role);

    document.getElementById(
        "topbarRole"
    ).textContent =
        roleLabel(role);

    const initialsText =
        initials(name);

    document.getElementById(
        "sidebarAvatar"
    ).textContent =
        initialsText;

    document.getElementById(
        "topbarAvatar"
    ).textContent =
        initialsText;
}


function roleLabel(role) {

    if (role === "admin") {
        return "Administrator";
    }

    if (role === "teacher") {
        const teacher = getTeacher(session.id);

        return teacher?.role === "mentor"
            ? "Mentor"
            : "Teacher";
    }

    return "Student";
}


/* ============================================================
   SIDEBAR
============================================================ */

function renderSidebar() {

    const nav =
        document.getElementById("sidebarNav");

    let items = [];

    if (session.role === "admin") {

        items = [

            ["dashboard", "Dashboard", "fa-chart-pie"],

            ["students", "Students", "fa-user-graduate"],

            ["resection", "Re-Sectioning", "fa-users-gear"],

            ["teachers", "Teachers & Mentors", "fa-chalkboard-user"],

            ["subjects", "Subjects", "fa-book-open"],

            ["attendance", "Attendance", "fa-calendar-check"],

            ["fees", "Student Fees", "fa-money-bill-wave"],

            ["results", "Results / SGPA", "fa-chart-line"],

            ["notices", "Notices", "fa-bullhorn"]

        ];

    }

    else if (session.role === "teacher") {

        items = [

            ["teacherDashboard", "Dashboard", "fa-chart-pie"],

            ["teacherStudents", "My Students", "fa-user-graduate"],

            ["sections", "Sections", "fa-users"],

            ["markAttendance", "Mark Attendance", "fa-calendar-check"],

            ["teacherSubjects", "My Subjects", "fa-book-open"]

        ];

    }

    else {

        items = [

            ["dashboard", "Dashboard", "fa-chart-pie"],

            ["studentProfile", "My Profile", "fa-user"],

            ["studentSubjects", "My Subjects", "fa-book-open"],

            ["studentAttendance", "Attendance", "fa-calendar-check"],

            ["studentResults", "Results / SGPA", "fa-chart-line"],

            ["studentFees", "Fees", "fa-money-bill-wave"],

            ["studentNotices", "Notices", "fa-bullhorn"]

        ];

    }


    nav.innerHTML =
        items.map(item => {

            return `
                <button
                    class="nav-item"
                    data-page="${item[0]}"
                    onclick="navigateTo('${item[0]}')"
                >
                    <i class="fa-solid ${item[2]}"></i>
                    <span>${item[1]}</span>
                </button>
            `;

        }).join("");
}


/* ============================================================
   NAVIGATION
============================================================ */

function navigateTo(page) {

    currentPage = page;

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.page === page
            );

        });

    const titles = {

        dashboard: [
            "Dashboard",
            "Academic management overview"
        ],

        students: [
            "Students",
            "Manage all student records"
        ],

        resection: [
            "Re-Sectioning",
            "Assign students to sections"
        ],

        teachers: [
            "Teachers & Mentors",
            "Manage teaching staff"
        ],

        subjects: [
            "Subjects",
            "Manage academic subjects"
        ],

        attendance: [
            "Attendance",
            "Monitor daily attendance"
        ],

        fees: [
            "Student Fees",
            "Manage student fee records"
        ],

        results: [
            "Results / SGPA",
            "Manage academic performance"
        ],

        notices: [
            "Notices",
            "Manage academic announcements"
        ],

        teacherDashboard: [
            "Teacher Dashboard",
            "Teaching and mentoring overview"
        ],

        teacherStudents: [
            "My Students",
            "Students assigned to you"
        ],

        sections: [
            "Sections",
            "Manage your student sections"
        ],

        markAttendance: [
            "Mark Attendance",
            "Daily subject-wise attendance"
        ],

        teacherSubjects: [
            "My Subjects",
            "Subjects assigned to you"
        ],

        studentProfile: [
            "My Profile",
            "Your academic profile"
        ],

        studentSubjects: [
            "My Subjects",
            "Your registered subjects"
        ],

        studentAttendance: [
            "Attendance",
            "Your daily attendance"
        ],

        studentResults: [
            "Results / SGPA",
            "Your academic results"
        ],

        studentFees: [
            "Fees",
            "Your fee status"
        ],

        studentNotices: [
            "Notices",
            "Latest announcements"
        ]

    };

    const title =
        titles[page] ||
        ["Dashboard", "Academic portal"];

    document.getElementById(
        "pageTitle"
    ).textContent = title[0];

    document.getElementById(
        "pageSubtitle"
    ).textContent = title[1];

    renderPage(page);

    document
        .getElementById("sidebar")
        .classList.remove("open");
}


/* ============================================================
   PAGE RENDERER
============================================================ */

function renderPage(page) {

    const container =
        document.getElementById("contentArea");

    switch (page) {

        case "dashboard":
            if (session.role === "admin") {
                renderAdminDashboard(container);
            } else {
                renderStudentDashboard(container);
            }
            break;

        case "students":
            renderStudentsPage(container);
            break;

        case "resection":
            renderResectionPage(container);
            break;

        case "teachers":
            renderTeachersPage(container);
            break;

        case "subjects":
            renderSubjectsPage(container);
            break;

        case "attendance":
            renderAdminAttendancePage(container);
            break;

        case "fees":
            renderFeesPage(container);
            break;

        case "results":
            renderResultsPage(container);
            break;

        case "notices":
            renderNoticesPage(container);
            break;

        case "teacherDashboard":
            renderTeacherDashboard(container);
            break;

        case "teacherStudents":
            renderTeacherStudents(container);
            break;

        case "sections":
            renderTeacherSections(container);
            break;

        case "markAttendance":
            renderMarkAttendance(container);
            break;

        case "teacherSubjects":
            renderTeacherSubjects(container);
            break;

        case "studentProfile":
            renderStudentProfile(container);
            break;

        case "studentSubjects":
            renderStudentSubjects(container);
            break;

        case "studentAttendance":
            renderStudentAttendance(container);
            break;

        case "studentResults":
            renderStudentResults(container);
            break;

        case "studentFees":
            renderStudentFees(container);
            break;

        case "studentNotices":
            renderStudentNotices(container);
            break;

        default:
            renderStudentDashboard(container);
    }
}


/* ============================================================
   ADMIN DASHBOARD
============================================================ */

function renderAdminDashboard(container) {

    const pendingFees =
        db.students.reduce(
            (sum, student) =>
                sum + Number(student.fees.pending || 0),
            0
        );

    container.innerHTML = `

        <div class="welcome-banner">

            <div>
                <h2>Welcome, ${escapeHTML(db.admin.name)} 👋</h2>

                <p>
                    Manage students, teachers, mentors,
                    attendance, fees and academic results.
                </p>
            </div>

            <img
                class="welcome-image"
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80"
            >

        </div>


        <div class="stats-grid">

            ${statCard(
                "Students",
                db.students.length,
                "fa-user-graduate"
            )}

            ${statCard(
                "Teachers / Mentors",
                db.teachers.length,
                "fa-chalkboard-user"
            )}

            ${statCard(
                "Subjects",
                db.subjects.length,
                "fa-book-open"
            )}

            ${statCard(
                "Pending Fees",
                formatCurrency(pendingFees),
                "fa-money-bill-wave"
            )}

        </div>


        <div class="card">

            <div class="card-header">

                <div>
                    <h3>Admin Controls</h3>
                    <p>
                        Select a module to manage the portal.
                    </p>
                </div>

            </div>

            <div class="card-body">

                <div class="quick-grid">

                    ${quickAction(
                        "students",
                        "fa-user-plus",
                        "Student Management",
                        "Add, edit and delete students"
                    )}

                    ${quickAction(
                        "resection",
                        "fa-users-gear",
                        "Re-Section Students",
                        "Assign students to sections"
                    )}

                    ${quickAction(
                        "teachers",
                        "fa-chalkboard-user",
                        "Teachers & Mentors",
                        "Manage staff accounts"
                    )}

                    ${quickAction(
                        "attendance",
                        "fa-calendar-check",
                        "Attendance",
                        "View and manage attendance"
                    )}

                    ${quickAction(
                        "fees",
                        "fa-money-bill-wave",
                        "Student Fees",
                        "Manage fee records"
                    )}

                    ${quickAction(
                        "results",
                        "fa-chart-line",
                        "Results",
                        "Manage SGPA and CGPA"
                    )}

                </div>

            </div>

        </div>

    `;
}


function statCard(value, label, icon) {

    return `

        <div class="stat-card">

            <div class="stat-icon">
                <i class="fa-solid ${icon}"></i>
            </div>

            <div>
                <h3>${value}</h3>
                <p>${label}</p>
            </div>

        </div>

    `;
}


function quickAction(
    page,
    icon,
    title,
    description
) {

    return `

        <button
            class="quick-action"
            onclick="navigateTo('${page}')"
        >

            <i class="fa-solid ${icon}"></i>

            <strong>${title}</strong>

            <span>${description}</span>

        </button>

    `;
}


/* ============================================================
   STUDENT DASHBOARD
============================================================ */

function renderStudentDashboard(container) {

    const student =
        getStudent(session.id);

    if (!student) return logout();

    const attendance =
        calculateAttendance(student.id);

    container.innerHTML = `

        <div class="welcome-banner">

            <div>

                <h2>
                    Welcome, ${escapeHTML(student.name)} 👋
                </h2>

                <p>
                    ${escapeHTML(student.course)}
                    · Semester ${escapeHTML(student.semester)}
                    · Section ${escapeHTML(student.section)}
                </p>

            </div>

            <img
                class="welcome-image"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80"
            >

        </div>


        <div class="stats-grid">

            ${statCard(
                `${attendance}%`,
                "Overall Attendance",
                "fa-calendar-check"
            )}

            ${statCard(
                student.sgpa,
                "Current SGPA",
                "fa-chart-line"
            )}

            ${statCard(
                student.cgpa,
                "Current CGPA",
                "fa-graduation-cap"
            )}

            ${statCard(
                formatCurrency(student.fees.pending),
                "Pending Fees",
                "fa-money-bill-wave"
            )}

        </div>


        <div class="two-column">

            <div class="card">

                <div class="card-header">
                    <div>
                        <h3>Academic Information</h3>
                        <p>Your current academic details</p>
                    </div>
                </div>

                <div class="card-body">

                    <table class="data-table">

                        <tr>
                            <td><strong>Roll Number</strong></td>
                            <td>${escapeHTML(student.roll)}</td>
                        </tr>

                        <tr>
                            <td><strong>Course</strong></td>
                            <td>${escapeHTML(student.course)}</td>
                        </tr>

                        <tr>
                            <td><strong>Semester</strong></td>
                            <td>${escapeHTML(student.semester)}</td>
                        </tr>

                        <tr>
                            <td><strong>Section</strong></td>
                            <td>
                                <span class="badge badge-primary">
                                    ${escapeHTML(student.section)}
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td><strong>Mentor</strong></td>
                            <td>
                                ${
                                    escapeHTML(
                                        getTeacher(student.mentorId)?.name ||
                                        "Not Assigned"
                                    )
                                }
                            </td>
                        </tr>

                    </table>

                </div>

            </div>


            <div class="card">

                <div class="card-header">

                    <div>
                        <h3>Attendance</h3>
                        <p>Overall attendance percentage</p>
                    </div>

                </div>

                <div class="card-body">

                    <h2>${attendance}%</h2>

                    <div class="progress" style="margin-top:15px;">
                        <div
                            class="progress-bar"
                            style="width:${attendance}%"
                        ></div>
                    </div>

                    <p style="margin-top:15px;color:var(--muted);">
                        Attendance is updated by subject teachers.
                    </p>

                </div>

            </div>

        </div>

    `;
}


/* ============================================================
   ADMIN STUDENTS
============================================================ */

function renderStudentsPage(container) {

    container.innerHTML = `

        <div class="toolbar">

            <div class="search-box">

                <i class="fa-solid fa-search"></i>

                <input
                    id="studentSearch"
                    placeholder="Search student..."
                    oninput="filterStudentTable()"
                >

            </div>

            <div class="filter-row">

                <select
                    id="studentCourseFilter"
                    onchange="filterStudentTable()"
                >
                    <option value="">All Courses</option>
                    ${courseOptions()}
                </select>

                <select
                    id="studentSectionFilter"
                    onchange="filterStudentTable()"
                >
                    <option value="">All Sections</option>
                    ${sectionOptions()}
                </select>

                <button
                    class="btn btn-primary"
                    onclick="openStudentModal()"
                >
                    <i class="fa-solid fa-plus"></i>
                    Add Student
                </button>

            </div>

        </div>


        <div class="card">

            <div class="card-header">

                <div>
                    <h3>Student Management</h3>
                    <p>
                        Add, edit, delete and assign students.
                    </p>
                </div>

                <span class="badge badge-primary">
                    ${db.students.length} Students
                </span>

            </div>

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Student</th>
                            <th>Roll Number</th>
                            <th>Course</th>
                            <th>Semester</th>
                            <th>Section</th>
                            <th>Mentor</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody id="studentTableBody">

                        ${studentRows(db.students)}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


function studentRows(students) {

    if (!students.length) {

        return `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <i class="fa-solid fa-user-slash"></i>
                        <p>No students found.</p>
                    </div>
                </td>
            </tr>
        `;
    }

    return students.map(student => {

        const mentor =
            getTeacher(student.mentorId);

        return `

            <tr>

                <td>

                    <strong>
                        ${escapeHTML(student.name)}
                    </strong>

                    <br>

                    <small style="color:var(--muted)">
                        ${escapeHTML(student.email)}
                    </small>

                </td>

                <td>
                    ${escapeHTML(student.roll)}
                </td>

                <td>
                    ${escapeHTML(student.course)}
                </td>

                <td>
                    ${escapeHTML(student.semester)}
                </td>

                <td>
                    <span class="badge badge-primary">
                        ${escapeHTML(student.section)}
                    </span>
                </td>

                <td>
                    ${escapeHTML(
                        mentor?.name || "Not Assigned"
                    )}
                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn action-view"
                            title="View"
                            onclick="viewStudent('${student.id}')"
                        >
                            <i class="fa-solid fa-eye"></i>
                        </button>

                        <button
                            class="action-btn action-edit"
                            title="Edit"
                            onclick="openStudentModal('${student.id}')"
                        >
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <button
                            class="action-btn action-delete"
                            title="Delete"
                            onclick="deleteStudent('${student.id}')"
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>

                    </div>

                </td>

            </tr>
        `;

    }).join("");
}


function filterStudentTable() {

    const search =
        document
            .getElementById("studentSearch")
            ?.value
            .toLowerCase() || "";

    const course =
        document
            .getElementById("studentCourseFilter")
            ?.value || "";

    const section =
        document
            .getElementById("studentSectionFilter")
            ?.value || "";

    const filtered =
        db.students.filter(student => {

            const text =
                `${student.name} ${student.roll} ${student.email}`
                    .toLowerCase();

            return (
                text.includes(search) &&
                (!course || student.course === course) &&
                (!section || student.section === section)
            );
        });

    const tbody =
        document.getElementById("studentTableBody");

    if (tbody) {
        tbody.innerHTML =
            studentRows(filtered);
    }
}


/* ============================================================
   STUDENT MODAL
============================================================ */

function openStudentModal(studentId = null) {

    const student =
        studentId
            ? getStudent(studentId)
            : null;

    openModal(
        student
            ? "Edit Student"
            : "Add Student",

        student
            ? "Update student information"
            : "Create a new student account",

        `

        <form
            onsubmit="saveStudent(event, '${studentId || ""}')"
        >

            <div class="form-grid">

                <div class="form-group">
                    <label>Full Name</label>

                    <input
                        name="name"
                        required
                        value="${escapeHTML(student?.name || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Roll Number</label>

                    <input
                        name="roll"
                        required
                        value="${escapeHTML(student?.roll || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Password</label>

                    <input
                        name="password"
                        required
                        value="${escapeHTML(student?.password || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value="${escapeHTML(student?.email || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Phone</label>

                    <input
                        name="phone"
                        value="${escapeHTML(student?.phone || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Course</label>

                    <select name="course" required>

                        ${courseOptions(
                            student?.course
                        )}

                    </select>
                </div>

                <div class="form-group">
                    <label>Semester</label>

                    <select name="semester">

                        ${[1,2,3,4,5,6,7,8]
                            .map(
                                semester => `
                                    <option
                                        ${
                                            String(semester) ===
                                            String(student?.semester)
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        ${semester}
                                    </option>
                                `
                            )
                            .join("")
                        }

                    </select>
                </div>

                <div class="form-group">
                    <label>Section</label>

                    <select name="section">

                        ${["A","B","C","D","E","F"]
                            .map(
                                section => `
                                    <option
                                        ${
                                            section ===
                                            (student?.section || "A")
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        ${section}
                                    </option>
                                `
                            )
                            .join("")
                        }

                    </select>
                </div>

                <div class="form-group">
                    <label>Mentor</label>

                    <select name="mentorId">

                        <option value="">
                            Not Assigned
                        </option>

                        ${db.teachers
                            .filter(
                                teacher =>
                                    teacher.role === "mentor"
                            )
                            .map(
                                teacher => `
                                    <option
                                        value="${teacher.id}"
                                        ${
                                            teacher.id ===
                                            student?.mentorId
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        ${escapeHTML(teacher.name)}
                                    </option>
                                `
                            )
                            .join("")
                        }

                    </select>

                </div>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="closeModal()"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    class="btn btn-primary"
                >
                    <i class="fa-solid fa-save"></i>
                    Save Student
                </button>

            </div>

        </form>

        `
    );
}


function saveStudent(event, studentId) {

    event.preventDefault();

    const form =
        event.target;

    const data =
        new FormData(form);

    const studentData = {

        name: data.get("name").trim(),

        roll: data.get("roll").trim(),

        password: data.get("password"),

        email: data.get("email").trim(),

        phone: data.get("phone").trim(),

        course: data.get("course"),

        semester: data.get("semester"),

        section: data.get("section"),

        mentorId: data.get("mentorId") || "",

    };


    const duplicate =
        db.students.find(
            student =>
                student.roll.toLowerCase() ===
                studentData.roll.toLowerCase() &&
                student.id !== studentId
        );

    if (duplicate) {

        showToast(
            "Roll number already exists.",
            true
        );

        return;
    }


    if (studentId) {

        const student =
            getStudent(studentId);

        Object.assign(
            student,
            studentData
        );

        student.sgpa =
            calculateSGPA(student);

    } else {

        const newStudent = {

            id: generateId("ST"),

            ...studentData,

            fees: {
                total: 90000,
                paid: 0,
                pending: 90000
            },

            subjects: [],

            sgpa: 0,

            cgpa: 0
        };

        db.students.push(newStudent);
    }


    saveDatabase();

    closeModal();

    showToast(
        studentId
            ? "Student updated successfully."
            : "Student added successfully."
    );

    renderPage(currentPage);
}


function deleteStudent(studentId) {

    const student =
        getStudent(studentId);

    if (!student) return;

    if (
        !confirm(
            `Delete ${student.name}? This action cannot be undone.`
        )
    ) {
        return;
    }

    db.students =
        db.students.filter(
            student =>
                student.id !== studentId
        );

    Object.keys(db.attendance)
        .forEach(key => {

            if (
                db.attendance[key].studentId ===
                studentId
            ) {
                delete db.attendance[key];
            }

        });

    saveDatabase();

    showToast("Student deleted.");

    renderPage(currentPage);
}


function viewStudent(studentId) {

    const student =
        getStudent(studentId);

    if (!student) return;

    const attendance =
        calculateAttendance(student.id);

    openModal(

        "Student Details",

        "Read-only student information",

        `

        <div class="profile-header">

            <div class="profile-avatar-large">
                ${initials(student.name)}
            </div>

            <div>
                <h2>${escapeHTML(student.name)}</h2>

                <p>
                    ${escapeHTML(student.roll)}
                    · ${escapeHTML(student.course)}
                </p>
            </div>

        </div>


        <div style="padding-top:20px">

            <table class="data-table">

                <tr>
                    <td>Roll Number</td>
                    <td>${escapeHTML(student.roll)}</td>
                </tr>

                <tr>
                    <td>Email</td>
                    <td>${escapeHTML(student.email)}</td>
                </tr>

                <tr>
                    <td>Phone</td>
                    <td>${escapeHTML(student.phone)}</td>
                </tr>

                <tr>
                    <td>Course</td>
                    <td>${escapeHTML(student.course)}</td>
                </tr>

                <tr>
                    <td>Semester</td>
                    <td>${escapeHTML(student.semester)}</td>
                </tr>

                <tr>
                    <td>Section</td>
                    <td>${escapeHTML(student.section)}</td>
                </tr>

                <tr>
                    <td>Mentor</td>
                    <td>
                        ${escapeHTML(
                            getTeacher(student.mentorId)?.name ||
                            "Not Assigned"
                        )}
                    </td>
                </tr>

                <tr>
                    <td>Attendance</td>
                    <td>${attendance}%</td>
                </tr>

                <tr>
                    <td>SGPA</td>
                    <td>${student.sgpa}</td>
                </tr>

                <tr>
                    <td>CGPA</td>
                    <td>${student.cgpa}</td>
                </tr>

            </table>

        </div>

        `
    );
}


/* ============================================================
   RE-SECTIONING ADMIN
============================================================ */

function renderResectionPage(container) {

    container.innerHTML = `

        <div class="toolbar">

            <div>
                <h3>
                    Student Re-Sectioning
                </h3>

                <p style="color:var(--muted);margin-top:5px;">
                    Admin can change mentor, course and section.
                </p>
            </div>

            <button
                class="btn btn-primary"
                onclick="openBulkSectionModal()"
            >
                <i class="fa-solid fa-users-gear"></i>
                Bulk Re-Section
            </button>

        </div>


        <div class="card">

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Student</th>
                            <th>Course</th>
                            <th>Current Section</th>
                            <th>Mentor</th>
                            <th>Change</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${db.students.map(student => `

                            <tr>

                                <td>
                                    <strong>
                                        ${escapeHTML(student.name)}
                                    </strong>
                                    <br>
                                    <small>
                                        ${escapeHTML(student.roll)}
                                    </small>
                                </td>

                                <td>
                                    ${escapeHTML(student.course)}
                                </td>

                                <td>
                                    <span class="badge badge-primary">
                                        ${escapeHTML(student.section)}
                                    </span>
                                </td>

                                <td>
                                    ${escapeHTML(
                                        getTeacher(student.mentorId)?.name ||
                                        "Not Assigned"
                                    )}
                                </td>

                                <td>

                                    <button
                                        class="btn btn-outline"
                                        onclick="openResectionModal('${student.id}')"
                                    >
                                        <i class="fa-solid fa-pen"></i>
                                        Assign
                                    </button>

                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


function openResectionModal(studentId) {

    const student =
        getStudent(studentId);

    if (!student) return;

    openModal(

        "Re-Section Student",

        `Change assignment for ${escapeHTML(student.name)}`,

        `

        <form
            onsubmit="saveResection(event,'${studentId}')"
        >

            <div class="form-grid">

                <div class="form-group">

                    <label>Course</label>

                    <select name="course">

                        ${courseOptions(
                            student.course
                        )}

                    </select>

                </div>

                <div class="form-group">

                    <label>Section</label>

                    <select name="section">

                        ${["A","B","C","D","E","F"]
                            .map(
                                section => `
                                    <option
                                        ${
                                            section === student.section
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        ${section}
                                    </option>
                                `
                            )
                            .join("")
                        }

                    </select>

                </div>

                <div class="form-group full">

                    <label>Mentor</label>

                    <select name="mentorId">

                        <option value="">
                            Not Assigned
                        </option>

                        ${db.teachers
                            .filter(
                                teacher =>
                                    teacher.role === "mentor"
                            )
                            .map(
                                teacher => `
                                    <option
                                        value="${teacher.id}"
                                        ${
                                            teacher.id === student.mentorId
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        ${escapeHTML(teacher.name)}
                                    </option>
                                `
                            )
                            .join("")
                        }

                    </select>

                </div>

            </div>

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="closeModal()"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    class="btn btn-primary"
                >
                    Save Assignment
                </button>

            </div>

        </form>

        `
    );
}


function saveResection(event, studentId) {

    event.preventDefault();

    const form =
        event.target;

    const data =
        new FormData(form);

    const student =
        getStudent(studentId);

    student.course =
        data.get("course");

    student.section =
        data.get("section");

    student.mentorId =
        data.get("mentorId");

    saveDatabase();

    closeModal();

    showToast(
        "Student re-sectioned successfully."
    );

    renderPage("resection");
}


function openBulkSectionModal() {

    openModal(

        "Bulk Re-Sectioning",

        "Move multiple students to a section",

        `

        <form onsubmit="saveBulkSection(event)">

            <div class="form-group">

                <label>
                    Current Section
                </label>

                <select name="oldSection">

                    ${sectionOptions()}

                </select>

            </div>

            <div class="form-group">

                <label>
                    New Section
                </label>

                <select name="newSection">

                    ${["A","B","C","D","E","F"]
                        .map(
                            section => `
                                <option>${section}</option>
                            `
                        )
                        .join("")
                    }

                </select>

            </div>

            <div class="form-group">

                <label>
                    Course
                </label>

                <select name="course">

                    <option value="">
                        All Courses
                    </option>

                    ${courseOptions()}

                </select>

            </div>

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="closeModal()"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    class="btn btn-primary"
                >
                    Move Students
                </button>

            </div>

        </form>

        `
    );
}


function saveBulkSection(event) {

    event.preventDefault();

    const data =
        new FormData(event.target);

    const oldSection =
        data.get("oldSection");

    const newSection =
        data.get("newSection");

    const course =
        data.get("course");

    let count = 0;

    db.students.forEach(student => {

        if (
            student.section === oldSection &&
            (!course || student.course === course)
        ) {

            student.section =
                newSection;

            count++;
        }

    });

    saveDatabase();

    closeModal();

    showToast(
        `${count} students re-sectioned.`
    );

    renderPage("resection");
}


/* ============================================================
   TEACHERS
============================================================ */

function renderTeachersPage(container) {

    container.innerHTML = `

        <div class="toolbar">

            <div>
                <h3>Teachers & Mentors</h3>
                <p style="color:var(--muted);">
                    Manage teaching accounts and mentors.
                </p>
            </div>

            <button
                class="btn btn-primary"
                onclick="openTeacherModal()"
            >
                <i class="fa-solid fa-plus"></i>
                Add Teacher
            </button>

        </div>


        <div class="card">

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Students</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${db.teachers.map(teacher => {

                            const students =
                                getMentorStudents(
                                    teacher.id
                                );

                            return `

                                <tr>

                                    <td>
                                        <strong>
                                            ${escapeHTML(teacher.name)}
                                        </strong>
                                    </td>

                                    <td>
                                        ${escapeHTML(teacher.username)}
                                    </td>

                                    <td>
                                        <span class="badge badge-primary">
                                            ${escapeHTML(teacher.role)}
                                        </span>
                                    </td>

                                    <td>
                                        ${escapeHTML(teacher.department)}
                                    </td>

                                    <td>
                                        ${students.length}
                                        / ${teacher.maxStudents}
                                    </td>

                                    <td>

                                        <div class="action-buttons">

                                            <button
                                                class="action-btn action-edit"
                                                onclick="openTeacherModal('${teacher.id}')"
                                            >
                                                <i class="fa-solid fa-pen"></i>
                                            </button>

                                            <button
                                                class="action-btn action-delete"
                                                onclick="deleteTeacher('${teacher.id}')"
                                            >
                                                <i class="fa-solid fa-trash"></i>
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            `;

                        }).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


function openTeacherModal(teacherId = null) {

    const teacher =
        teacherId
            ? getTeacher(teacherId)
            : null;

    openModal(

        teacher
            ? "Edit Teacher"
            : "Add Teacher",

        "Manage teacher / mentor account",

        `

        <form
            onsubmit="saveTeacher(event,'${teacherId || ""}')"
        >

            <div class="form-grid">

                <div class="form-group">
                    <label>Full Name</label>
                    <input
                        name="name"
                        required
                        value="${escapeHTML(teacher?.name || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Username</label>
                    <input
                        name="username"
                        required
                        value="${escapeHTML(teacher?.username || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        required
                        value="${escapeHTML(teacher?.password || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value="${escapeHTML(teacher?.email || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Department</label>
                    <input
                        name="department"
                        value="${escapeHTML(teacher?.department || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Role</label>

                    <select name="role">

                        <option
                            value="teacher"
                            ${teacher?.role === "teacher" ? "selected" : ""}
                        >
                            Teacher
                        </option>

                        <option
                            value="mentor"
                            ${teacher?.role === "mentor" ? "selected" : ""}
                        >
                            Mentor
                        </option>

                    </select>

                </div>

                <div class="form-group">

                    <label>Maximum Students</label>

                    <input
                        type="number"
                        name="maxStudents"
                        min="1"
                        value="${teacher?.maxStudents || 40}"
                    >

                </div>

            </div>

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="closeModal()"
                >
                    Cancel
                </button>

                <button
                    class="btn btn-primary"
                    type="submit"
                >
                    Save Teacher
                </button>

            </div>

        </form>

        `
    );
}


function saveTeacher(event, teacherId) {

    event.preventDefault();

    const data =
        new FormData(event.target);

    const teacherData = {

        name: data.get("name").trim(),

        username: data.get("username").trim(),

        password: data.get("password"),

        email: data.get("email").trim(),

        department: data.get("department").trim(),

        role: data.get("role"),

        maxStudents:
            Number(data.get("maxStudents")) || 40,

        subjects:
            teacherId
                ? getTeacher(teacherId)?.subjects || []
                : []

    };


    const duplicate =
        db.teachers.find(
            teacher =>
                teacher.username.toLowerCase() ===
                teacherData.username.toLowerCase() &&
                teacher.id !== teacherId
        );

    if (duplicate) {

        showToast(
            "Teacher username already exists.",
            true
        );

        return;
    }


    if (teacherId) {

        Object.assign(
            getTeacher(teacherId),
            teacherData
        );

    } else {

        db.teachers.push({

            id: generateId("T"),

            ...teacherData

        });

    }


    saveDatabase();

    closeModal();

    showToast("Teacher saved.");

    renderPage("teachers");
}


function deleteTeacher(teacherId) {

    const teacher =
        getTeacher(teacherId);

    if (!teacher) return;

    if (
        !confirm(
            `Delete ${teacher.name}?`
        )
    ) return;

    db.teachers =
        db.teachers.filter(
            t => t.id !== teacherId
        );

    db.students.forEach(student => {

        if (student.mentorId === teacherId) {

            student.mentorId = "";
        }

    });

    saveDatabase();

    showToast("Teacher deleted.");

    renderPage("teachers");
}


/* ============================================================
   SUBJECTS
============================================================ */

function renderSubjectsPage(container) {

    container.innerHTML = `

        <div class="toolbar">

            <div>
                <h3>Subject Management</h3>
                <p style="color:var(--muted)">
                    Create and manage academic subjects.
                </p>
            </div>

            <button
                class="btn btn-primary"
                onclick="openSubjectModal()"
            >
                <i class="fa-solid fa-plus"></i>
                Add Subject
            </button>

        </div>


        <div class="card">

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>Course</th>
                            <th>Semester</th>
                            <th>Credits</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${db.subjects.map(subject => `

                            <tr>

                                <td>
                                    <strong>
                                        ${escapeHTML(subject.name)}
                                    </strong>
                                </td>

                                <td>
                                    ${escapeHTML(subject.code)}
                                </td>

                                <td>
                                    ${escapeHTML(subject.course)}
                                </td>

                                <td>
                                    ${escapeHTML(subject.semester)}
                                </td>

                                <td>
                                    ${subject.credits}
                                </td>

                                <td>

                                    <div class="action-buttons">

                                        <button
                                            class="action-btn action-edit"
                                            onclick="openSubjectModal('${subject.id}')"
                                        >
                                            <i class="fa-solid fa-pen"></i>
                                        </button>

                                        <button
                                            class="action-btn action-delete"
                                            onclick="deleteSubject('${subject.id}')"
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


function openSubjectModal(subjectId = null) {

    const subject =
        subjectId
            ? getSubject(subjectId)
            : null;

    openModal(

        subject
            ? "Edit Subject"
            : "Add Subject",

        "Manage academic subject",

        `

        <form
            onsubmit="saveSubject(event,'${subjectId || ""}')"
        >

            <div class="form-grid">

                <div class="form-group">
                    <label>Subject Name</label>

                    <input
                        name="name"
                        required
                        value="${escapeHTML(subject?.name || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Subject Code</label>

                    <input
                        name="code"
                        required
                        value="${escapeHTML(subject?.code || "")}"
                    >
                </div>

                <div class="form-group">
                    <label>Course</label>

                    <select name="course">

                        ${courseOptions(
                            subject?.course
                        )}

                    </select>

                </div>

                <div class="form-group">
                    <label>Semester</label>

                    <input
                        name="semester"
                        value="${escapeHTML(subject?.semester || "3")}"
                    >
                </div>

                <div class="form-group">
                    <label>Credits</label>

                    <input
                        type="number"
                        name="credits"
                        min="1"
                        value="${subject?.credits || 4}"
                    >
                </div>

            </div>

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="closeModal()"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    class="btn btn-primary"
                >
                    Save Subject
                </button>

            </div>

        </form>

        `
    );
}


function saveSubject(event, subjectId) {

    event.preventDefault();

    const data =
        new FormData(event.target);

    const subjectData = {

        name: data.get("name").trim(),

        code: data.get("code").trim(),

        course: data.get("course"),

        semester: data.get("semester"),

        credits:
            Number(data.get("credits")) || 4
    };


    if (subjectId) {

        Object.assign(
            getSubject(subjectId),
            subjectData
        );

    } else {

        db.subjects.push({

            id: generateId("SUB"),

            ...subjectData

        });

    }


    saveDatabase();

    closeModal();

    showToast("Subject saved.");

    renderPage("subjects");
}


function deleteSubject(subjectId) {

    if (
        !confirm(
            "Delete this subject?"
        )
    ) return;

    db.subjects =
        db.subjects.filter(
            subject =>
                subject.id !== subjectId
        );

    db.students.forEach(student => {

        student.subjects =
            student.subjects.filter(
                subject =>
                    subject.id !== subjectId
            );

    });

    saveDatabase();

    showToast("Subject deleted.");

    renderPage("subjects");
}


/* ============================================================
   ADMIN ATTENDANCE
============================================================ */

function renderAdminAttendancePage(container) {

    container.innerHTML = `

        <div class="card">

            <div class="card-header">

                <div>
                    <h3>Attendance Overview</h3>
                    <p>
                        View student-wise attendance.
                    </p>
                </div>

            </div>

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Student</th>
                            <th>Course</th>
                            <th>Section</th>
                            <th>Mentor</th>
                            <th>Attendance</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${db.students.map(student => {

                            const attendance =
                                calculateAttendance(
                                    student.id
                                );

                            return `

                                <tr>

                                    <td>
                                        ${escapeHTML(student.name)}
                                    </td>

                                    <td>
                                        ${escapeHTML(student.course)}
                                    </td>

                                    <td>
                                        ${escapeHTML(student.section)}
                                    </td>

                                    <td>
                                        ${escapeHTML(
                                            getTeacher(student.mentorId)?.name ||
                                            "Not Assigned"
                                        )}
                                    </td>

                                    <td>

                                        <strong>
                                            ${attendance}%
                                        </strong>

                                        <div
                                            class="progress"
                                            style="margin-top:7px;"
                                        >
                                            <div
                                                class="progress-bar"
                                                style="width:${attendance}%"
                                            ></div>
                                        </div>

                                    </td>

                                </tr>

                            `;

                        }).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


/* ============================================================
   FEES
============================================================ */

function renderFeesPage(container) {

    container.innerHTML = `

        <div class="card">

            <div class="card-header">

                <div>
                    <h3>Student Fees</h3>
                    <p>
                        Admin can update fee records.
                    </p>
                </div>

            </div>

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Student</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Pending</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${db.students.map(student => `

                            <tr>

                                <td>
                                    <strong>
                                        ${escapeHTML(student.name)}
                                    </strong>
                                    <br>
                                    <small>
                                        ${escapeHTML(student.roll)}
                                    </small>
                                </td>

                                <td>
                                    ${formatCurrency(student.fees.total)}
                                </td>

                                <td>
                                    ${formatCurrency(student.fees.paid)}
                                </td>

                                <td>
                                    <span class="badge ${
                                        student.fees.pending > 0
                                            ? "badge-warning"
                                            : "badge-success"
                                    }">
                                        ${formatCurrency(student.fees.pending)}
                                    </span>
                                </td>

                                <td>

                                    <button
                                        class="btn btn-outline"
                                        onclick="openFeesModal('${student.id}')"
                                    >
                                        <i class="fa-solid fa-pen"></i>
                                        Edit
                                    </button>

                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


function openFeesModal(studentId) {

    const student =
        getStudent(studentId);

    openModal(

        "Update Fees",

        student.name,

        `

        <form
            onsubmit="saveFees(event,'${studentId}')"
        >

            <div class="form-grid">

                <div class="form-group">

                    <label>Total Fees</label>

                    <input
                        type="number"
                        name="total"
                        min="0"
                        value="${student.fees.total}"
                        required
                    >

                </div>

                <div class="form-group">

                    <label>Paid Fees</label>

                    <input
                        type="number"
                        name="paid"
                        min="0"
                        value="${student.fees.paid}"
                        required
                    >

                </div>

            </div>

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="closeModal()"
                >
                    Cancel
                </button>

                <button
                    class="btn btn-primary"
                    type="submit"
                >
                    Save Fees
                </button>

            </div>

        </form>

        `
    );
}


function saveFees(event, studentId) {

    event.preventDefault();

    const data =
        new FormData(event.target);

    const total =
        Number(data.get("total"));

    const paid =
        Number(data.get("paid"));

    const student =
        getStudent(studentId);

    student.fees.total =
        total;

    student.fees.paid =
        Math.min(paid, total);

    student.fees.pending =
        Math.max(
            0,
            total - student.fees.paid
        );

    saveDatabase();

    closeModal();

    showToast("Fees updated.");

    renderPage("fees");
}


/* ============================================================
   RESULTS
============================================================ */

function renderResultsPage(container) {

    container.innerHTML = `

        <div class="card">

            <div class="card-header">

                <div>
                    <h3>Student Results</h3>
                    <p>
                        Admin can edit subject marks and SGPA.
                    </p>
                </div>

            </div>

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Student</th>
                            <th>Course</th>
                            <th>SGPA</th>
                            <th>CGPA</th>
                            <th>Subjects</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${db.students.map(student => `

                            <tr>

                                <td>
                                    ${escapeHTML(student.name)}
                                </td>

                                <td>
                                    ${escapeHTML(student.course)}
                                </td>

                                <td>
                                    <span class="badge badge-success">
                                        ${student.sgpa}
                                    </span>
                                </td>

                                <td>
                                    ${student.cgpa}
                                </td>

                                <td>
                                    ${student.subjects.length}
                                </td>

                                <td>

                                    <button
                                        class="btn btn-outline"
                                        onclick="openResultsModal('${student.id}')"
                                    >
                                        <i class="fa-solid fa-pen"></i>
                                        Edit
                                    </button>

                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


function openResultsModal(studentId) {

    const student =
        getStudent(studentId);

    openModal(

        "Edit Results",

        student.name,

        `

        <form
            onsubmit="saveResults(event,'${studentId}')"
        >

            <div class="form-group">

                <label>CGPA</label>

                <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    name="cgpa"
                    value="${student.cgpa}"
                >

            </div>


            <h4 style="margin:20px 0 10px;">
                Subject Marks
            </h4>


            ${student.subjects.length
                ? student.subjects.map((subject,index) => `

                    <div class="form-grid">

                        <div class="form-group">

                            <label>
                                ${escapeHTML(subject.name)}
                            </label>

                            <input
                                type="number"
                                min="0"
                                max="100"
                                name="marks_${index}"
                                value="${subject.marks}"
                            >

                        </div>

                    </div>

                `).join("")
                : `
                    <div class="empty-state">
                        No subjects assigned.
                    </div>
                `
            }


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="closeModal()"
                >
                    Cancel
                </button>

                <button
                    class="btn btn-primary"
                    type="submit"
                >
                    Save Results
                </button>

            </div>

        </form>

        `
    );
}


function saveResults(event, studentId) {

    event.preventDefault();

    const form =
        event.target;

    const data =
        new FormData(form);

    const student =
        getStudent(studentId);

    student.cgpa =
        Number(data.get("cgpa")) || 0;

    student.subjects.forEach(
        (subject,index) => {

            const marks =
                Number(
                    data.get(`marks_${index}`)
                );

            subject.marks =
                Math.max(
                    0,
                    Math.min(100, marks)
                );

            subject.grade =
                gradeFromMarks(
                    subject.marks
                );
        }
    );

    student.sgpa =
        calculateSGPA(student);

    saveDatabase();

    closeModal();

    showToast("Results updated.");

    renderPage("results");
}


/* ============================================================
   NOTICES
============================================================ */

function renderNoticesPage(container) {

    container.innerHTML = `

        <div class="toolbar">

            <div>
                <h3>Notices</h3>
                <p style="color:var(--muted)">
                    Publish information to students.
                </p>
            </div>

            <button
                class="btn btn-primary"
                onclick="openNoticeModal()"
            >
                <i class="fa-solid fa-plus"></i>
                New Notice
            </button>

        </div>


        <div class="two-column">

            ${db.notices.map(notice => `

                <div class="card">

                    <div class="card-body">

                        <span class="badge badge-info">
                            ${formatDate(notice.date)}
                        </span>

                        <h3 style="margin:12px 0 7px;">
                            ${escapeHTML(notice.title)}
                        </h3>

                        <p style="color:var(--muted)">
                            ${escapeHTML(notice.message)}
                        </p>

                        <button
                            class="btn btn-danger"
                            style="margin-top:15px;"
                            onclick="deleteNotice('${notice.id}')"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `).join("")}

        </div>

    `;
}


function openNoticeModal() {

    openModal(

        "Create Notice",

        "Publish information",

        `

        <form onsubmit="saveNotice(event)">

            <div class="form-group">

                <label>Title</label>

                <input
                    name="title"
                    required
                >

            </div>

            <div class="form-group">

                <label>Message</label>

                <textarea
                    name="message"
                    rows="5"
                    required
                ></textarea>

            </div>

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="closeModal()"
                >
                    Cancel
                </button>

                <button
                    class="btn btn-primary"
                    type="submit"
                >
                    Publish
                </button>

            </div>

        </form>

        `
    );
}


function saveNotice(event) {

    event.preventDefault();

    const data =
        new FormData(event.target);

    db.notices.unshift({

        id: generateId("N"),

        title:
            data.get("title").trim(),

        message:
            data.get("message").trim(),

        date:
            new Date().toISOString()
    });

    saveDatabase();

    closeModal();

    showToast("Notice published.");

    renderPage("notices");
}


function deleteNotice(id) {

    db.notices =
        db.notices.filter(
            notice => notice.id !== id
        );

    saveDatabase();

    showToast("Notice deleted.");

    renderPage("notices");
}


/* ============================================================
   TEACHER DASHBOARD
============================================================ */

function renderTeacherDashboard(container) {

    const teacher =
        getTeacher(session.id);

    const students =
        getMentorStudents(session.id);

    const sections =
        [...new Set(
            students.map(student => student.section)
        )];

    container.innerHTML = `

        <div class="welcome-banner">

            <div>

                <h2>
                    Welcome, ${escapeHTML(teacher.name)} 👋
                </h2>

                <p>
                    ${
                        teacher.role === "mentor"
                            ? "Mentor Dashboard"
                            : "Teacher Dashboard"
                    }
                </p>

            </div>

            <img
                class="welcome-image"
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80"
            >

        </div>


        <div class="stats-grid">

            ${statCard(
                students.length,
                "Assigned Students",
                "fa-user-graduate"
            )}

            ${statCard(
                sections.length,
                "Sections",
                "fa-users"
            )}

            ${statCard(
                teacher.subjects.length,
                "Subjects",
                "fa-book-open"
            )}

            ${statCard(
                teacher.maxStudents,
                "Student Capacity",
                "fa-user-group"
            )}

        </div>


        <div class="card">

            <div class="card-header">

                <div>
                    <h3>Teacher Controls</h3>
                    <p>
                        Quickly access your teaching tools.
                    </p>
                </div>

            </div>

            <div class="card-body">

                <div class="quick-grid">

                    ${quickAction(
                        "markAttendance",
                        "fa-calendar-check",
                        "Mark Attendance",
                        "Mark daily attendance"
                    )}

                    ${quickAction(
                        "teacherStudents",
                        "fa-user-graduate",
                        "My Students",
                        "View assigned students"
                    )}

                    ${quickAction(
                        "sections",
                        "fa-users",
                        "Sections",
                        "Manage student sections"
                    )}

                    ${quickAction(
                        "teacherSubjects",
                        "fa-book",
                        "My Subjects",
                        "View subject information"
                    )}

                </div>

            </div>

        </div>

    `;
}


/* ============================================================
   TEACHER STUDENTS
============================================================ */

function renderTeacherStudents(container) {

    const teacher =
        getTeacher(session.id);

    const students =
        getMentorStudents(session.id);

    container.innerHTML = `

        <div class="card">

            <div class="card-header">

                <div>
                    <h3>My Students</h3>
                    <p>
                        Students currently assigned to you.
                    </p>
                </div>

                <span class="badge badge-primary">
                    ${students.length}/${teacher.maxStudents}
                </span>

            </div>

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Roll</th>
                            <th>Course</th>
                            <th>Section</th>
                            <th>Attendance</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${students.map(student => {

                            const attendance =
                                calculateAttendance(
                                    student.id
                                );

                            return `

                                <tr>

                                    <td>
                                        ${escapeHTML(student.name)}
                                    </td>

                                    <td>
                                        ${escapeHTML(student.roll)}
                                    </td>

                                    <td>
                                        ${escapeHTML(student.course)}
                                    </td>

                                    <td>
                                        <span class="badge badge-primary">
                                            ${escapeHTML(student.section)}
                                        </span>
                                    </td>

                                    <td>
                                        ${attendance}%
                                    </td>

                                </tr>

                            `;

                        }).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


/* ============================================================
   TEACHER SECTIONS
============================================================ */

function renderTeacherSections(container) {

    const teacher =
        getTeacher(session.id);

    const students =
        getMentorStudents(session.id);

    const sections =
        [...new Set(
            students.map(
                student => student.section
            )
        )];

    container.innerHTML = `

        <div class="three-column">

            ${sections.map(section => {

                const sectionStudents =
                    students.filter(
                        student =>
                            student.section === section
                    );

                return `

                    <div class="card">

                        <div class="card-header">

                            <div>
                                <h3>
                                    Section ${escapeHTML(section)}
                                </h3>

                                <p>
                                    ${sectionStudents.length}
                                    students
                                </p>
                            </div>

                            <span class="badge badge-primary">
                                ${escapeHTML(section)}
                            </span>

                        </div>

                        <div class="card-body">

                            ${
                                sectionStudents.length
                                    ? sectionStudents.map(
                                        student => `
                                            <div
                                                style="
                                                    padding:10px 0;
                                                    border-bottom:1px solid var(--border);
                                                "
                                            >
                                                <strong>
                                                    ${escapeHTML(student.name)}
                                                </strong>

                                                <br>

                                                <small
                                                    style="color:var(--muted)"
                                                >
                                                    ${escapeHTML(student.roll)}
                                                </small>

                                                <button
                                                    class="btn btn-outline"
                                                    style="float:right;padding:5px 8px;font-size:11px;"
                                                    onclick="mentorChangeSection('${student.id}')"
                                                >
                                                    Change
                                                </button>

                                            </div>
                                        `
                                    ).join("")
                                    : `
                                        <div class="empty-state">
                                            No students.
                                        </div>
                                    `
                            }

                        </div>

                    </div>

                `;

            }).join("")}

        </div>


        <div class="card" style="margin-top:20px;">

            <div class="card-header">

                <div>
                    <h3>Section Management</h3>

                    <p>
                        Mentors can assign their students
                        to different sections.
                    </p>
                </div>

            </div>

            <div class="card-body">

                <p style="color:var(--muted)">
                    You can manage section assignments for
                    students assigned to you. The Admin
                    retains complete control over all students.
                </p>

            </div>

        </div>

    `;
}


function mentorChangeSection(studentId) {

    const student =
        getStudent(studentId);

    if (
        !student ||
        student.mentorId !== session.id
    ) {

        showToast(
            "You can only manage your assigned students.",
            true
        );

        return;
    }

    openModal(

        "Change Section",

        student.name,

        `

        <form
            onsubmit="saveMentorSection(event,'${studentId}')"
        >

            <div class="form-group">

                <label>New Section</label>

                <select name="section">

                    ${["A","B","C","D","E","F"]
                        .map(
                            section => `
                                <option
                                    ${
                                        section === student.section
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    ${section}
                                </option>
                            `
                        )
                        .join("")
                    }

                </select>

            </div>

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="closeModal()"
                >
                    Cancel
                </button>

                <button
                    class="btn btn-primary"
                    type="submit"
                >
                    Change Section
                </button>

            </div>

        </form>

        `
    );
}


function saveMentorSection(event, studentId) {

    event.preventDefault();

    const student =
        getStudent(studentId);

    if (
        !student ||
        student.mentorId !== session.id
    ) return;

    const data =
        new FormData(event.target);

    student.section =
        data.get("section");

    saveDatabase();

    closeModal();

    showToast(
        "Section changed successfully."
    );

    renderPage("sections");
}


/* ============================================================
   MARK ATTENDANCE
============================================================ */

function renderMarkAttendance(container) {

    const teacher =
        getTeacher(session.id);

    const students =
        getMentorStudents(session.id);

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const subjects =
        db.subjects.filter(
            subject =>
                teacher.subjects.includes(
                    subject.id
                )
        );


    container.innerHTML = `

        <div class="card">

            <div class="card-header">

                <div>

                    <h3>Daily Attendance</h3>

                    <p>
                        Mark attendance by subject and section.
                    </p>

                </div>

            </div>

            <div class="card-body">

                <div class="form-grid">

                    <div class="form-group">

                        <label>Date</label>

                        <input
                            type="date"
                            id="attendanceDate"
                            value="${today}"
                            onchange="renderAttendanceTable()"
                        >

                    </div>

                    <div class="form-group">

                        <label>Subject</label>

                        <select
                            id="attendanceSubject"
                            onchange="renderAttendanceTable()"
                        >

                            <option value="">
                                Select Subject
                            </option>

                            ${subjects.map(
                                subject => `
                                    <option value="${subject.id}">
                                        ${escapeHTML(subject.name)}
                                    </option>
                                `
                            ).join("")}

                        </select>

                    </div>

                    <div class="form-group">

                        <label>Section</label>

                        <select
                            id="attendanceSection"
                            onchange="renderAttendanceTable()"
                        >

                            <option value="">
                                All My Sections
                            </option>

                            ${[
                                ...new Set(
                                    students.map(
                                        student =>
                                            student.section
                                    )
                                )
                            ].map(
                                section => `
                                    <option>
                                        ${escapeHTML(section)}
                                    </option>
                                `
                            ).join("")}

                        </select>

                    </div>

                </div>

            </div>

        </div>


        <div
            id="attendanceTableContainer"
            style="margin-top:20px;"
        ></div>

    `;

    renderAttendanceTable();
}


function renderAttendanceTable() {

    const container =
        document.getElementById(
            "attendanceTableContainer"
        );

    if (!container) return;

    const teacher =
        getTeacher(session.id);

    const subjectId =
        document.getElementById(
            "attendanceSubject"
        )?.value;

    const date =
        document.getElementById(
            "attendanceDate"
        )?.value;

    const section =
        document.getElementById(
            "attendanceSection"
        )?.value;

    if (!subjectId || !date) {

        container.innerHTML = `
            <div class="card">
                <div class="empty-state">
                    <i class="fa-solid fa-calendar-check"></i>
                    <p>Select a date and subject to mark attendance.</p>
                </div>
            </div>
        `;

        return;
    }


    const students =
        getMentorStudents(session.id)
            .filter(
                student =>
                    !section ||
                    student.section === section
            );


    container.innerHTML = `

        <div class="card">

            <div class="card-header">

                <div>

                    <h3>
                        ${
                            escapeHTML(
                                getSubject(subjectId)?.name
                            )
                        }
                    </h3>

                    <p>
                        ${date}
                    </p>

                </div>

                <button
                    class="btn btn-primary"
                    onclick="saveAttendance('${date}','${subjectId}')"
                >
                    <i class="fa-solid fa-save"></i>
                    Save Attendance
                </button>

            </div>


            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Student</th>
                            <th>Roll</th>
                            <th>Section</th>
                            <th>Attendance</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${students.map(student => {

                            const key =
                                attendanceKey(
                                    date,
                                    subjectId,
                                    student.id
                                );

                            const record =
                                db.attendance[key];

                            const status =
                                record?.status || "unmarked";

                            return `

                                <tr>

                                    <td>
                                        ${escapeHTML(student.name)}
                                    </td>

                                    <td>
                                        ${escapeHTML(student.roll)}
                                    </td>

                                    <td>
                                        ${escapeHTML(student.section)}
                                    </td>

                                    <td>

                                        <div class="action-buttons">

                                            <button
                                                class="attendance-button ${
                                                    status === "present"
                                                        ? "present"
                                                        : "unmarked"
                                                }"
                                                onclick="setAttendance('${key}','present')"
                                            >
                                                Present
                                            </button>

                                            <button
                                                class="attendance-button ${
                                                    status === "absent"
                                                        ? "absent"
                                                        : "unmarked"
                                                }"
                                                onclick="setAttendance('${key}','absent')"
                                            >
                                                Absent
                                            </button>

                                        </div>

                                    </td>

                                    <td>

                                        ${
                                            status === "present"
                                                ? `<span class="attendance-present">Present</span>`
                                                : status === "absent"
                                                    ? `<span class="attendance-absent">Absent</span>`
                                                    : `<span style="color:var(--muted)">Not Marked</span>`
                                        }

                                    </td>

                                </tr>

                            `;

                        }).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


function attendanceKey(
    date,
    subjectId,
    studentId
) {

    return `${date}_${subjectId}_${studentId}`;
}


function setAttendance(
    key,
    status
) {

    if (!db.attendance[key]) {

        const parts =
            key.split("_");

        db.attendance[key] = {

            date: parts[0],

            subjectId: parts[1],

            studentId: parts.slice(2).join("_"),

            status: status,

            teacherId: session.id

        };

    } else {

        db.attendance[key].status =
            status;

        db.attendance[key].teacherId =
            session.id;
    }

    saveDatabase();

    renderAttendanceTable();
}


function saveAttendance(
    date,
    subjectId
) {

    const teacher =
        getTeacher(session.id);

    const valid =
        Object.values(db.attendance)
            .filter(
                record =>
                    record.date === date &&
                    record.subjectId === subjectId &&
                    record.teacherId === session.id
            );

    if (!valid.length) {

        showToast(
            "Please mark attendance first.",
            true
        );

        return;
    }

    saveDatabase();

    showToast(
        "Attendance saved successfully."
    );

    renderAttendanceTable();
}


/* ============================================================
   TEACHER SUBJECTS
============================================================ */

function renderTeacherSubjects(container) {

    const teacher =
        getTeacher(session.id);

    const subjects =
        db.subjects.filter(
            subject =>
                teacher.subjects.includes(
                    subject.id
                )
        );

    container.innerHTML = `

        <div class="three-column">

            ${subjects.map(subject => `

                <div class="card">

                    <div class="card-body">

                        <div class="stat-icon">
                            <i class="fa-solid fa-book"></i>
                        </div>

                        <h3 style="margin-top:15px;">
                            ${escapeHTML(subject.name)}
                        </h3>

                        <p style="color:var(--muted);margin-top:5px;">
                            Code:
                            ${escapeHTML(subject.code)}
                        </p>

                        <p style="color:var(--muted);">
                            ${escapeHTML(subject.course)}
                        </p>

                        <p style="color:var(--muted);">
                            Credits:
                            ${subject.credits}
                        </p>

                    </div>

                </div>

            `).join("")}

        </div>

    `;
}


/* ============================================================
   STUDENT PROFILE
============================================================ */

function getCurrentStudent() {

    return getStudent(session.id);
}


function renderStudentProfile(container) {

    const student =
        getCurrentStudent();

    const mentor =
        getTeacher(student.mentorId);

    container.innerHTML = `

        <div class="card">

            <div class="profile-header">

                <div class="profile-avatar-large">
                    ${initials(student.name)}
                </div>

                <div>

                    <h2>
                        ${escapeHTML(student.name)}
                    </h2>

                    <p>
                        ${escapeHTML(student.roll)}
                    </p>

                </div>

            </div>


            <div class="card-body">

                <table class="data-table">

                    <tr>
                        <td>Full Name</td>
                        <td>${escapeHTML(student.name)}</td>
                    </tr>

                    <tr>
                        <td>Roll Number</td>
                        <td>${escapeHTML(student.roll)}</td>
                    </tr>

                    <tr>
                        <td>Email</td>
                        <td>${escapeHTML(student.email)}</td>
                    </tr>

                    <tr>
                        <td>Phone</td>
                        <td>${escapeHTML(student.phone)}</td>
                    </tr>

                    <tr>
                        <td>Course</td>
                        <td>${escapeHTML(student.course)}</td>
                    </tr>

                    <tr>
                        <td>Semester</td>
                        <td>${escapeHTML(student.semester)}</td>
                    </tr>

                    <tr>
                        <td>Section</td>
                        <td>${escapeHTML(student.section)}</td>
                    </tr>

                    <tr>
                        <td>Mentor</td>
                        <td>
                            ${escapeHTML(
                                mentor?.name ||
                                "Not Assigned"
                            )}
                        </td>
                    </tr>

                </table>

            </div>

        </div>

    `;
}


/* ============================================================
   STUDENT SUBJECTS
============================================================ */

function renderStudentSubjects(container) {

    const student =
        getCurrentStudent();

    container.innerHTML = `

        <div class="card">

            <div class="card-header">

                <div>
                    <h3>My Subjects</h3>
                    <p>
                        Subject marks and grades.
                    </p>
                </div>

            </div>

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>Credits</th>
                            <th>Marks</th>
                            <th>Grade</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${student.subjects.map(subject => `

                            <tr>

                                <td>
                                    ${escapeHTML(subject.name)}
                                </td>

                                <td>
                                    ${escapeHTML(subject.code)}
                                </td>

                                <td>
                                    ${subject.credits}
                                </td>

                                <td>
                                    ${subject.marks}
                                </td>

                                <td>
                                    <span class="badge badge-success">
                                        ${escapeHTML(subject.grade)}
                                    </span>
                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


/* ============================================================
   STUDENT ATTENDANCE
============================================================ */

function renderStudentAttendance(container) {

    const student =
        getCurrentStudent();

    const attendanceRecords =
        Object.values(
            db.attendance
        )
        .filter(
            record =>
                record.studentId === student.id
        )
        .sort(
            (a,b) =>
                b.date.localeCompare(a.date)
        );

    const overall =
        calculateAttendance(
            student.id
        );

    container.innerHTML = `

        <div class="stats-grid">

            ${statCard(
                `${overall}%`,
                "Overall Attendance",
                "fa-calendar-check"
            )}

            ${statCard(
                attendanceRecords.filter(
                    r => r.status === "present"
                ).length,
                "Classes Present",
                "fa-circle-check"
            )}

            ${statCard(
                attendanceRecords.filter(
                    r => r.status === "absent"
                ).length,
                "Classes Absent",
                "fa-circle-xmark"
            )}

            ${statCard(
                attendanceRecords.length,
                "Total Marked",
                "fa-list-check"
            )}

        </div>


        <div class="card">

            <div class="card-header">

                <div>
                    <h3>Daily Attendance</h3>
                    <p>
                        Attendance marked by subject teachers.
                    </p>
                </div>

            </div>

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Date</th>
                            <th>Subject</th>
                            <th>Teacher</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${attendanceRecords.length
                            ? attendanceRecords.map(
                                record => {

                                    const subject =
                                        getSubject(
                                            record.subjectId
                                        );

                                    const teacher =
                                        getTeacher(
                                            record.teacherId
                                        );

                                    return `

                                        <tr>

                                            <td>
                                                ${formatDate(record.date)}
                                            </td>

                                            <td>
                                                ${escapeHTML(
                                                    subject?.name ||
                                                    "Unknown"
                                                )}
                                            </td>

                                            <td>
                                                ${escapeHTML(
                                                    teacher?.name ||
                                                    "Unknown"
                                                )}
                                            </td>

                                            <td>

                                                ${
                                                    record.status ===
                                                    "present"
                                                        ? `<span class="badge badge-success">Present</span>`
                                                        : `<span class="badge badge-danger">Absent</span>`
                                                }

                                            </td>

                                        </tr>

                                    `;

                                }
                            ).join("")
                            : `
                                <tr>
                                    <td colspan="4">
                                        <div class="empty-state">
                                            <i class="fa-solid fa-calendar-xmark"></i>
                                            <p>
                                                No attendance has been marked yet.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


/* ============================================================
   STUDENT RESULTS
============================================================ */

function renderStudentResults(container) {

    const student =
        getCurrentStudent();

    container.innerHTML = `

        <div class="stats-grid">

            ${statCard(
                student.sgpa,
                "Current SGPA",
                "fa-chart-line"
            )}

            ${statCard(
                student.cgpa,
                "Current CGPA",
                "fa-graduation-cap"
            )}

            ${statCard(
                student.subjects.length,
                "Subjects",
                "fa-book-open"
            )}

            ${statCard(
                calculateAverageMarks(student),
                "Average Marks",
                "fa-percent"
            )}

        </div>


        <div class="card">

            <div class="card-header">

                <div>
                    <h3>Academic Results</h3>
                    <p>
                        Results are managed by the administration.
                    </p>
                </div>

            </div>

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>
                            <th>Subject</th>
                            <th>Marks</th>
                            <th>Grade</th>
                            <th>Credits</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${student.subjects.map(subject => `

                            <tr>

                                <td>
                                    ${escapeHTML(subject.name)}
                                </td>

                                <td>
                                    ${subject.marks}/100
                                </td>

                                <td>
                                    <span class="badge badge-success">
                                        ${escapeHTML(subject.grade)}
                                    </span>
                                </td>

                                <td>
                                    ${subject.credits}
                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}


function calculateAverageMarks(student) {

    if (!student.subjects.length) {
        return 0;
    }

    const total =
        student.subjects.reduce(
            (sum, subject) =>
                sum + Number(subject.marks || 0),
            0
        );

    return Math.round(
        total / student.subjects.length
    );
}


/* ============================================================
   STUDENT FEES
============================================================ */

function renderStudentFees(container) {

    const student =
        getCurrentStudent();

    const percentage =
        student.fees.total
            ? Math.round(
                student.fees.paid /
                student.fees.total *
                100
            )
            : 0;

    container.innerHTML = `

        <div class="stats-grid">

            ${statCard(
                formatCurrency(student.fees.total),
                "Total Fees",
                "fa-file-invoice"
            )}

            ${statCard(
                formatCurrency(student.fees.paid),
                "Paid",
                "fa-circle-check"
            )}

            ${statCard(
                formatCurrency(student.fees.pending),
                "Pending",
                "fa-circle-exclamation"
            )}

            ${statCard(
                `${percentage}%`,
                "Payment Completed",
                "fa-percent"
            )}

        </div>


        <div class="card">

            <div class="card-header">

                <div>
                    <h3>Fee Status</h3>
                    <p>
                        Your fee information is read-only.
                    </p>
                </div>

            </div>

            <div class="card-body">

                <div class="progress">

                    <div
                        class="progress-bar"
                        style="width:${percentage}%"
                    ></div>

                </div>

                <p style="margin-top:15px;">
                    ${percentage}% of your total fees have been paid.
                </p>

            </div>

        </div>

    `;
}


/* ============================================================
   STUDENT NOTICES
============================================================ */

function renderStudentNotices(container) {

    container.innerHTML = `

        <div class="two-column">

            ${db.notices.map(notice => `

                <div class="card">

                    <div class="card-body">

                        <span class="badge badge-info">
                            ${formatDate(notice.date)}
                        </span>

                        <h3 style="margin:12px 0 8px;">
                            ${escapeHTML(notice.title)}
                        </h3>

                        <p style="color:var(--muted);">
                            ${escapeHTML(notice.message)}
                        </p>

                    </div>

                </div>

            `).join("")}

        </div>

    `;
}


/* ============================================================
   OPTIONS
============================================================ */

function courseOptions(selected = "") {

    const courses = [

        "BCA (AI-ML)",

        "BCA (AI-DS)",

        "BCA",

        "BTech (AI-ML)",

        "BTech (CSE)",

        "BTech (AI-DS)",

        "BSc Computer Science"

    ];

    return courses.map(
        course => `

            <option
                value="${course}"
                ${
                    selected === course
                        ? "selected"
                        : ""
                }
            >
                ${course}
            </option>

        `
    ).join("");
}


function sectionOptions() {

    return ["A","B","C","D","E","F"]
        .map(
            section =>
                `<option value="${section}">
                    ${section}
                </option>`
        )
        .join("");
}


/* ============================================================
   MODAL
============================================================ */

function openModal(
    title,
    subtitle,
    body
) {

    document.getElementById(
        "modalTitle"
    ).textContent = title;

    document.getElementById(
        "modalSubtitle"
    ).textContent = subtitle || "";

    document.getElementById(
        "modalBody"
    ).innerHTML = body;

    document
        .getElementById("modalOverlay")
        .classList.remove("hidden");
}


function closeModal() {

    document
        .getElementById("modalOverlay")
        .classList.add("hidden");
}


document
    .getElementById("modalClose")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("modalOverlay")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                this
            ) {
                closeModal();
            }

        }
    );


/* ============================================================
   TOAST
============================================================ */

let toastTimer;


function showToast(
    message,
    error = false
) {

    const toast =
        document.getElementById("toast");

    const icon =
        toast.querySelector("i");

    document.getElementById(
        "toastMessage"
    ).textContent = message;

    icon.className =
        error
            ? "fa-solid fa-circle-exclamation"
            : "fa-solid fa-circle-check";

    icon.style.color =
        error
            ? "#f87171"
            : "#4ade80";

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(
            () => {
                toast.classList.remove("show");
            },
            3000
        );
}


/* ============================================================
   LOGOUT
============================================================ */

function logout() {

    clearSession();

    document
        .getElementById("app")
        .classList.add("hidden");

    document
        .getElementById("loginScreen")
        .classList.remove("hidden");

    document
        .getElementById("loginForm")
        .reset();

    currentPage =
        "dashboard";
}


document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        logout
    );


/* ============================================================
   MOBILE SIDEBAR
============================================================ */

document
    .getElementById("mobileMenuBtn")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("sidebar")
                .classList.toggle("open");

        }
    );


/* ============================================================
   ESCAPE MODAL
============================================================ */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);


/* ============================================================
   INITIAL SESSION
============================================================ */

if (session) {

    initializeApplication();

}