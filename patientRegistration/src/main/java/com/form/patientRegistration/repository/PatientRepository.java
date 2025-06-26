package com.form.patientRegistration.repository;

import com.form.patientRegistration.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // Get only active patients (flag = 0)
    @Query("SELECT p FROM Patient p WHERE p.flag = 0")
    List<Patient> findActivePatients();
}

