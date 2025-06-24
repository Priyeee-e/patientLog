package com.form.patientRegistration.service;

import com.form.patientRegistration.entity.Patient;
import com.form.patientRegistration.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Patient savePatient(Patient data) {
        return patientRepository.save(data);
    }

    @Override
    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }
}
