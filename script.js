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
 // CONVERT OLD ATTENDANCE RECORDS
 // ==========================================

(function () {

    let history = JSON.parse(
        localStorage.getItem("attendanceHistory") || "[]"
    );

    let students = getStudents();
    let changed = false;

    history.forEach(function (record) {

        if (Array.isArray(record.students)) {
            return;
        }

        let convertedStudents = [];

        for (let i = 1; i <= 3; i++) {

            let oldStudent = record["student" + i];

            if (!oldStudent) {
                continue;
            }

            let matchingStudent = students.find(function (student) {
                return String(student.name).trim().toLowerCase() ===
                    String(oldStudent.name).trim().toLowerCase();
            });

            let studentInfo = matchingStudent || students[i - 1];

            convertedStudents.push({

                id: studentInfo ? String(studentInfo.id) : String(i),

                name: oldStudent.name ||
                    (studentInfo ? studentInfo.name : "Unknown"),

                status: String(oldStudent.status || "")
                    .toLowerCase()
                    .replace(/^./, function (letter) {
                        return letter.toUpperCase();
                    }),

                time: oldStudent.time || record.time || "-"

            });

        }

        record.students = convertedStudents;
        changed = true;

    });

    if (changed) {

        localStorage.setItem(
            "attendanceHistory",
            JSON.stringify(history)
        );

        console.log("Old attendance records converted:", history.length);

    }

})();



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

                let statusClass = "";

                if (student.status === "Present") {
                    statusClass = "status-present";
                }
                else if (student.status === "Absent") {
                    statusClass = "status-absent";
                }
                else if (student.status === "Late") {
                    statusClass = "status-late";
                }


                myAttendanceDetails.innerHTML += `

                    <tr>

                        <td>
                            ${attendanceData.date}
                        </td>

                        <td>
                            ${attendanceData.subject}
                        </td>

                        <td>
                            <span class="attendance-status ${statusClass}">
                                ${student.status}
                            </span>
                        </td>

                        <td>
                            ${student.time || "-"}
                        </td>

                    </tr>

                `;


                recordsFound = true;

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
// FIX OLD AND NEW ATTENDANCE DATA FORMATS
// ==========================================

(function () {

    let attendanceHistory = JSON.parse(
        localStorage.getItem("attendanceHistory") || "[]"
    );

    let students = getStudents();

    let dataChanged = false;

    attendanceHistory.forEach(function (record) {

        // Convert old format into the new students array
        if (!Array.isArray(record.students)) {

            let studentRecords = [];

            Object.keys(record).forEach(function (key) {

                if (/^student\d+$/.test(key)) {

                    let oldStudent = record[key];

                    if (!oldStudent || typeof oldStudent !== "object") {
                        return;
                    }

                    // Find the matching student by name
                    let matchingStudent = students.find(function (student) {
                        return String(student.name).toLowerCase() ===
                            String(oldStudent.name).toLowerCase();
                    });

                    // Use student number as fallback
                    let studentNumber = Number(key.replace("student", ""));

                    let studentInfo =
                        matchingStudent || students[studentNumber - 1];

                    let status = String(
                        oldStudent.status || ""
                    ).toLowerCase();

                    if (status === "present") {
                        status = "Present";
                    } else if (status === "absent") {
                        status = "Absent";
                    } else if (status === "late") {
                        status = "Late";
                    }

                    studentRecords.push({

                        id: studentInfo
                            ? studentInfo.id
                            : "",

                        name: oldStudent.name ||
                            (studentInfo ? studentInfo.name : "Unknown"),

                        status: status,

                        time: oldStudent.time ||
                            record.time || "-"

                    });

                }

            });

            record.students = studentRecords;

            dataChanged = true;

        }

        // Make existing statuses consistent
        if (Array.isArray(record.students)) {

            record.students.forEach(function (student) {

                let status = String(
                    student.status || ""
                ).toLowerCase();

                if (status === "present") {
                    student.status = "Present";
                    dataChanged = true;
                } else if (status === "absent") {
                    student.status = "Absent";
                    dataChanged = true;
                } else if (status === "late") {
                    student.status = "Late";
                    dataChanged = true;
                }

            });

        }

    });

    // Save converted records without deleting existing information
    if (dataChanged) {

        localStorage.setItem(
            "attendanceHistory",
            JSON.stringify(attendanceHistory)
        );

        console.log("Attendance history format corrected successfully!");

    }

})();

// ==========================================
// FIX OLD ATTENDANCE DATA FORMAT
// ==========================================

