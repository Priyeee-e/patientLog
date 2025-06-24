

// $(document).ready(function () {
//   $('#patientForm').validate({
//     submitHandler: function (form) {
//       let patientData = {
//         firstName: $('#firstName').val(),
//         lastName: $('#lastName').val(),
//         city: $('#city').val(),         // optional
//         address: $('#address').val(),   // optional
//         email: $('#email').val(),
//         contact: $('#contact').val(),
//         gender: $('#gender').val(),
//         age: $('#age').val(),
//         bloodGroup: $('#bloodGroup').val(),
//         aadharNumber: $('#aadhar').val(),

//       };

//       console.log(patientData);
//       alert("Data collected! Check console.");
//     }
//   });
// });

// $(document).ready(function () {
//   // Initialize validation on the form
//   $('#patientForm').validate({
//     rules: {
//       firstName: "required",
//       lastName: "required",
//       email: {
//         required: true,
//         email: true
//       },
//       contact: {
//         required: true,
//         minlength: 10,
//         maxlength: 10
//       },
//       city: "required",
//       address: "required",
//       gender: "required",
//       age: {
//         required: true,
//         min: 0
//       },
//       bloodGroup: "required",
//       aadhar: {
//         required: true,
//         minlength: 12,
//         maxlength: 12,
//         digits: true
//       }
//     },
//     messages: {
//       firstName: "Enter your first name",
//       lastName: "Enter your last name",
//       email: "Enter a valid email address",
//       contact: "Enter a valid 10-digit contact number",
//       city: "Enter your city",
//       address: "Enter your address",
//       gender: "Select your gender",
//       age: "Enter a valid age",
//       bloodGroup: "Select blood group",
//       aadhar: "Enter 12-digit Aadhar number"
//     },

//     submitHandler: function (form) {
//       // Collect form data into an object
//       let patientData = {
//         firstName: $('#firstName').val(),
//         lastName: $('#lastName').val(),
//         email: $('#email').val(),
//         contact: $('#contact').val(),
//         city: $('#city').val(),
//         address: $('#address').val(),
//         gender: $('#gender').val(),
//         age: $('#age').val(),
//         bloodGroup: $('#bloodGroup').val(),
//         aadhar: $('input[name="aadhar"]').val()
//       };

//       // Show in console
//       console.log(patientData);

//       alert("Form submitted successfully!");
//       // form.submit(); // if you want to actually submit or send to backend
//     }
//   });
// });

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

    // // 👇 Custom error placement
    // errorPlacement: function (error, element) {
    //   // error.insertAfter(element); // can be customized to show anywhere
    //    element.attr("placeholder", error.text());
    // },

    errorPlacement: function (error, element) {
  error.insertAfter(element); // ✅ shows error below the input
}
,

      highlight: function (element) {
    $(element).removeClass('valid').addClass('error');
  },
  unhighlight: function (element) {
    $(element).removeClass('error').addClass('valid');
  },

    submitHandler: function (form) {
      let data = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        contact: $('#contact').val(),
        city: $('#city').val(),
        address: $('#address').val(),
        gender: $('#gender').val(),
        age: $('#age').val(),
        bloodGroup: $('#bloodGroup').val(),
        aadhar: $('input[name="aadhar"]').val()
      };
      console.log(data);
      alert("Form is valid and data is collected!");

      $.ajax({
        url: '/api/patients',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
          alert("✅ Form submitted successfully!");
          console.log("Server response:", response);
        },
        error: function (err) {
          alert("❌ Submission failed.");
          console.error("Error:", err);
        }
      });
    }
  });
});

