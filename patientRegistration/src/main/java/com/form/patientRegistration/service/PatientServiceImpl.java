package com.form.patientRegistration.service;

import com.form.patientRegistration.entity.Patient;
import com.form.patientRegistration.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Patient savePatient(Patient patientData) {
        if (patientData.getPatientId() != null) {

//            System.out.println("patientData.getPatientId()=======>"+patientData.getPatientId());
            //  Try to find existing patient by ID
            Patient existingPatient = patientRepository.findById(patientData.getPatientId()).get();

                //  Update fields
                existingPatient.setFirstName(patientData.getFirstName());
                existingPatient.setLastName(patientData.getLastName());
                existingPatient.setEmail(patientData.getEmail());
                existingPatient.setContact(patientData.getContact());
                existingPatient.setCity(patientData.getCity());
                existingPatient.setAddress(patientData.getAddress());
                existingPatient.setGender(patientData.getGender());
                existingPatient.setAge(patientData.getAge());
                existingPatient.setBloodGroup(patientData.getBloodGroup());
                existingPatient.setAadhar(patientData.getAadhar());

                return patientRepository.save(existingPatient); //  Save updated patient9
        }else{
            //  Create new patient if ID is null or not found
            return patientRepository.save(patientData);
        }
    }



    @Override
    public List<Patient> getPatients() {

        return patientRepository.findAll();
    }


}
