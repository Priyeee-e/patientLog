package com.form.patientRegistration.repository;

import com.form.patientRegistration.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    // Get only active patients (flag = 0)
    @Query("SELECT p FROM Patient p WHERE p.flag = 0")
    List<Patient> findActivePatients();




    // Get active patients between two java.util.Date values
    @Query("SELECT p FROM Patient p WHERE p.flag = 0 AND p.registrationDate >= :startDate AND p.registrationDate <= :endDate")
    List<Patient> findActivePatientsByDateRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate);



}



