package com.atom.healthwebapp.entity;

import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

import jakarta.persistence.Table;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
	private String fullName;
	private String emailid;
	private String mobileNumber;
	
	
	@OneToMany(fetch = FetchType.LAZY, targetEntity = PatientQueries.class, cascade = CascadeType.ALL, orphanRemoval = false)
	@JoinColumn(name = "FK_PATIENTQUERIES_ID")
	private List<PatientQueries> patientQueries;

	
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
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getEmailid() {
		return emailid;
	}
	public void setEmailid(String emailid) {
		this.emailid = emailid;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public List<PatientQueries> getPatientQueries() {
		return patientQueries;
	}
	public void setPatientQueries(List<PatientQueries> patientQueries) {
		this.patientQueries = patientQueries;
	}
	
	

}
