package com.form.patientRegistration.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long patientId;
    private String firstName;
    private String lastName;
    private String email;
    private String contact;
    private String city;
    private String address;
    private String gender;
    private Long age;
    private String bloodGroup;
    private String aadhar;
    private int flag = 0;

}
