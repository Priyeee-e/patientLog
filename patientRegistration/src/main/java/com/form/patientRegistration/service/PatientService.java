package com.form.patientRegistration.service;

import com.form.patientRegistration.entity.Patient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PatientService {
    public Patient savePatient(Patient data);

    public List<Patient> getPatients();
}
