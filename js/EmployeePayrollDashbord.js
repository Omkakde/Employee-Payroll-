$(document).ready(function () { 
    renderEmployees(); 
});


function renderEmployees(filteredEmployees) {
    const employees = filteredEmployees || JSON.parse(localStorage.getItem("employees")) ;
    $("#table-body").empty(); 

    if (employees.length === 0) {
        $("#table-body").append("<tr><td colspan='6'>No employees found</td></tr>");
        return;
    }

    employees.forEach((employee, index) => {
        const { name, profile, gender, department, salary, startDate } = employee;

        const newRow = `
            <tr>
                <td>
                    <img src="../assets/${profile}.png" alt="${profile}" 
                         style="width: 30px; height: 30px; margin-right:20px;">
                    ${name}
                </td>
                <td>${gender}</td>
                <td  >${department.join(", ")}</td>
                <td>${salary}</td>
                <td>${startDate}</td>
                <td>
                    <button class="delete-btn" data-index="${index}">
                        <img src="../assets/delete-black-18dp.svg" alt="Delete" />
                    </button>
                    <button class="edit-btn" data-index="${index}">
                        <img src="../assets/icons8-edit-24.png" style="height:18px;" alt="Edit" />
                    </button>
                </td>
            </tr>
        `;

        $("#table-body").append(newRow);
    });

    $(".delete-btn").on("click", handleDelete);
    $(".edit-btn").on("click", handleEdit);
}


function handleDelete() {
    const index = $(this).data("index");
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    alert(`Employee Deleted`);
    renderEmployees();
}


function handleEdit() {
    const index = $(this).data("index"); 
    localStorage.setItem("editEmployeeIndex", index); 
    window.location.href = "../pages/EmpolyeePayrollRegister.html";
}

$("#search-button").on("click", function () {
    const searchTerm = $("#search-input").val().toLowerCase();
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    
    const filteredEmployees = employees.filter(employee => 
        Object.values(employee).some(value =>
            String(value).toLowerCase().includes(searchTerm)
        )
    );
    renderEmployees(filteredEmployees); 
});


$(".add-button").on("click", function () {
    window.location.href = "../pages/EmpolyeePayrollRegister.html";
})

