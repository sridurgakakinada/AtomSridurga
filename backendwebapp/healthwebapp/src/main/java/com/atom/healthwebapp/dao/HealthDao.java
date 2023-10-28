package com.atom.healthwebapp.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import com.atom.healthwebapp.dto.request.AuthenticateRequest;
import com.atom.healthwebapp.entity.DoctorAuthDetails;
import com.atom.healthwebapp.entity.PatientAuthDetails;
import com.atom.healthwebapp.repository.DoctorAuthDetailsRepo;
import com.atom.healthwebapp.repository.PatientAuthDetailsRepo;

@Component
public class HealthDao {
	@Autowired
	private PatientAuthDetailsRepo patientAuthDetailsRepo;
	
	@Autowired
	private DoctorAuthDetailsRepo doctorAuthDetailsRepo;
	
	
	public PatientAuthDetails getPatientAuthDetails(AuthenticateRequest authenticateRequest) {
		
		PatientAuthDetails patientAuthDetails = patientAuthDetailsRepo.getByUserName(authenticateRequest.getUserName());
		
		return patientAuthDetails;
		
	}
	
	public DoctorAuthDetails getDoctorAuthDetails(AuthenticateRequest authenticateRequest) {
		
		DoctorAuthDetails doctorAuthDetails = doctorAuthDetailsRepo.getById(authenticateRequest.getId());
		
		return doctorAuthDetails;
		
	}
	public DoctorAuthDetails getDoctorByDesignation(String designation) {
		
		DoctorAuthDetails doctorAuthDetails = doctorAuthDetailsRepo.getBydocDesignation(designation);
		
		return doctorAuthDetails;
		
	}
	
	
	
	public void savePatientDetails(PatientAuthDetails patientAuthDetails) {
		patientAuthDetailsRepo.save(patientAuthDetails);
	}
	
	
	public PatientAuthDetails getPatientByUserName(String username) {
		
		PatientAuthDetails patientAuthDetails = patientAuthDetailsRepo.getByUserName(username);
		
		return patientAuthDetails;
		
	}
	
	
	
	
	
	
}
