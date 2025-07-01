$(document).ready(function () {

  $('#patientForm').validate({
    rules: {
      firstName: "required",
      lastName: "required",
      email: {
        required: true,
        email: true
      },
      contact: {
        required: true,
        minlength: 10,
        maxlength: 10
      },
      city: "required",
      address: "required",
      gender: "required",
      age: {
        required: true,
        min: 1
      },
      bloodGroup: "required",
      aadhar: {
        required: true,
        minlength: 12,
        maxlength: 12,
        digits: true
      }
    },
    messages: {
      firstName: "Please enter first name",
      lastName: "Please enter last name",
      email: "Enter a valid email",
      contact: "Enter a 10-digit phone number",
      city: "City is required",
      address: "Address is required",
      gender: "Select a gender",
      age: "Enter valid age",
      bloodGroup: "Choose blood group",
      aadhar: "Enter 12-digit Aadhar number"
    },
    errorPlacement: function (error, element) {
      error.insertAfter(element); // Show error below the input
    },

    highlight: function (element) {
      $(element).removeClass('valid').addClass('error');
    },
    unhighlight: function (element) {
      $(element).removeClass('error').addClass('valid');
    },

    submitHandler: function (form) {
      let data = {
        patientId: $('#patientId').val(), //  Hidden ID field
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        contact: $('#contact').val(),
        city: $('#city').val(),
        address: $('#address').val(),
        gender: $('#gender').val(),
        age: $('#age').val(),
        bloodGroup: $('#bloodGroup').val(),
        aadhar: $('#aadhar').val()
      };

      console.log(data);

      // Send to backend via AJAX
      $.ajax({
        url: '/api/patients',
        type: 'POST', // You can make this dynamic (POST/PUT) based on patientId
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
          alert(" Form submitted successfully!");
          console.log("Server response:", response);

          // Update or Add row in AG Grid
          // if (data.patientId) {
          //   gridOptions.api.applyTransaction({ update: [response] });
          // } else {
          //   gridOptions.api.applyTransaction({ add: [response] });
          // }

          form.reset();
          $('#patientId').val(""); // Clear hidden field
        },
        error: function (err) {
          alert("❌ Submission failed.");
          console.error("Error:", err);
        }
      });

    }
  });

  // AG Grid Setup
  const columnDefs = [
    { headerName: "PatientId", field: "patientId" },
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Email", field: "email" },
    { headerName: "Contact", field: "contact" },
    { headerName: "City", field: "city" },
    { headerName: "Address", field: "address" },
    { headerName: "Age", field: "age" },
    { headerName: "Blood Group", field: "bloodGroup" },
    { headerName: "Aadhar", field: "aadhar" }
  ];

  const rowData = [];

  const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    rowSelection: 'single',
    onRowClicked: onRowClicked,
    defaultColDef: {
      filter: true,
      sort: true,
      flex: 1,
      minWidth: 100,
      resizable: true
    }
  };

  const eGridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(eGridDiv, gridOptions);

  //  Soft Delete Handler
  $('#deleteBtn').click(function () {
    const selectedRow = gridOptions.api.getSelectedRows()[0];

    if (!selectedRow) {
      alert("⚠ Please select a patient to delete.");
      return;
    }

    // Prepare updated data (same data + flag = 1)
    const updatedData = {
      ...selectedRow,
      flag: 1 //  Soft delete indicator
    };

    $.ajax({
      url: '/api/patients',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(updatedData),
      success: function (response) {
        alert(" Patient marked as deleted!");

        //  Remove from grid visually
        gridOptions.api.applyTransaction({ remove: [selectedRow] });

        //  Clear form and hidden id
        $('#patientForm')[0].reset();
        $('#patientId').val("");
        gridOptions.api.deselectAll();
      },
      error: function (err) {
        alert(" Failed to delete patient.");
        console.error("Delete error:", err);
      }
    });
  });

  document.getElementById('searchBtn').addEventListener('click', function () {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // ✅ Check if both dates are selected
    if (startDate && endDate) {
      fetch(`http://localhost:8080/patients/filter?startDate=${startDate}&endDate=${endDate}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          // ✅ Load data into AG Grid
          gridOptions.api.setRowData(data);
        })
        .catch(error => {
          console.error("Error fetching filtered data:", error);
          alert("Failed to fetch patient records.");
        });
    } else {
      alert("Please select both Start and End dates.");
    }
  });



  //  Fill form when row clicked
  function onRowClicked(event) {
    const rowData = event.data;
    $("#patientId").val(rowData.patientId); //  Set hidden field
    $('#firstName').val(rowData.firstName);
    $('#lastName').val(rowData.lastName);
    $('#email').val(rowData.email);
    $('#contact').val(rowData.contact);
    $('#city').val(rowData.city);
    $('#address').val(rowData.address);
    $('#gender').val(rowData.gender);
    $('#age').val(rowData.age);
    $('#bloodGroup').val(rowData.bloodGroup);
    $('#aadhar').val(rowData.aadhar);
  }

  // Load data from backend on page load
  $.ajax({
    url: '/api/patients',
    type: 'GET',
    success: function (data) {
      gridOptions.api.setRowData(data);
    },
    error: function (err) {
      console.error("Failed to fetch patients:", err);
    }
  });

});
