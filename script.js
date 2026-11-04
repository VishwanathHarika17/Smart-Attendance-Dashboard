// ==========================================
// SMART ATTENDANCE DASHBOARD
// COMPLETE SCRIPT.JS
// ==========================================

// ==========================================
// ATTENDANCE PERCENTAGE CALCULATION
// Late attendance counts as attended
// ==========================================

function calculateAttendancePercentage(present, late, total) {

    if (total <= 0) {
        return 0;
    }

    return ((present + late) / total) * 100;

}


// ==========================================
// DEFAULT STUDENTS
// ==========================================

function getDefaultStudents() {

    return [

        {
            id: "1",
            name: "Nizam",
            email: "nizam@example.com",
            department: "Computer Science",
            year: "3",
            phone: "9876543210",
            password: "123"
        },

        {
            id: "2",
            name: "Nida",
            email: "nida@example.com",
            department: "Computer Science",
            year: "3",
            phone: "9876543211",
            password: "123"
        },

        {
            id: "3",
            name: "Arshiya",
            email: "arshiya@example.com",
            department: "Computer Science",
            year: "3",
            phone: "9876543212",
            password: "123"
        }

    ];

}


// ==========================================
// GET STUDENTS
// ==========================================


function getStudents() {
    let savedStudents = JSON.parse(
        localStorage.getItem("students")
    );

    if (!savedStudents) {
        savedStudents = getDefaultStudents();

        localStorage.setItem(
            "students",
            JSON.stringify(savedStudents)
        );
    }

    // Add a default password to older student records
    savedStudents.forEach(function (student) {
        if (!student.password) {
            student.password = "123";
        }
    });

    // Save any password updates
    localStorage.setItem(
        "students",
        JSON.stringify(savedStudents)
    );

    return savedStudents;
}


// ==========================================
// SAVE STUDENTS
// ==========================================

function saveStudents(students) {

    localStorage.setItem(

        "students",

        JSON.stringify(students)

    );

}

// ==========================================
// STUDENT LOGIN
// ==========================================

let loginButton =
    document.getElementById("studentLogin");


if (loginButton) {

    loginButton.addEventListener(
        "click",
        function () {

            let studentId =
                document
                    .getElementById("studentId")
                    .value
                    .trim();


            let password =
                document
                    .getElementById("password")
                    .value
                    .trim();


            let students =
                getStudents();


            let student =
                students.find(
                    function (student) {

                        return String(student.id) === studentId;

                    }
                );


            if (
                   student &&
                   String(student.password) === password
               ) {

                localStorage.setItem(
                    "studentId",
                    String(student.id)
                );


                alert(
                    "Login successful! Welcome " +
                    student.name
                );


                window.location.href =
                    "student-dashboard.html";

            }

            else {

                alert(
                    "Invalid Student ID or Password"
                );

            }

        }
    );

}

// ==========================================
// FACULTY LOGIN
// ==========================================

let facultyLoginButton =
    document.getElementById("facultyLogin");


if (facultyLoginButton) {

    facultyLoginButton.addEventListener(
        "click",
        function () {

            let facultyId =
                document
                    .getElementById("facultyId")
                    .value;


            let facultyPassword =
                document
                    .getElementById("facultyPassword")
                    .value;


            if (

                facultyId === "F1" &&

                facultyPassword === "123"

            ) {

                alert(
                    "Login successful! Welcome Faculty"
                );


                window.location.href =
                    "faculty-dashboard.html";

            }

            else {

                alert(
                    "Invalid Faculty ID or Password"
                );

            }

        }
    );

}


// ==========================================
// DISPLAY STUDENTS TABLE
// ==========================================

let studentTableBody =
    document.getElementById(
        "studentTableBody"
    );