(function () {

    let attendanceHistory = JSON.parse(
        localStorage.getItem("attendanceHistory") || "[]"
    );

    let students = JSON.parse(
        localStorage.getItem("students") || "[]"
    );

    let updatedHistory = attendanceHistory.map(function (record) {

        // Already in the new format
        if (Array.isArray(record.students)) {
            return record;
        }

        let convertedStudents = [];

        // Convert student1, student2, student3 into an array
        for (let i = 1; i <= 3; i++) {

            let oldStudent = record["student" + i];

            if (!oldStudent) continue;

            let matchingStudent = students.find(function (student) {
                return student.name === oldStudent.name;
            });

            if (!matchingStudent) continue;

            convertedStudents.push({

                id: String(matchingStudent.id),
                name: oldStudent.name,

                status: String(oldStudent.status).toLowerCase()
                    .replace(/^./, function (letter) {
                        return letter.toUpperCase();
                    }),

                time: oldStudent.time || record.time || "-"

            });

        }

        return {
            date: record.date,
            subject: record.subject,
            time: record.time || "-",
            students: convertedStudents
        };

    });

    localStorage.setItem(
        "attendanceHistory",
        JSON.stringify(updatedHistory)
    );

})();


// ==========================================
// DYNAMIC FACULTY DASHBOARD
// ==========================================

(function () {

    let attendanceHistory = JSON.parse(
        localStorage.getItem("attendanceHistory") || "[]"
    );

    let students = JSON.parse(
        localStorage.getItem("students") || "[]"
    );

    let updatedHistory = attendanceHistory.map(function (record) {

        // Already in the new format
        if (Array.isArray(record.students)) {
            return record;
        }

        let convertedStudents = [];

        // Convert student1, student2, student3 into an array
        for (let i = 1; i <= 3; i++) {

            let oldStudent = record["student" + i];

            if (!oldStudent) continue;

            let matchingStudent = students.find(function (student) {
                return student.name === oldStudent.name;
            });

            if (!matchingStudent) continue;

            convertedStudents.push({

                id: String(matchingStudent.id),
                name: oldStudent.name,

                status: String(oldStudent.status).toLowerCase()
                    .replace(/^./, function (letter) {
                        return letter.toUpperCase();
                    }),

                time: oldStudent.time || record.time || "-"

            });

        }

        return {
            date: record.date,
            subject: record.subject,
            time: record.time || "-",
            students: convertedStudents
        };

    });

    localStorage.setItem(
        "attendanceHistory",
        JSON.stringify(updatedHistory)
    );

})();



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

// ==========================================
// LEAVE REQUEST MANAGEMENT
// ==========================================

