let empList = []
$(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/EmployeeList",
        success: (response) => {
            console.log("Emp List: ", response)
            empList = response
        },
        error: (error) => {
            console.log("Error: ", error);
        },  
    })  
})

$('#fetchBtn').on('click', function(e) {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/EmployeeList",
        data: JSON.stringify({
            "name": "Asfdgv",
            "department": ["111"],
            "gender": "xcvbcnv",
            "salary": "xzcvb",
            "data": "11zxcv1",
            "notes": "111",
            "profile": "./Assets/profile3.png"
        }),
        success: (response) => {
            console.log("Data: ", response)
        },
        error: (error) => {
            console.log("Error: ", error);
        },  
    })
    e.preventDefault()
})



$.ajax({
    type: "DELETE",
    url: `http://localhost:3000/EmployeeList/${employeeId}`,
    success: (response) => {
        console.log("User deleted successfully...", response);
    },
    error: (error) => {
        console.error("Error: ", error);
    }
});