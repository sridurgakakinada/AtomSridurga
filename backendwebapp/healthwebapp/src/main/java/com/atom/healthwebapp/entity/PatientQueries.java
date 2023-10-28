package com.atom.healthwebapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name="PATIENTQUERIES")
public class PatientQueries {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PATIENT_SEQ")
	@SequenceGenerator(sequenceName = "PATIENT_SEQ", allocationSize = 1, name = "PATIENT_SEQ", initialValue = 1)
	@Column(name = "id")
	private Long id;
	
	private String question;
	
	private String answer;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}
	
	
	
	
	
	
}