(function () {

    // Get saved leave requests
    function getLeaveRequests() {
        return JSON.parse(localStorage.getItem("leaveRequests")) || [];
    }

    // Save leave requests
    function saveLeaveRequests(requests) {
        localStorage.setItem("leaveRequests", JSON.stringify(requests));
    }

    // Display student's leave requests
    function displayStudentLeaveRequests() {

        const list = document.getElementById("studentLeaveRequestList");

        if (!list) return;

        const studentId = localStorage.getItem("studentId");

        const requests = getLeaveRequests().filter(
            request => String(request.studentId) === String(studentId)
        );

        if (requests.length === 0) {
            list.innerHTML = "<p>No leave requests submitted yet.</p>";
            return;
        }

        list.innerHTML = requests.map(request => `
            <div class="request-card">
                <p><strong>Leave Dates:</strong> ${request.startDate} to ${request.endDate}</p>
                <p><strong>Reason:</strong> ${request.reason}</p>
                <p><strong>Status:</strong>
                    <span class="request-status status-${request.status.toLowerCase()}">
                        ${request.status}
                    </span>
                </p>
                <p><strong>Faculty Response:</strong>
                    ${request.facultyResponse || "Waiting for faculty response"}
                </p>
                <p><strong>Submitted:</strong> ${request.submittedOn}</p>
            </div>
        `).join("");
    }

    // Student submits leave request
    const leaveForm = document.getElementById("leaveRequestForm");

    if (leaveForm) {

        leaveForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const studentId = localStorage.getItem("studentId");
            const students = JSON.parse(localStorage.getItem("students")) || [];

            const student = students.find(
                item => String(item.id) === String(studentId)
            );

            if (!studentId || !student) {
                alert("Please log in as a student before submitting a request.");
                return;
            }

            const startDate = document.getElementById("leaveStartDate").value;
            const endDate = document.getElementById("leaveEndDate").value;
            const reason = document.getElementById("leaveReason").value.trim();

            if (endDate < startDate) {
                alert("End date cannot be earlier than start date.");
                return;
            }

            const requests = getLeaveRequests();

            requests.push({
                id: Date.now().toString(),
                studentId: studentId,
                studentName: student.name,
                startDate: startDate,
                endDate: endDate,
                reason: reason,
                status: "Pending",
                facultyResponse: "",
                submittedOn: new Date().toLocaleString()
            });

            saveLeaveRequests(requests);

            document.getElementById("leaveRequestMessage").textContent =
                "Leave request submitted successfully!";

            leaveForm.reset();

            displayStudentLeaveRequests();
        });
    }

    // Display all leave requests on faculty dashboard
    function displayFacultyLeaveRequests() {

        const list = document.getElementById("facultyLeaveRequestList");

        if (!list) return;

        const requests = getLeaveRequests();

        const total = requests.length;
        const pending = requests.filter(r => r.status === "Pending").length;
        const approved = requests.filter(r => r.status === "Approved").length;
        const rejected = requests.filter(r => r.status === "Rejected").length;

        document.getElementById("totalLeaveRequests").textContent = total;
        document.getElementById("pendingLeaveRequests").textContent = pending;
        document.getElementById("approvedLeaveRequests").textContent = approved;
        document.getElementById("rejectedLeaveRequests").textContent = rejected;

        if (requests.length === 0) {
            list.innerHTML = "<p>No leave requests available.</p>";
            return;
        }

        list.innerHTML = requests.map(request => `
            <div class="request-card">

                <p><strong>Student:</strong> ${request.studentName}</p>
                <p><strong>Student ID:</strong> ${request.studentId}</p>
                <p><strong>Leave Dates:</strong> ${request.startDate} to ${request.endDate}</p>
                <p><strong>Reason:</strong> ${request.reason}</p>
                <p><strong>Status:</strong> ${request.status}</p>

                <p><strong>Faculty Response:</strong>
                    ${request.facultyResponse || "No response yet"}
                </p>

                ${request.status === "Pending" ? `
                    <button class="approve-request"
                        onclick="updateLeaveRequest('${request.id}', 'Approved')">
                        Approve
                    </button>

                    <button class="reject-request"
                        onclick="updateLeaveRequest('${request.id}', 'Rejected')">
                        Reject
                    </button>
                ` : ""}

            </div>
        `).join("");
    }

    // Make functions available to faculty buttons
    window.updateLeaveRequest = function (id, status) {

        const response = prompt("Enter your response to the student:");

        if (response === null) return;

        const requests = getLeaveRequests();

        const request = requests.find(item => item.id === id);

        if (!request) return;

        request.status = status;
        request.facultyResponse = response.trim() || "No additional comments.";

        saveLeaveRequests(requests);

        displayFacultyLeaveRequests();
    };

    // Load the correct dashboard information
    displayStudentLeaveRequests();
    displayFacultyLeaveRequests();

})();
// ==========================================
// ATTENDANCE CORRECTION REQUEST MANAGEMENT
// ==========================================

