package com.form.patientRegistration.controller;

import com.form.patientRegistration.entity.Patient;
import com.form.patientRegistration.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")  // allow requests from admin.html
@RestController
public class PatientController {
    @Autowired
    public PatientService patientService;

//    @PostMapping ("/api/patients")
//    public Patient savePatient(@RequestBody Patient data) {
//        return patientService.savePatient(data);
//    }

    // ✅ Create or Update Patient (Single POST endpoint)
    @PostMapping("/api/patients")
    public Patient saveOrUpdatePatient(@RequestBody Patient patient) {

        return patientService.savePatient(patient);
    }

    @GetMapping("/api/patients")
    public List<Patient> getPatients(){
        return patientService.getPatients();
    }


}


