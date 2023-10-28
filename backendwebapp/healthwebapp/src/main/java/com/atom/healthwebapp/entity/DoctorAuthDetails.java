package com.atom.healthwebapp.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="DOCTORAUTHDETAILS")
public class DoctorAuthDetails{
	@Id
	private String id;
	private String userName;
	private String password;
	private String fullName;
	private String docDesignation;
	
	
	@OneToMany(fetch = FetchType.LAZY, targetEntity = PatientQueries.class, cascade = CascadeType.ALL, orphanRemoval = false)
	@JoinColumn(name = "FK_PATIENTQUERIES_ID")
	private List<PatientQueries> patientQueries;

	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
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
	public List<PatientQueries> getPatientQueries() {
		return patientQueries;
	}
	public void setPatientQueries(List<PatientQueries> patientQueries) {
		this.patientQueries = patientQueries;
	}
	public String getDocDesignation() {
		return docDesignation;
	}
	public void setDocDesignation(String docDesignation) {
		this.docDesignation = docDesignation;
	}
	
	
	
}
