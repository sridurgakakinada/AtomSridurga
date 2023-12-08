package com.atom.healthwebapp.dto.response;

public class PatientResponse {
	
	private String patientName;
	private String patientHealthHistory;
	private String emailId;
	private String phoneNumber;
	private String username;
	
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getPatientHealthHistory() {
		return patientHealthHistory;
	}
	public void setPatientHealthHistory(String patientHealthHistory) {
		this.patientHealthHistory = patientHealthHistory;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
	
	

}
