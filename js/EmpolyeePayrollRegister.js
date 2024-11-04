window.onload = () => {
    const form = document.querySelector(".form");
    let editIndex = localStorage.getItem("editEmployeeIndex");
    let empList = JSON.parse(localStorage.getItem("employees")) || [];

    if (editIndex !== null) {
        const employee = empList[editIndex];

        document.getElementById("name").value = employee.name;
        document.getElementById(employee.profile).checked = true;
        document.querySelector(`input[name="gender"][value="${employee.gender}"]`).checked = true;
        employee.department.forEach(dept => {
            document.querySelector(`input[name="department"][value="${dept}"]`).checked = true;
        });
        document.getElementById("salary").value = employee.salary;
        const [day, month, year] = employee.startDate.split("-");
        document.querySelector('select[name="start_day"]').value = day;
        document.querySelector('select[name="start_month"]').value = month;
        document.querySelector('select[name="start_year"]').value = year;
        document.getElementById("notes").value = employee.notes || "";
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameValue = document.getElementById("name").value.trim();
        const genderInput = document.querySelector('input[name="gender"]:checked');
        const profileInput = document.querySelector('input[name="profile"]:checked');
        const selectedSalary = document.getElementById("salary").value;
        const notesContent = document.getElementById("notes").value.trim();
        const selectedGender = genderInput ? genderInput.value : null;
        const selectedProfile = profileInput ? profileInput.id : null;

        const selectedDepartments = Array.from(
            document.querySelectorAll('input[name="department"]:checked'),
            dept => dept.value
        );

        const day = document.querySelector('select[name="start_day"]').value;
        const month = document.querySelector('select[name="start_month"]').value;
        const year = document.querySelector('select[name="start_year"]').value;
        const dateObj = `${day}-${month}-${year}`;

        if (
            !nameValue || !selectedGender || !selectedProfile ||
            !selectedSalary || selectedDepartments.length === 0 || !dateObj
        ) {
            alert("Please fill all required fields.");
            return;
        }

        let empObj = {
            name: nameValue,
            profile: selectedProfile,
            gender: selectedGender,
            department: selectedDepartments,
            salary: selectedSalary,
            startDate: dateObj,
            notes: notesContent
        };

        if (editIndex !== null) {
            empList[editIndex] = empObj;
            alert("Employee data updated successfully!");
            localStorage.removeItem("editEmployeeIndex");
        } else {
            empList.push(empObj);
            alert("Employee data saved successfully!");
        }

        localStorage.setItem("employees", JSON.stringify(empList));
        form.reset();
        window.location.href = "../pages/EmployeePayrollDashbord.html";
    });

    document.getElementById("resetButton").addEventListener("click", (event) => {
        event.preventDefault();
        form.reset();
    });

    document.getElementById("cancelButton").addEventListener("click", (event) => {
        event.preventDefault();
        form.reset();
        window.location.href = "../pages/EmployeePayrollDashbord.html";
    });
};