(function () {

    // Get saved correction requests
    function getCorrectionRequests() {
        return JSON.parse(
            localStorage.getItem("attendanceCorrectionRequests")
        ) || [];
    }

    // Save correction requests
    function saveCorrectionRequests(requests) {
        localStorage.setItem(
            "attendanceCorrectionRequests",
            JSON.stringify(requests)
        );
    }

    // Display correction requests on student dashboard
    function displayStudentCorrectionRequests() {

        const list = document.getElementById(
            "studentCorrectionRequestList"
        );

        if (!list) return;

        const studentId = localStorage.getItem("studentId");

        const requests = getCorrectionRequests().filter(
            request => String(request.studentId) === String(studentId)
        );

        if (requests.length === 0) {
            list.innerHTML = "<p>No attendance correction requests submitted yet.</p>";
            return;
        }

        list.innerHTML = requests.map(request => `
            <div class="request-card">

                <p><strong>Date:</strong> ${request.date}</p>
                <p><strong>Subject:</strong> ${request.subject}</p>
                <p><strong>Class Time:</strong> ${request.classTime}</p>
                <p><strong>Current Status:</strong> ${request.currentStatus}</p>
                <p><strong>Requested Status:</strong> ${request.requestedStatus}</p>
                <p><strong>Reason:</strong> ${request.reason}</p>

                <p><strong>Status:</strong>
                    <span class="request-status status-${request.status.toLowerCase()}">
                        ${request.status}
                    </span>
                </p>

                <p><strong>Faculty Response:</strong>
                    ${request.facultyResponse || "Waiting for faculty response"}
                </p>

                <p><strong>Submitted:</strong> ${request.submittedOn}</p>

            </div>
        `).join("");
    }

    // Student submits correction request
    const correctionForm = document.getElementById(
        "attendanceCorrectionForm"
    );

    if (correctionForm) {

        correctionForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const studentId = localStorage.getItem("studentId");
            const students = JSON.parse(
                localStorage.getItem("students")
            ) || [];

            const student = students.find(
                item => String(item.id) === String(studentId)
            );

            if (!studentId || !student) {
                alert("Please log in as a student before submitting a request.");
                return;
            }

            const date = document.getElementById("correctionDate").value;
            const subject = document.getElementById("correctionSubject").value;
            const classTime = document.getElementById("correctionClassTime").value;
            const currentStatus = document.getElementById("currentAttendanceStatus").value;
            const requestedStatus = document.getElementById("requestedAttendanceStatus").value;
            const reason = document.getElementById("correctionReason").value.trim();

            if (currentStatus === requestedStatus) {
                alert("Please select a different requested attendance status.");
                return;
            }

            const requests = getCorrectionRequests();

            requests.push({

                id: Date.now().toString(),
                studentId: studentId,
                studentName: student.name,
                date: date,
                subject: subject,
                classTime: classTime,
                currentStatus: currentStatus,
                requestedStatus: requestedStatus,
                reason: reason,
                status: "Pending",
                facultyResponse: "",
                submittedOn: new Date().toLocaleString()

            });

            saveCorrectionRequests(requests);

            document.getElementById("correctionRequestMessage").textContent =
                "Attendance correction request submitted successfully!";

            correctionForm.reset();

            displayStudentCorrectionRequests();

        });
    }

    // Display correction requests on faculty dashboard
    function displayFacultyCorrectionRequests() {

        const list = document.getElementById(
            "facultyCorrectionRequestList"
        );

        if (!list) return;

        const requests = getCorrectionRequests();

        if (requests.length === 0) {
            list.innerHTML = "<p>No attendance correction requests available.</p>";
            return;
        }

        list.innerHTML = requests.map(request => `

            <div class="request-card">

                <p><strong>Student:</strong> ${request.studentName}</p>
                <p><strong>Student ID:</strong> ${request.studentId}</p>
                <p><strong>Date:</strong> ${request.date}</p>
                <p><strong>Subject:</strong> ${request.subject}</p>
                <p><strong>Class Time:</strong> ${request.classTime}</p>
                <p><strong>Current Status:</strong> ${request.currentStatus}</p>
                <p><strong>Requested Status:</strong> ${request.requestedStatus}</p>
                <p><strong>Reason:</strong> ${request.reason}</p>
                <p><strong>Status:</strong> ${request.status}</p>

                <p><strong>Faculty Response:</strong>
                    ${request.facultyResponse || "No response yet"}
                </p>

                ${request.status === "Pending" ? `

                    <button class="approve-request"
                        onclick="updateAttendanceCorrectionRequest('${request.id}', 'Approved')">
                        Approve
                    </button>

                    <button class="reject-request"
                        onclick="updateAttendanceCorrectionRequest('${request.id}', 'Rejected')">
                        Reject
                    </button>

                ` : ""}

            </div>

        `).join("");
    }

    // Faculty approves or rejects a correction request
    window.updateAttendanceCorrectionRequest = function (id, status) {

        const response = prompt("Enter your response to the student:");

        if (response === null) return;

        const requests = getCorrectionRequests();

        const request = requests.find(item => item.id === id);

        if (!request || request.status !== "Pending") return;

        // Update original attendance record only when approved
        if (status === "Approved") {

            const attendanceHistory = JSON.parse(
                localStorage.getItem("attendanceHistory")
            ) || [];

            const session = attendanceHistory.find(record =>
                String(record.date) === String(request.date) &&
                String(record.subject) === String(request.subject) &&
                String(record.time) === String(request.classTime)
            );

            if (!session) {
                alert("Matching attendance session was not found. Please check the date, subject and class time.");
                return;
            }

            const studentRecord = session.students.find(record =>
                String(record.id) === String(request.studentId)
            );

            if (!studentRecord) {
                alert("Student attendance record was not found.");
                return;
            }

            if (studentRecord.status !== request.currentStatus) {
                alert("The current attendance status does not match the original record. Please verify it before approving.");
                return;
            }

            studentRecord.status = request.requestedStatus;

            localStorage.setItem(
                "attendanceHistory",
                JSON.stringify(attendanceHistory)
            );
        }

        request.status = status;

        request.facultyResponse =
            response.trim() || "No additional comments.";

        saveCorrectionRequests(requests);

        displayFacultyCorrectionRequests();

    };

    // Load correction requests
    displayStudentCorrectionRequests();
    displayFacultyCorrectionRequests();

})();
// ==========================================
// SMART ATTENDANCE PREDICTION
// ==========================================

