package com.atom.healthwebapp.dto.response;

public class PatientDetails {

	private String emailid;
	private String fullname;
	private String mobileNumber;
	private String patientHistory;
	
	
	public String getEmailid() {
		return emailid;
	}
	public void setEmailid(String emailid) {
		this.emailid = emailid;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getPatientHistory() {
		return patientHistory;
	}
	public void setPatientHistory(String patientHistory) {
		this.patientHistory = patientHistory;
	}
	
}