function displayStudents() {

    if (!studentTableBody) {

        return;

    }


    let students =
        getStudents();


    studentTableBody.innerHTML =
        "";


    students.forEach(
        function (student) {

            studentTableBody.innerHTML += `

                <tr>

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.email}</td>

                    <td>${student.department}</td>

                    <td>${student.year}</td>

                    <td>${student.phone}</td>

                    <td>

                        <button
                            type="button"
                            class="edit-btn"
                            data-id="${student.id}"
                        >
                            Edit
                        </button>


                        <button
                            type="button"
                            class="delete-btn"
                            data-id="${student.id}"
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


if (studentTableBody) {

    displayStudents();

}


// ==========================================
// ADD / UPDATE STUDENT
// ==========================================

let studentForm =
    document.getElementById(
        "studentForm"
    );


let editingStudentId =
    null;


if (studentForm) {

    studentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            let studentId =
                document
                    .getElementById("studentId")
                    .value
                    .trim();


            let name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            let email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            let department =
                document
                    .getElementById("department")
                    .value
                    .trim();


            let year =
                document
                    .getElementById("year")
                    .value
                    .trim();


            let phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            if (

                studentId === "" ||
                name === "" ||
                email === "" ||
                department === "" ||
                year === "" ||
                phone === ""

            ) {

                alert(
                    "Please fill in all student details."
                );

                return;

            }


            let students =
                getStudents();


            
            // UPDATE STUDENT

            if (editingStudentId !== null) {

                // Check whether another student already has this ID
                let duplicateId = students.find(function (student) {
                    return (
                        String(student.id) === studentId &&
                        String(student.id) !== String(editingStudentId)
                    );
                });

                if (duplicateId) {
                    alert("Another student already has this ID!");
                    return;
                }

                // Find the student being edited
                let student = students.find(function (student) {
                    return String(student.id) === String(editingStudentId);
                });

                if (!student) {
                    alert("Student not found!");
                    return;
                }

                // Update student details
                student.id = studentId;
                student.name = name;
                student.email = email;
                student.department = department;
                student.year = year;
                student.phone = phone;

                // Save updated student details
                saveStudents(students);

                alert("Student updated successfully!");

                // Reset editing mode
                editingStudentId = null;

                document.getElementById("studentSubmitButton").textContent =
                    "Add Student";

                let cancelButton = document.getElementById("cancelEditButton");

                if (cancelButton) {
                    cancelButton.style.display = "none";
                }
            }


            // ADD NEW STUDENT

            else {

                
                let existingStudent = students.find(function (student) {
                     return String(student.id) === String(studentId);
                 });

              if (existingStudent) {
                    alert("Student ID already exists! Please enter a different ID.");
                        return;
                 }



                if (existingStudent) {

                    alert(
                        "Student ID already exists!"
                    );

                    return;

                }


                students.push({

                    id:
                        studentId,

                    name:
                        name,

                    email:
                        email,

                    department:
                        department,

                    year:
                        year,

                    phone:
                        phone,

                    password:
                        "123"

                });


                saveStudents(
                    students
                );


                alert(
                    "Student added successfully!"
                );

            }


            studentForm.reset();


            displayStudents();

        }
    );

}


// ==========================================
// EDIT / DELETE STUDENT
// ==========================================

if (studentTableBody) {

    studentTableBody.addEventListener(
        "click",
        function (event) {

            let studentId =
                event.target.dataset.id;


            // DELETE

            if (

                event.target.classList.contains(
                    "delete-btn"
                )

            ) {

                let confirmDelete =
                    confirm(
                        "Are you sure you want to delete this student?"
                    );


                if (confirmDelete) {

                    let students =
                        getStudents();


                    students =
                        students.filter(
                            function (student) {

                        return String(student.id) !== String(studentId);        

                            }
                        );


                    saveStudents(
                        students
                    );


                    displayStudents();


                    alert(
                        "Student deleted successfully!"
                    );

                }

            }


            // EDIT

            if (

                event.target.classList.contains(
                    "edit-btn"
                )

            ) {

                let students =
                    getStudents();


                let student =
                    students.find(
                        function (student) {

                            return (
                                student.id ===
                                studentId
                            );

                        }
                    );


                if (student) {

                    editingStudentId =
                        student.id;


                    document
                        .getElementById(
                            "studentId"
                        )
                        .value =
                        student.id;


                    document
                        .getElementById(
                            "name"
                        )
                        .value =
                        student.name;


                    document
                        .getElementById(
                            "email"
                        )
                        .value =
                        student.email;


                    document
                        .getElementById(
                            "department"
                        )
                        .value =
                        student.department;


                    document
                        .getElementById(
                            "year"
                        )
                        .value =
                        student.year;


                    document
                        .getElementById(
                            "phone"
                        )
                        .value =
                        student.phone;


                    document
                        .getElementById(
                            "studentSubmitButton"
                        )
                        .textContent =
                        "Update Student";


                    document
                        .getElementById(
                            "cancelEditButton"
                        )
                        .style.display =
                        "inline-block";

                }

            }

        }
    );

}


// ==========================================
// CANCEL EDIT
// ==========================================

let cancelEditButton =
    document.getElementById(
        "cancelEditButton"
    );


if (cancelEditButton) {

    cancelEditButton.addEventListener(
        "click",
        function () {

            editingStudentId =
                null;


            studentForm.reset();


            document
                .getElementById(
                    "studentSubmitButton"
                )
                .textContent =
                "Add Student";


            cancelEditButton.style.display =
                "none";

        }
    );

}


// ==========================================
// SEARCH STUDENT
// ==========================================

let searchStudentButton =
    document.getElementById(
        "searchStudentButton"
    );


let clearSearchButton =
    document.getElementById(
        "clearSearchButton"
    );


let studentSearch =
    document.getElementById(
        "studentSearch"
    );


if (

    searchStudentButton &&
    studentSearch

) {

    searchStudentButton.addEventListener(
        "click",
        function () {

            let searchValue =
                studentSearch
                    .value
                    .toLowerCase()
                    .trim();


            let rows =
                studentTableBody
                    .getElementsByTagName(
                        "tr"
                    );


            for (

                let i = 0;

                i < rows.length;

                i++

            ) {

                let id =
                    rows[i]
                        .cells[0]
                        .textContent
                        .toLowerCase();


                let name =
                    rows[i]
                        .cells[1]
                        .textContent
                        .toLowerCase();


                if (

                    id.includes(
                        searchValue
                    ) ||

                    name.includes(
                        searchValue
                    )

                ) {

                    rows[i].style.display =
                        "";

                }

                else {

                    rows[i].style.display =
                        "none";

                }

            }

        }
    );

}


// ==========================================
// CLEAR STUDENT SEARCH
// ==========================================

if (clearSearchButton) {

    clearSearchButton.addEventListener(
        "click",
        function () {

            studentSearch.value =
                "";


            displayStudents();

        }
    );

}

// ==========================================
// DYNAMIC ATTENDANCE PAGE
// ==========================================

let attendanceTableBody =
    document.getElementById("attendanceTableBody");

if (attendanceTableBody) {

    let students = getStudents();

    attendanceTableBody.innerHTML = "";

    if (students.length === 0) {

        attendanceTableBody.innerHTML = `
            <tr>
                <td colspan="5">No students available.</td>
            </tr>
        `;

    } else {

        students.forEach(function (student) {

            attendanceTableBody.innerHTML += `
                <tr>
                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>
                        <input
                            type="radio"
                            name="status${student.id}"
                            value="Present"
                            aria-label="Present for ${student.name}"
                        >
                    </td>

                    <td>
                        <input
                            type="radio"
                            name="status${student.id}"
                            value="Absent"
                            checked
                            aria-label="Absent for ${student.name}"
                        >
                    </td>

                    <td>
                        <input
                            type="radio"
                            name="status${student.id}"
                            value="Late"
                            aria-label="Late for ${student.name}"
                        >
                    </td>
                </tr>
            `;

        });

    }

}

 
// ==========================================
// SAVE ATTENDANCE
// ==========================================

let saveButton = document.getElementById("saveAttendance");

if (saveButton) {

    saveButton.addEventListener("click", function () {

        let date = document.getElementById("date").value;
        let subject = document.getElementById("subject").value;
        let classTime = document.getElementById("classTime").value;

        if (date === "" || subject === "" || classTime === "") {

            alert("Please select Date, Subject and Class Time.");
            return;

        }

        let students = getStudents();

        if (students.length === 0) {

            alert("No students found. Please add students first.");
            return;

        }

        let attendanceRecord = {
            date: date,
            subject: subject,
            time: classTime,
            students: []
        };

        for (let i = 0; i < students.length; i++) {

            let student = students[i];

            let selectedStatus = document.querySelector(
                `input[name="status${student.id}"]:checked`
            );

            if (!selectedStatus) {

                alert("Please select attendance for " + student.name);
                return;

            }

            attendanceRecord.students.push({

                id: student.id,
                name: student.name,
                status: selectedStatus.value,
                time: classTime

            });

        }

        let attendanceHistory =
            JSON.parse(localStorage.getItem("attendanceHistory")) || [];

        // Prevent saving the same class session twice
        let duplicateRecord = attendanceHistory.some(function (record) {

            return (
                record.date === date &&
                record.subject === subject &&
                record.time === classTime
            );

        });

        if (duplicateRecord) {

            alert("Attendance for this class session has already been saved!");
            return;

        }

        attendanceHistory.push(attendanceRecord);

        localStorage.setItem(
            "attendanceHistory",
            JSON.stringify(attendanceHistory)
        );

        alert("Attendance saved successfully!");

    });

}

// ==========================================
// DYNAMIC REPORTS
// ==========================================

let attendanceDetails =
    document.getElementById(
        "attendanceDetails"
    );


let attendanceSummaryDetails =
    document.getElementById(
        "attendanceSummaryDetails"
    );


let searchButton =
    document.getElementById(
        "searchReport"
    );


if (

    attendanceDetails ||
    attendanceSummaryDetails

) {

    loadAttendanceReports();

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        function () {

            loadAttendanceReports();

        }
    );

}


// ==========================================
// LOAD ATTENDANCE REPORTS
// ==========================================

function loadAttendanceReports() {

    let studentIdInput =
        document.getElementById(
            "studentId"
        );


    let fromDateInput =
        document.getElementById(
            "fromDate"
        );


    let toDateInput =
        document.getElementById(
            "toDate"
        );


    let studentId =
        studentIdInput
            ? studentIdInput.value.trim()
            : "";


    let fromDate =
        fromDateInput
            ? fromDateInput.value
            : "";


    let toDate =
        toDateInput
            ? toDateInput.value
            : "";


    let attendanceHistory =
        JSON.parse(

            localStorage.getItem(
                "attendanceHistory"
            )

        ) || [];


    let students =
        getStudents();


    // ======================================
    // ATTENDANCE DETAILS
    // ======================================

    if (attendanceDetails) {

        attendanceDetails.innerHTML =
            "";


        let recordsFound =
            false;


        attendanceHistory.forEach(
            function (attendanceData) {

                let dateMatches =
                    true;


                if (

                    fromDate !== "" &&
                    attendanceData.date < fromDate

                ) {

                    dateMatches =
                        false;

                }


                if (

                    toDate !== "" &&
                    attendanceData.date > toDate

                ) {

                    dateMatches =
                        false;

                }


                if (!dateMatches) {

                    return;

                }


                if (

                    attendanceData.students

                ) {

                    attendanceData.students.forEach(
                        function (student) {

                            if (

                                studentId !== "" &&
                                String(student.id) !== String(studentId)
                            ) {

                                return;

                            }


                            attendanceDetails.innerHTML += `

                                <tr>

                                    <td>${attendanceData.date}</td>

                                    <td>${student.id}</td>

                                    <td>${student.name}</td>

                                    <td>${attendanceData.subject}</td>

                                     <td>
                                         <span class="status ${student.status.toLowerCase()}">
                                               ${student.status}
                                        </span>
                                     </td>

                                    <td>${student.time || "-"}</td>

                                </tr>

                            `;


                            recordsFound =
                                true;

                        }
                    );

                }

            }
        );


        if (!recordsFound) {

            attendanceDetails.innerHTML = `

                <tr>

                    <td colspan="6">

                        No matching attendance records found

                    </td>

                </tr>

            `;

        }

    }


    // ======================================
    // ATTENDANCE SUMMARY
    // ======================================

    if (attendanceSummaryDetails) {

        attendanceSummaryDetails.innerHTML =
            "";


        let studentsSummary =
            {};


        students.forEach(
            function (student) {

                studentsSummary[
                    student.id
                ] = {

                    name:
                        student.name,

                    total:
                        0,

                    present:
                        0,

                    absent:
                        0,

                    late:
                        0

                };

            }
        );


        attendanceHistory.forEach(
            function (attendanceData) {

                let dateMatches =
                    true;


                if (

                    fromDate !== "" &&
                    attendanceData.date < fromDate

                ) {

                    dateMatches =
                        false;

                }


                if (

                    toDate !== "" &&
                    attendanceData.date > toDate

                ) {

                    dateMatches =
                        false;

                }


                if (!dateMatches) {

                    return;

                }


                if (

                    attendanceData.students

                ) {

                    attendanceData.students.forEach(
                        function (student) {

                            if (

                                studentId !== "" &&
                               String(student.id) !== String(studentId)

                            ) {

                                return;

                            }


                            if (

                                !studentsSummary[
                                    student.id
                                ]

                            ) {

                                studentsSummary[
                                    student.id
                                ] = {

                                    name:
                                        student.name,

                                    total:
                                        0,

                                    present:
                                        0,

                                    absent:
                                        0,

                                    late:
                                        0

                                };

                            }


                            let summary =
                                studentsSummary[
                                    student.id
                                ];


                            summary.total++;


                            let status =
                                student.status
                                    .toLowerCase();


                            if (
                                status === "present"
                            ) {

                                summary.present++;

                            }

                            else if (
                                status === "absent"
                            ) {

                                summary.absent++;

                            }

                            else if (
                                status === "late"
                            ) {

                                summary.late++;

                            }

                        }
                    );

                }

            }
        );


        for (

            let id in studentsSummary

        ) {

            if (

                studentId !== "" &&
                String(id) !== String(studentId)

            ) {

                continue;

            }


            let student =
                studentsSummary[id];


            let percentage =
                0;


            if (
                student.total > 0
            ) {

                percentage =

                    (

                        (
                            student.present +
                            student.late
                        )

                        /

                        student.total

                    ) * 100;

            }


            attendanceSummaryDetails.innerHTML += `

                <tr>

                    <td>${id}</td>

                    <td>${student.name}</td>

                    <td>${student.total}</td>

                    <td>${student.present}</td>

                    <td>${student.absent}</td>

                    <td>${student.late}</td>

                    <td>${percentage.toFixed(2)}%</td>

                </tr>

            `;

        }

    }

}


// ==========================================
// STUDENT DASHBOARD
// ==========================================

let welcomeName =
    document.getElementById(
        "welcomeName"
    );


if (welcomeName) {

    let savedStudentId =
        localStorage.getItem(
            "studentId"
        );


    let students =
        getStudents();


    let currentStudent =
        students.find(
            function (student) {

               return String(student.id) === String(savedStudentId);

            }
        );


    if (currentStudent) {

        welcomeName.textContent =
            currentStudent.name;


        if (
            document.getElementById(
                "displayId"
            )
        ) {

            document
                .getElementById(
                    "displayId"
                )
                .textContent =
                currentStudent.id;


            document
                .getElementById(
                    "displayName"
                )
                .textContent =
                currentStudent.name;


            document
                .getElementById(
                    "displayEmail"
                )
                .textContent =
                currentStudent.email;


            document
                .getElementById(
                    "displayDepartment"
                )
                .textContent =
                currentStudent.department;


            document
                .getElementById(
                    "displayYear"
                )
                .textContent =
                currentStudent.year;

        }

    }

}

// ==========================================
// STUDENT ATTENDANCE OVERVIEW
// ==========================================

let savedStudentId =
    localStorage.getItem("studentId");

let totalClassesElement =
    document.getElementById("totalClasses");


if (savedStudentId && totalClassesElement) {

    let attendanceHistory =
        JSON.parse(
            localStorage.getItem("attendanceHistory")
        ) || [];


    let totalClasses = 0;
    let presentClasses = 0;
    let absentClasses = 0;
    let lateClasses = 0;


    // Subject-wise attendance data
    let subjects = {

        "Web Technologies": {
            total: 0,
            present: 0,
            absent: 0,
            late: 0
        },

        "Database Management": {
            total: 0,
            present: 0,
            absent: 0,
            late: 0
        },

        "Computer Networks": {
            total: 0,
            present: 0,
            absent: 0,
            late: 0
        }

    };


    // Read attendance history
    attendanceHistory.forEach(
        function (record) {

            if (!record.students) {
                return;
            }


            let studentRecord =
                record.students.find(
                    function (student) {

                        return (
                            String(student.id) ===
                            String(savedStudentId)
                        );

                    }
                );


            if (studentRecord) {

                // Overall attendance
                totalClasses++;


                if (
                    studentRecord.status ===
                    "Present"
                ) {

                    presentClasses++;

                }

                else if (
                    studentRecord.status ===
                    "Absent"
                ) {

                    absentClasses++;

                }

                else if (
                    studentRecord.status ===
                    "Late"
                ) {

                    lateClasses++;

                }


                // Subject-wise attendance
                if (subjects[record.subject]) {

                    subjects[
                        record.subject
                    ].total++;


                    if (
                        studentRecord.status ===
                        "Present"
                    ) {

                        subjects[
                            record.subject
                        ].present++;

                    }

                    else if (
                        studentRecord.status ===
                        "Absent"
                    ) {

                        subjects[
                            record.subject
                        ].absent++;

                    }

                    else if (
                        studentRecord.status ===
                        "Late"
                    ) {

                        subjects[
                            record.subject
                        ].late++;

                    }

                }

            }

        }
    );


    // Overall attendance percentage
    let attendancePercentage = calculateAttendancePercentage(
    presentClasses,
    lateClasses,
    totalClasses
);


    // Display overall attendance
    document.getElementById(
        "totalClasses"
    ).textContent =
        totalClasses;


    document.getElementById(
        "presentClasses"
    ).textContent =
        presentClasses;


    document.getElementById(
        "absentClasses"
    ).textContent =
        absentClasses;


    document.getElementById(
        "lateClasses"
    ).textContent =
        lateClasses;


    document.getElementById(
        "attendancePercentage"
    ).textContent =
        attendancePercentage.toFixed(2) + "%";


    // Function to calculate subject percentage
    function calculateSubjectPercentage(subject) {

    let percentage = calculateAttendancePercentage(
        subject.present,
        subject.late,
        subject.total
    );

    return percentage.toFixed(2) + "%";

}


    // Web Technologies
    document.getElementById(
        "webTotal"
    ).textContent =
        subjects[
            "Web Technologies"
        ].total;


    document.getElementById(
        "webPresent"
    ).textContent =
        subjects[
            "Web Technologies"
        ].present;


    document.getElementById(
        "webAbsent"
    ).textContent =
        subjects[
            "Web Technologies"
        ].absent;


    document.getElementById(
        "webLate"
    ).textContent =
        subjects[
            "Web Technologies"
        ].late;


    document.getElementById(
        "webPercentage"
    ).textContent =
        calculateSubjectPercentage(
            subjects[
                "Web Technologies"
            ]
        );


    // Database Management
    document.getElementById(
        "dbTotal"
    ).textContent =
        subjects[
            "Database Management"
        ].total;


    document.getElementById(
        "dbPresent"
    ).textContent =
        subjects[
            "Database Management"
        ].present;


    document.getElementById(
        "dbAbsent"
    ).textContent =
        subjects[
            "Database Management"
        ].absent;


    document.getElementById(
        "dbLate"
    ).textContent =
        subjects[
            "Database Management"
        ].late;


    document.getElementById(
        "dbPercentage"
    ).textContent =
        calculateSubjectPercentage(
            subjects[
                "Database Management"
            ]
        );


    // Computer Networks
    document.getElementById(
        "cnTotal"
    ).textContent =
        subjects[
            "Computer Networks"
        ].total;


    document.getElementById(
        "cnPresent"
    ).textContent =
        subjects[
            "Computer Networks"
        ].present;


    document.getElementById(
        "cnAbsent"
    ).textContent =
        subjects[
            "Computer Networks"
        ].absent;


    document.getElementById(
        "cnLate"
    ).textContent =
        subjects[
            "Computer Networks"
        ].late;


    document.getElementById(
        "cnPercentage"
    ).textContent =
        calculateSubjectPercentage(
            subjects[
                "Computer Networks"
            ]
        );

}

// ==========================================
// MY ATTENDANCE
// ==========================================

let myAttendanceDetails =
    document.getElementById(
        "myAttendanceDetails"
    );


if (myAttendanceDetails) {

    let savedStudentId =
        localStorage.getItem(
            "studentId"
        );


    let attendanceHistory =
        JSON.parse(
            localStorage.getItem(
                "attendanceHistory"
            )
        ) || [];


    myAttendanceDetails.innerHTML =
        "";


    let recordsFound =
        false;


    attendanceHistory.forEach(
        function (attendanceData) {

            if (!attendanceData.students) {

                return;

            }


            let student =
                attendanceData.students.find(
                    function (student) {

                        return (
                            String(student.id) ===
                            String(savedStudentId)
                        );

                    }
                );


            if (student) {

                myAttendanceDetails.innerHTML += `

                    <tr>

                        <td>
                            ${attendanceData.date}
                        </td>

                        <td>
                            ${attendanceData.subject}
                        </td>

                        <td>
                            ${student.status}
                        </td>

                        <td>
                            ${student.time || "-"}
                        </td>

                    </tr>

                `;


                recordsFound =
                    true;

            }

        }
    );


    if (!recordsFound) {

        myAttendanceDetails.innerHTML = `

            <tr>

                <td colspan="4">

                    No attendance records found

                </td>

            </tr>

        `;

    }

}

// ==========================================
// MY REPORTS
// ==========================================

let reportTotal =
    document.getElementById("reportTotal");


if (reportTotal) {

    let savedStudentId =
        localStorage.getItem("studentId");


    let attendanceHistory =
        JSON.parse(
            localStorage.getItem("attendanceHistory")
        ) || [];


    let total = 0;
    let present = 0;
    let absent = 0;
    let late = 0;


    attendanceHistory.forEach(
        function (attendanceData) {

            if (!attendanceData.students) {

                return;

            }


            let student =
                attendanceData.students.find(
                    function (student) {

                        return (
                            String(student.id) ===
                            String(savedStudentId)
                        );

                    }
                );


            if (student) {

                total++;


                if (student.status === "Present") {

                    present++;

                }
                else if (student.status === "Absent") {

                    absent++;

                }
                else if (student.status === "Late") {

                    late++;

                }

            }

        }
    );


    let percentage = calculateAttendancePercentage(
    present,
    late,
    total
);


    if (total > 0) {

        percentage =
            ((present + late) / total) * 100;

    }


    document.getElementById("reportTotal").textContent =
        total;


    document.getElementById("reportPresent").textContent =
        present;


    document.getElementById("reportAbsent").textContent =
        absent;


    document.getElementById("reportLate").textContent =
        late;


    document.getElementById("reportPercentage").textContent =
        percentage.toFixed(2) + "%";

}

// ==========================================
// DYNAMIC FACULTY DASHBOARD
// ==========================================

let facultyTotalStudents =
    document.getElementById(
        "facultyTotalStudents"
    );


if (facultyTotalStudents) {

    let students =
        getStudents();


    let attendanceHistory =
        JSON.parse(
            localStorage.getItem(
                "attendanceHistory"
            )
        ) || [];


    let presentToday = 0;
    let absentToday = 0;
    let lateToday = 0;


    let now = new Date();

    let today =
               now.getFullYear() + "-" +
               String(now.getMonth() + 1).padStart(2, "0") + "-" +
               String(now.getDate()).padStart(2, "0");


    attendanceHistory.forEach(
        function (attendanceData) {

            if (

                attendanceData.date === today &&
                attendanceData.students

            ) {

                attendanceData.students.forEach(
                    function (student) {

                        let status =
                            student.status
                                .toLowerCase();


                        if (
                            status === "present"
                        ) {

                            presentToday++;

                        }

                        else if (
                            status === "absent"
                        ) {

                            absentToday++;

                        }

                        else if (
                            status === "late"
                        ) {

                            lateToday++;

                        }

                    }
                );

            }

        }
    );


    document
        .getElementById(
            "facultyTotalStudents"
        )
        .textContent =
        students.length;


    let facultyPresent =
        document.getElementById(
            "facultyPresentToday"
        );


    if (facultyPresent) {

        facultyPresent.textContent =
            presentToday;

    }


    let facultyAbsent =
        document.getElementById(
            "facultyAbsentToday"
        );


    if (facultyAbsent) {

        facultyAbsent.textContent =
            absentToday;

    }


    let facultyLate =
        document.getElementById(
            "facultyLateToday"
        );


    if (facultyLate) {

        facultyLate.textContent =
            lateToday;

    }

}


// ==========================================
// RECENT ATTENDANCE ACTIVITY
// LATEST 5 RECORDS
// ==========================================

let recentAttendanceTableBody =
    document.getElementById(
        "recentAttendanceBody"
    );


if (recentAttendanceTableBody) {

    let recentAttendanceHistory =
        JSON.parse(
            localStorage.getItem(
                "attendanceHistory"
            )
        ) || [];


    recentAttendanceTableBody.innerHTML =
        "";


    let recentAttendanceRecords =
        [];


    recentAttendanceHistory.forEach(
        function (attendanceData) {

            if (
                attendanceData.students
            ) {

                attendanceData.students.forEach(
                    function (student) {

                        recentAttendanceRecords.push({

                            date:
                                attendanceData.date,

                            subject:
                                attendanceData.subject,

                            id:
                                student.id,

                            name:
                                student.name,

                            status:
                                student.status,

                            time:
                                student.time || "-"

                        });

                    }
                );

            }

        }
    );


    recentAttendanceRecords.reverse();


    let latestFiveRecords =
        recentAttendanceRecords.slice(
            0,
            5
        );


    if (
        latestFiveRecords.length === 0
    ) {

        recentAttendanceTableBody.innerHTML = `

            <tr>

                <td colspan="6">

                    No recent attendance records found

                </td>

            </tr>

        `;

    }

    else {

        latestFiveRecords.forEach(
            function (record) {

                recentAttendanceTableBody.innerHTML += `

                    <tr>

                        <td>${record.date}</td>

                        <td>${record.id}</td>

                        <td>${record.name}</td>

                        <td>${record.subject}</td>

                        <td>
                             <span class="status ${record.status.toLowerCase()}">
                                    ${record.status}
                             </span>
                         </td>

                        <td>${record.time}</td>

                    </tr>

                `;

            }
        );

    }

}


// ==========================================
// OVERALL ATTENDANCE SUMMARY
// ==========================================

let overallTotalRecordsElement =
    document.getElementById(
        "overallTotalRecords"
    );


if (overallTotalRecordsElement) {

    let overallAttendanceHistory =
        JSON.parse(
            localStorage.getItem(
                "attendanceHistory"
            )
        ) || [];


    let overallTotalRecords = 0;
    let overallPresentCount = 0;
    let overallAbsentCount = 0;
    let overallLateCount = 0;


    overallAttendanceHistory.forEach(
        function (attendanceData) {

            if (
                attendanceData.students
            ) {

                attendanceData.students.forEach(
                    function (student) {

                        overallTotalRecords++;


                        let status =
                            student.status
                                .toLowerCase();


                        if (
                            status === "present"
                        ) {

                            overallPresentCount++;

                        }

                        else if (
                            status === "absent"
                        ) {

                            overallAbsentCount++;

                        }

                        else if (
                            status === "late"
                        ) {

                            overallLateCount++;

                        }

                    }
                );

            }

        }
    );

    let overallPercentage = calculateAttendancePercentage(
    overallPresentCount,
    overallLateCount,
    overallTotalRecords
);

    if (
        overallTotalRecords > 0
    ) {

        overallPercentage =

            (

                (
                    overallPresentCount +
                    overallLateCount
                )

                /

                overallTotalRecords

            ) * 100;

    }


    document
        .getElementById(
            "overallTotalRecords"
        )
        .textContent =
        overallTotalRecords;


    document
        .getElementById(
            "overallPresent"
        )
        .textContent =
        overallPresentCount;


    document
        .getElementById(
            "overallAbsent"
        )
        .textContent =
        overallAbsentCount;


    document
        .getElementById(
            "overallLate"
        )
        .textContent =
        overallLateCount;


    document
        .getElementById(
            "overallAttendancePercentage"
        )
        .textContent =
        overallPercentage.toFixed(2) +
        "%";

}


// ==========================================
// STUDENT-WISE ATTENDANCE OVERVIEW
// ==========================================

let studentAttendanceOverview =
    document.getElementById(
        "studentAttendanceOverview"
    );


if (studentAttendanceOverview) {

    let overviewStudents =
        getStudents();


    let overviewAttendanceHistory =
        JSON.parse(
            localStorage.getItem(
                "attendanceHistory"
            )
        ) || [];


    let studentAttendanceSummary =
        {};


    overviewStudents.forEach(
        function (student) {

            studentAttendanceSummary[
                student.id
            ] = {

                id:
                    student.id,

                name:
                    student.name,

                total:
                    0,

                present:
                    0,

                absent:
                    0,

                late:
                    0

            };

        }
    );


    overviewAttendanceHistory.forEach(
        function (attendanceData) {

            if (
                attendanceData.students
            ) {

                attendanceData.students.forEach(
                    function (attendanceStudent) {

                        let studentId =
                            attendanceStudent.id;


                        if (
                            !studentAttendanceSummary[
                                studentId
                            ]
                        ) {

                            studentAttendanceSummary[
                                studentId
                            ] = {

                                id:
                                    studentId,

                                name:
                                    attendanceStudent.name,

                                total:
                                    0,

                                present:
                                    0,

                                absent:
                                    0,

                                late:
                                    0

                            };

                        }


                        let summary =
                            studentAttendanceSummary[
                                studentId
                            ];


                        summary.total++;


                        let status =
                            attendanceStudent.status
                                .toLowerCase();


                        if (
                            status === "present"
                        ) {

                            summary.present++;

                        }

                        else if (
                            status === "absent"
                        ) {

                            summary.absent++;

                        }

                        else if (
                            status === "late"
                        ) {

                            summary.late++;

                        }

                    }
                );

            }

        }
    );


    studentAttendanceOverview.innerHTML =
        "";


    let studentIds =
        Object.keys(
            studentAttendanceSummary
        );


    if (
        studentIds.length === 0
    ) {

        studentAttendanceOverview.innerHTML = `

            <tr>

                <td colspan="7">

                    No student attendance data found

                </td>

            </tr>

        `;

    }

    else {

        studentIds.forEach(
            function (studentId) {

                let student =
                    studentAttendanceSummary[
                        studentId
                    ];


                 let attendancePercentage = calculateAttendancePercentage(
                  student.present,
                  student.late,
                  student.total
                );

                if (
                    student.total > 0
                ) {

                    attendancePercentage =

                        (

                            (
                                student.present +
                                student.late
                            )

                            /

                            student.total

                        )

                        * 100;

                }


                studentAttendanceOverview.innerHTML += `

                    <tr>

                        <td>${student.id}</td>

                        <td>${student.name}</td>

                        <td>${student.total}</td>

                        <td>${student.present}</td>

                        <td>${student.absent}</td>

                        <td>${student.late}</td>

                        <td>
                            ${attendancePercentage.toFixed(2)}%
                        </td>

                    </tr>

                `;

            }
        );

    }

}


// ==========================================
// LOW ATTENDANCE ALERT
// ==========================================

let lowAttendanceBody =
    document.getElementById(
        "lowAttendanceBody"
    );


if (lowAttendanceBody) {

    const minimumAttendancePercentage =
        75;


    let lowAttendanceStudents =
        getStudents();


    let lowAttendanceHistory =
        JSON.parse(
            localStorage.getItem(
                "attendanceHistory"
            )
        ) || [];


    let lowAttendanceSummary =
        {};


    lowAttendanceStudents.forEach(
        function (student) {

            lowAttendanceSummary[
                student.id
            ] = {

                id:
                    student.id,

                name:
                    student.name,

                total:
                    0,

                present:
                    0,

                late:
                    0

            };

        }
    );


    lowAttendanceHistory.forEach(
        function (attendanceData) {

            if (
                attendanceData.students
            ) {

                attendanceData.students.forEach(
                    function (attendanceStudent) {

                        let currentStudentId =
                            attendanceStudent.id;


                        if (
                            lowAttendanceSummary[
                                currentStudentId
                            ]
                        ) {

                            let studentSummary =
                                lowAttendanceSummary[
                                    currentStudentId
                                ];


                            studentSummary.total++;


                            let attendanceStatus =
                                attendanceStudent.status
                                    .toLowerCase();


                            if (
                                attendanceStatus ===
                                "present"
                            ) {

                                studentSummary.present++;

                            }

                            else if (
                                attendanceStatus ===
                                "late"
                            ) {

                                studentSummary.late++;

                            }

                        }

                    }
                );

            }

        }
    );


    lowAttendanceBody.innerHTML =
        "";


    let lowAttendanceFound =
        false;


    Object.keys(
        lowAttendanceSummary
    ).forEach(
        function (studentId) {

            let student =
                lowAttendanceSummary[
                    studentId
                ];


            if (
                student.total === 0
            ) {

                return;

            }

            let attendancePercentage = calculateAttendancePercentage(
              student.present,
              student.late,
              student.total
          );

            if (
                attendancePercentage <
                minimumAttendancePercentage
            ) {

                lowAttendanceBody.innerHTML += `

                    <tr>

                        <td>${student.id}</td>

                        <td>${student.name}</td>

                        <td>${student.total}</td>

                        <td>${student.present}</td>

                        <td>${student.late}</td>

                        <td>
                            ${attendancePercentage.toFixed(2)}%
                        </td>

                        <td>
                            ⚠️ Low Attendance
                        </td>

                    </tr>

                `;


                lowAttendanceFound =
                    true;

            }

        }
    );


    if (
        !lowAttendanceFound
    ) {

        lowAttendanceBody.innerHTML = `

            <tr>

                <td colspan="7">

                    ✅ No students currently have low attendance.

                </td>

            </tr>

        `;

    }

}

// ==========================================
// ATTENDANCE STATUS CHART
// ==========================================

let attendanceStatusChart =
    document.getElementById("attendanceStatusChart");

if (attendanceStatusChart) {

    let chartAttendanceHistory =
        JSON.parse(
            localStorage.getItem("attendanceHistory")
        ) || [];

    let chartPresentCount = 0;
    let chartAbsentCount = 0;
    let chartLateCount = 0;

    chartAttendanceHistory.forEach(
        function (attendanceData) {

            if (!attendanceData.students) return;

            attendanceData.students.forEach(
                function (student) {

                    let chartStatus =
                        student.status.toLowerCase();

                    if (chartStatus === "present") {
                        chartPresentCount++;
                    }

                    else if (chartStatus === "absent") {
                        chartAbsentCount++;
                    }

                    else if (chartStatus === "late") {
                        chartLateCount++;
                    }

                }
            );

        }
    );

    let chartContext =
        attendanceStatusChart.getContext("2d");

    attendanceStatusChart.width = 700;
    attendanceStatusChart.height = 350;

    let chartValues = [
        chartPresentCount,
        chartAbsentCount,
        chartLateCount
    ];

    let chartLabels = [
        "Present",
        "Absent",
        "Late"
    ];

    let chartMaximumValue =
        Math.max(...chartValues, 1);

    let chartLeft = 80;
    let chartBottom = 290;
    let chartHeight = 220;
    let chartBarWidth = 100;
    let chartSpacing = 80;

    // Font
    chartContext.font = "16px Arial";

   
    // Y-axis numbers and gridlines
    chartContext.font = "12px Arial";
    chartContext.strokeStyle = "#dddddd";
    chartContext.fillStyle = "#333333";
    chartContext.lineWidth = 1;

    let chartSteps = 5;

    for (let i = 0; i <= chartSteps; i++) {

        let y =
            chartBottom -
            (i / chartSteps) * chartHeight;

        let value =
            Math.round(
                (i / chartSteps) * chartMaximumValue
            );

        // Gridline
        chartContext.beginPath();

        chartContext.moveTo(
            chartLeft,
            y
        );

        chartContext.lineTo(
            650,
            y
        );

        chartContext.stroke();

        // Y-axis number
        chartContext.fillText(
            value,
            chartLeft - 30,
            y + 4
        );
    }

    // Draw Y-axis
    chartContext.strokeStyle = "#333333";

    chartContext.beginPath();

    chartContext.moveTo(chartLeft, 40);
    chartContext.lineTo(chartLeft, chartBottom);

    chartContext.stroke();

    // X-axis
    chartContext.beginPath();

    chartContext.moveTo(
        chartLeft,
        chartBottom
    );

    chartContext.lineTo(
        650,
        chartBottom
    );

    chartContext.stroke();


// Draw bars
let chartColors = [
    "#28a745",  // Green - Present
    "#dc3545",  // Red - Absent
    "#ffc107"   // Yellow - Late
];

chartValues.forEach(
    function (value, index) {

        let barHeight =
            (value / chartMaximumValue)
            * chartHeight;

        let x =
            chartLeft +
            50 +
            index *
            (chartBarWidth + chartSpacing);

        let y =
            chartBottom -
            barHeight;

        // Bar color
        chartContext.fillStyle =
            chartColors[index];

        // Draw bar
        chartContext.fillRect(
            x,
            y,
            chartBarWidth,
            barHeight
        );

        // Value color
        chartContext.fillStyle = "#000000";

        chartContext.fillText(
            value,
            x + 45,
            y - 10
        );

        // Label color
        chartContext.fillText(
            chartLabels[index],
            x + 25,
            chartBottom + 30
        );

    }
);

// Y-axis label
chartContext.save();

chartContext.translate(25, 180);
chartContext.rotate(-Math.PI / 2);

chartContext.font = "14px Arial";
chartContext.textAlign = "center";
chartContext.fillStyle = "#333333";
chartContext.fillText(
    "Number of Students",
    0,
    0
);

chartContext.restore();

// X-axis label
chartContext.font = "14px Arial";
chartContext.textAlign = "center";
chartContext.fillStyle = "#333333";

chartContext.fillText(
    "Attendance Status",
    365,
    345
);

    // Chart title
    chartContext.font = "18px Arial";

    chartContext.fillText(
        "Overall Attendance Status",
        250,
        25
    );
}

 // ==========================================
 // STUDENT LOW ATTENDANCE ALERT
 // ==========================================

const lowAttendanceAlert = document.getElementById(
    "studentLowAttendanceAlert"
);

if (lowAttendanceAlert) {
    const savedStudentId = localStorage.getItem("studentId");

    const attendanceHistory = JSON.parse(
        localStorage.getItem("attendanceHistory")
    ) || [];

    let total = 0;
    let attended = 0;

    attendanceHistory.forEach(function (record) {
        if (!Array.isArray(record.students)) {
            return;
        }

        const student = record.students.find(function (item) {
            return String(item.id) === String(savedStudentId);
        });

        if (student) {
            total++;

            const status = String(student.status).toLowerCase();

            if (status === "present" || status === "late") {
                attended++;
            }
        }
    });

    const percentage = total > 0
        ? (attended / total) * 100
        : 0;

    const message = document.getElementById(
        "studentLowAttendanceMessage"
    );

    if (total > 0 && percentage < 75) {
        lowAttendanceAlert.style.display = "block";

        message.textContent =
            "Your attendance is " + percentage.toFixed(2) +
            "%, below the required 75%. Please attend upcoming classes regularly.";
    } else {
        lowAttendanceAlert.style.display = "none";
    }
}

// ==========================================
// DISPLAY SAVED ATTENDANCE RECORDS
// ==========================================

let savedAttendanceBody =
    document.getElementById("savedAttendanceBody");

function displaySavedAttendance() {

    if (!savedAttendanceBody) {
        return;
    }

    let attendanceHistory =
        JSON.parse(localStorage.getItem("attendanceHistory")) || [];

    savedAttendanceBody.innerHTML = "";

    if (attendanceHistory.length === 0) {

        savedAttendanceBody.innerHTML = `
            <tr>
                <td colspan="5">No saved attendance records found.</td>
            </tr>
        `;

        return;
    }

    attendanceHistory.forEach(function (record, index) {

        let totalStudents = record.students
            ? record.students.length
            : 0;

        savedAttendanceBody.innerHTML += `
            <tr>
                <td>${record.date}</td>
                <td>${record.subject}</td>
                <td>${record.time || "-"}</td>
                <td>${totalStudents}</td>
                <td>
                    <button
                        type="button"
                        class="edit-attendance-btn"
                        data-index="${index}">
                        Edit
                    </button>

                    <button
                        type="button"
                        class="delete-attendance-btn"
                        data-index="${index}">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}

// Display records when the page loads
if (savedAttendanceBody) {
    displaySavedAttendance();
}