(function () {

    function displayAttendancePrediction() {

        const predictionList = document.getElementById(
            "attendancePredictionList"
        );

        if (!predictionList) return;

        const studentId = localStorage.getItem("studentId");

        const attendanceHistory = JSON.parse(
            localStorage.getItem("attendanceHistory")
        ) || [];

        if (!studentId) {
            predictionList.innerHTML =
                "<p>Please log in to view your attendance prediction.</p>";
            return;
        }

        const subjectData = {};

        attendanceHistory.forEach(session => {

            const studentRecord = (session.students || []).find(
                student => String(student.id) === String(studentId)
            );

            if (!studentRecord) return;

            const subject = session.subject;

            if (!subjectData[subject]) {
                subjectData[subject] = {
                    total: 0,
                    attended: 0
                };
            }

            subjectData[subject].total++;

            if (
                studentRecord.status === "Present" ||
                studentRecord.status === "Late"
            ) {
                subjectData[subject].attended++;
            }

        });

        const subjects = Object.keys(subjectData);

        if (subjects.length === 0) {
            predictionList.innerHTML =
                "<p>No attendance records available yet.</p>";
            return;
        }

        predictionList.innerHTML = subjects.map(subject => {

            const data = subjectData[subject];

            const percentage = Math.round(
                (data.attended / data.total) * 100
            );

            const requiredClasses = Math.max(
                0,
                Math.ceil(3 * data.total - 4 * data.attended)
            );

            let status;
            let statusClass;
            let prediction;

            if (percentage >= 75) {

                status = "On Track";
                statusClass = "status-approved";

                prediction = "Your attendance meets the 75% requirement.";

            } else {

                status = "At Risk";
                statusClass = "status-rejected";

                prediction =
                    "Attend the next " + requiredClasses +
                    " consecutive classes to reach 75%.";

            }

            return `
                <div class="request-card">

                    <h4>${subject}</h4>

                    <p>
                        <strong>Attendance:</strong>
                        ${percentage}%
                    </p>

                    <p>
                        <strong>Classes Attended:</strong>
                        ${data.attended} / ${data.total}
                    </p>

                    <p>
                        <strong>Prediction:</strong>
                        <span class="request-status ${statusClass}">
                            ${status}
                        </span>
                    </p>

                    <p>${prediction}</p>

                </div>
            `;

        }).join("");

    }

    displayAttendancePrediction();

})();
// ==========================================
// ATTENDANCE DEFAULTER EARLY WARNING SYSTEM
// ==========================================

(function () {

    function displayAttendanceDefaulters() {

        const list = document.getElementById(
            "attendanceDefaulterList"
        );

        if (!list) return;

        const students = JSON.parse(
            localStorage.getItem("students")
        ) || [];

        const attendanceHistory = JSON.parse(
            localStorage.getItem("attendanceHistory")
        ) || [];

        if (students.length === 0 || attendanceHistory.length === 0) {
            list.innerHTML = "<p>No student or attendance records available.</p>";
            return;
        }

        const defaulters = students.map(student => {

            let totalClasses = 0;
            let attendedClasses = 0;

            attendanceHistory.forEach(session => {

                const record = (session.students || []).find(
                    item => String(item.id) === String(student.id)
                );

                if (record) {

                    totalClasses++;

                    if (
                        record.status === "Present" ||
                        record.status === "Late"
                    ) {
                        attendedClasses++;
                    }

                }

            });

            const percentage = totalClasses > 0
                ? Math.round((attendedClasses / totalClasses) * 100)
                : 0;

            let warningLevel;
            let warningColor;

            if (percentage >= 75) {

                warningLevel = "Safe";
                warningColor = "#16a34a";

            } else if (percentage >= 60) {

                warningLevel = "Warning";
                warningColor = "#d97706";

            } else {

                warningLevel = "Critical";
                warningColor = "#dc2626";

            }

            return {
                name: student.name,
                id: student.id,
                percentage: percentage,
                totalClasses: totalClasses,
                attendedClasses: attendedClasses,
                warningLevel: warningLevel,
                warningColor: warningColor
            };

        });

        // Show Critical and Warning students first
        defaulters.sort((a, b) => a.percentage - b.percentage);

        list.innerHTML = defaulters.map(student => `

            <div class="request-card">

                <h4>${student.name}</h4>

                <p><strong>Student ID:</strong> ${student.id}</p>

                <p>
                    <strong>Attendance:</strong>
                    ${student.percentage}%
                </p>

                <p>
                    <strong>Classes Attended:</strong>
                    ${student.attendedClasses} / ${student.totalClasses}
                </p>

                <p>
                    <strong>Warning Level:</strong>
                    <span style="color: ${student.warningColor}; font-weight: bold;">
                        ${student.warningLevel}
                    </span>
                </p>

            </div>

        `).join("");

    }

    displayAttendanceDefaulters();

})();

 // ==========================================
 // STUDENT ATTENDANCE CALENDAR
 // ==========================================

