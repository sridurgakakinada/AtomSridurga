package com.atom.healthwebapp.dto.request;

public class SendQueryToDocRequest {
	
	private String username;
	private String patientId;
	private String patientName;
	private String query;
	private String docDesignation;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	public String getDocDesignation() {
		return docDesignation;
	}
	public void setDocDesignation(String docDesignation) {
		this.docDesignation = docDesignation;
	}
	
	
	

}
