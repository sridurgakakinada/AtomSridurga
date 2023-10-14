package com.atom.healthwebapp.entity;

import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

import jakarta.persistence.Table;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;



@Entity
//@Data
@Table(name="PATIENTAUTHDETAILS")
public class PatientAuthDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "HEALTH_SEQ")
	@SequenceGenerator(sequenceName = "HEALTH_SEQ", allocationSize = 1, name = "HEALTH_SEQ", initialValue = 1)
	@Column(name = "id")
	private Long id;
	private String userName;
	private String password;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