(function () {

    const calendar = document.getElementById("attendanceCalendar");
    const monthHeading = document.getElementById("attendanceCalendarMonth");
    const details = document.getElementById("selectedDateAttendance");

    if (!calendar || !monthHeading || !details) return;

    let currentDate = new Date();
    let selectedDate = "";

    const studentId = localStorage.getItem("studentId");

    // Get attendance history
    function getAttendanceHistory() {

        return JSON.parse(
            localStorage.getItem("attendanceHistory") || "[]"
        );

    }

    // Get attendance records for the logged-in student on a date
    function getStudentRecords(date) {

        const history = getAttendanceHistory();

        const records = [];

        history.forEach(session => {

            const sessionDate = String(session.date || "").slice(0, 10);

            if (sessionDate !== date) return;

            const studentRecord = (session.students || []).find(student =>
                String(student.id) === String(studentId)
            );

            if (studentRecord) {

                records.push({
                    subject: session.subject || "Not specified",
                    status: studentRecord.status || "Not specified",
                    time: session.time || studentRecord.time || "Not specified"
                });

            }

        });

        return records;

    }

    // Display attendance details when a date is clicked
    function displaySelectedDate(date) {

        selectedDate = date;

        const records = getStudentRecords(date);

        details.innerHTML = "";

        const heading = document.createElement("h4");

        const dateObject = new Date(date + "T00:00:00");

        heading.textContent = "Attendance on " +
            dateObject.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });

        details.appendChild(heading);

        if (records.length === 0) {

            const message = document.createElement("p");

            message.textContent = "No attendance records for this date.";

            details.appendChild(message);

            return;
        }

        records.forEach(record => {

            const card = document.createElement("div");
            card.className = "request-card";

            const subject = document.createElement("p");
            subject.textContent = "Subject: " + record.subject;

            const time = document.createElement("p");
            time.textContent = "Class Time: " + record.time;

            const status = document.createElement("p");
            status.textContent = "Status: " + record.status;

            status.style.fontWeight = "bold";

            if (record.status === "Present") {
                status.style.color = "#15803d";
            } else if (record.status === "Absent") {
                status.style.color = "#dc2626";
            } else if (record.status === "Late") {
                status.style.color = "#d97706";
            }

            card.appendChild(subject);
            card.appendChild(time);
            card.appendChild(status);

            details.appendChild(card);

        });

    }

    // Display the monthly calendar
    function displayCalendar() {

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();

        const totalDays = new Date(year, month + 1, 0).getDate();

        monthHeading.textContent = currentDate.toLocaleString(
            "default",
            {
                month: "long",
                year: "numeric"
            }
        );

        calendar.innerHTML = "";

        const calendarGrid = document.createElement("div");
        calendarGrid.className = "calendar-grid";

        // Weekday headings
        const dayNames = [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
        ];

        dayNames.forEach(day => {

            const heading = document.createElement("div");

            heading.className = "calendar-weekday";
            heading.textContent = day;

            calendarGrid.appendChild(heading);

        });

        // Empty spaces before the first date
        for (let i = 0; i < firstDay; i++) {

            const empty = document.createElement("div");

            empty.className = "calendar-empty";

            calendarGrid.appendChild(empty);

        }

        // Create each date
        for (let day = 1; day <= totalDays; day++) {

            const date =
                year + "-" +
                String(month + 1).padStart(2, "0") + "-" +
                String(day).padStart(2, "0");

            const records = getStudentRecords(date);

            let status = "No Record";

            if (records.length > 0) {

                const statuses = records.map(record => record.status);

                if (statuses.every(item => item === "Present")) {
                    status = "Present";
                } else if (statuses.every(item => item === "Absent")) {
                    status = "Absent";
                } else if (statuses.every(item => item === "Late")) {
                    status = "Late";
                } else {
                    status = "Mixed";
                }

            }

            const dayButton = document.createElement("button");

            dayButton.type = "button";
            dayButton.className = "calendar-day";

            if (status === "Present") {
                dayButton.classList.add("calendar-present");
            } else if (status === "Absent") {
                dayButton.classList.add("calendar-absent");
            } else if (status === "Late") {
                dayButton.classList.add("calendar-late");
            } else if (status === "Mixed") {
                dayButton.classList.add("calendar-mixed");
            } else {
                dayButton.classList.add("calendar-no-record");
            }

            if (selectedDate === date) {
                dayButton.classList.add("calendar-selected");
            }

            const dayNumber = document.createElement("span");
            dayNumber.textContent = day;

            const statusLabel = document.createElement("small");
            statusLabel.textContent = status;

            dayButton.appendChild(dayNumber);
            dayButton.appendChild(statusLabel);

            dayButton.addEventListener("click", function () {

                displaySelectedDate(date);

                displayCalendar();

            });

            calendarGrid.appendChild(dayButton);

        }

        calendar.appendChild(calendarGrid);

    }

    // Previous month
    window.changeAttendanceMonth = function (change) {

        currentDate.setDate(1);

        currentDate.setMonth(currentDate.getMonth() + change);

        displayCalendar();

    };

    // Initial display
    if (!studentId) {

        calendar.textContent =
            "Please log in to view your attendance calendar.";

        return;

    }

    displayCalendar();

})();

