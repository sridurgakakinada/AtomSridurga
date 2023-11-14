package com.atom.healthwebapp.dto.response;




public class AuthenticateResponse {
	private String message;
	private Boolean authCheck;
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Boolean getAuthCheck() {
		return authCheck;
	}
	public void setAuthCheck(Boolean authCheck) {
		this.authCheck = authCheck;
	}
	
	
}
