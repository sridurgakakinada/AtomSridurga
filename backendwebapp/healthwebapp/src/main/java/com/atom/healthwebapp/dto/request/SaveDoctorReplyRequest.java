package com.atom.healthwebapp.dto.request;

public class SaveDoctorReplyRequest {
	private String userName;
	private String userType;
	private String id;
	private String docreply;
	private Long questionid;

	
	
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDocreply() {
		return docreply;
	}
	public void setDocreply(String docreply) {
		this.docreply = docreply;
	}
	public Long getQuestionid() {
		return questionid;
	}
	public void setQuestionid(Long questionid) {
		this.questionid = questionid;
	}
	
}