// Smart Attendance Prediction

(function () {

    function calculateAttendancePrediction() {

        const predictionElement = document.getElementById("predictedAttendance");
        const messageElement = document.getElementById("predictionMessage");

        if (!predictionElement || !messageElement) return;

        const attendanceHistory = JSON.parse(
            localStorage.getItem("attendanceHistory") || "[]"
        );

        const studentId = localStorage.getItem("studentId");

        // Get this student's attendance records
        const studentRecords = [];

        attendanceHistory.forEach(record => {

            const studentRecord = record.students?.find(student =>
                String(student.id) === String(studentId)
            );

            if (studentRecord) {
                studentRecords.push(studentRecord);
            }

        });

        if (studentRecords.length === 0) {
            predictionElement.textContent = "--%";
            messageElement.textContent = "No attendance records available yet.";
            return;
        }

        // Use the 10 most recent class records
        const recentRecords = studentRecords.slice(-10);

        let attendedClasses = 0;

        recentRecords.forEach(record => {

            if (
                record.status === "Present" ||
                record.status === "Late"
            ) {
                attendedClasses++;
            }

        });

        // Estimate future attendance using the recent attendance pattern
        const predictedPercentage = Math.round(
            (attendedClasses / recentRecords.length) * 100
        );

        predictionElement.textContent = predictedPercentage + "%";

        if (predictedPercentage >= 75) {
            messageElement.textContent =
                "Good progress! Your recent attendance pattern is above 75%. Keep it up.";
        } else {
            messageElement.textContent =
                "Warning! Your recent attendance pattern is below 75%. Try to attend upcoming classes regularly.";
        }

    }

    document.addEventListener(
        "DOMContentLoaded",
        calculateAttendancePrediction
    );

})();
// Attendance Defaulter Early Warning System

(function () {

    function displayAttendanceWarnings() {

        const warningList = document.getElementById("attendanceWarningList");

        if (!warningList) return;

        const students = JSON.parse(
            localStorage.getItem("students") || "[]"
        );

        const attendanceHistory = JSON.parse(
            localStorage.getItem("attendanceHistory") || "[]"
        );

        let defaulterCount = 0;
        let atRiskCount = 0;
        let safeCount = 0;

        warningList.innerHTML = "";

        students.forEach(student => {

            let totalClasses = 0;
            let attendedClasses = 0;

            attendanceHistory.forEach(record => {

                const studentRecord = record.students?.find(item =>
                    String(item.id) === String(student.id)
                );

                if (studentRecord) {

                    totalClasses++;

                    if (
                        studentRecord.status === "Present" ||
                        studentRecord.status === "Late"
                    ) {
                        attendedClasses++;
                    }

                }

            });

            // Skip students without attendance records
            if (totalClasses === 0) return;

            const percentage = Math.round(
                (attendedClasses / totalClasses) * 100
            );

            let category = "";
            let categoryColor = "";

            if (percentage < 75) {

                defaulterCount++;
                category = "Defaulter";
                categoryColor = "#dc2626";

            } else if (percentage <= 80) {

                atRiskCount++;
                category = "At Risk";
                categoryColor = "#d97706";

            } else {

                safeCount++;
                category = "Safe";
                categoryColor = "#15803d";

            }

            const studentCard = document.createElement("div");
            studentCard.className = "warning-student";

            const name = document.createElement("h4");
            name.textContent = student.name;

            const attendance = document.createElement("p");
            attendance.textContent = "Attendance: " + percentage + "%";

            const status = document.createElement("p");
            status.textContent = "Status: " + category;
            status.style.color = categoryColor;
            status.style.fontWeight = "bold";

            studentCard.appendChild(name);
            studentCard.appendChild(attendance);
            studentCard.appendChild(status);

            warningList.appendChild(studentCard);

        });

        document.getElementById("defaulterCount").textContent =
            defaulterCount;

        document.getElementById("atRiskCount").textContent =
            atRiskCount;

        document.getElementById("safeCount").textContent =
            safeCount;

        if (warningList.innerHTML === "") {
            warningList.textContent =
                "No attendance records available for students yet.";
        }

    }

    document.addEventListener(
        "DOMContentLoaded",
        displayAttendanceWarnings
    );

})();
// Subject-wise Performance Comparison

(function () {

    function displaySubjectPerformance() {

        const container = document.getElementById(
            "subjectPerformanceComparison"
        );

        if (!container) return;

        const students = JSON.parse(
            localStorage.getItem("students") || "[]"
        );

        const attendanceHistory = JSON.parse(
            localStorage.getItem("attendanceHistory") || "[]"
        );

        const subjectData = {};

        attendanceHistory.forEach(record => {

            const subject = record.subject;

            if (!subject) return;

            if (!subjectData[subject]) {
                subjectData[subject] = {
                    total: 0,
                    attended: 0
                };
            }

            record.students?.forEach(studentRecord => {

                subjectData[subject].total++;

                if (
                    studentRecord.status === "Present" ||
                    studentRecord.status === "Late"
                ) {
                    subjectData[subject].attended++;
                }

            });

        });

        container.innerHTML = "";

        const subjects = Object.keys(subjectData);

        if (subjects.length === 0) {
            container.textContent =
                "No subject attendance records available yet.";
            return;
        }

        subjects.forEach(subject => {

            const data = subjectData[subject];

            const percentage = Math.round(
                (data.attended / data.total) * 100
            );

            const card = document.createElement("div");
            card.className = "subject-performance-card";

            const title = document.createElement("h4");
            title.textContent = subject;

            const details = document.createElement("p");
            details.textContent =
                "Attendance: " + percentage + "%";

            const count = document.createElement("p");
            count.textContent =
                "Attended: " + data.attended +
                " / " + data.total + " classes";

            const progress = document.createElement("div");
            progress.className = "subject-progress";

            const fill = document.createElement("div");
            fill.className = "subject-progress-fill";
            fill.style.width = percentage + "%";

            if (percentage < 75) {
                fill.style.backgroundColor = "#dc2626";
            } else if (percentage <= 80) {
                fill.style.backgroundColor = "#d97706";
            } else {
                fill.style.backgroundColor = "#15803d";
            }

            progress.appendChild(fill);

            card.appendChild(title);
            card.appendChild(details);
            card.appendChild(count);
            card.appendChild(progress);

            container.appendChild(card);

        });

    }

    document.addEventListener(
        "DOMContentLoaded",
        displaySubjectPerformance
    );

})();
// ==========================================
// FACULTY DASHBOARD KPI CARDS
// ==========================================

(function () {

    let students = getStudents();

    let history = JSON.parse(
        localStorage.getItem("attendanceHistory") || "[]"
    );

    let today = new Date().toISOString().split("T")[0];

    let present = 0;
    let absent = 0;
    let late = 0;

    history.forEach(function (record) {

        if (record.date !== today) {
            return;
        }

        if (!Array.isArray(record.students)) {
            return;
        }

        record.students.forEach(function (student) {

            let status = String(student.status).toLowerCase();

            if (status === "present") {
                present++;
            }
            else if (status === "absent") {
                absent++;
            }
            else if (status === "late") {
                late++;
            }

        });

    });

    document.getElementById("facultyTotalStudents").textContent =
        students.length;

    document.getElementById("facultyPresentToday").textContent =
        present;

    document.getElementById("facultyAbsentToday").textContent =
        absent;

    document.getElementById("facultyLateToday").textContent =
        late;

})();