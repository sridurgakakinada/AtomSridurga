package com.atom.healthwebapp.dao;

import java.util.List;

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
	public DoctorAuthDetails getDoctorById(String id) {
		
		DoctorAuthDetails doctorAuthDetails = doctorAuthDetailsRepo.getById(id);
		
		return doctorAuthDetails;
		
	}
	
	
	public PatientAuthDetails getPatientById(Long id) {
		
		PatientAuthDetails patientAuthDetails = patientAuthDetailsRepo.getById(id);
		
		return patientAuthDetails;
		
	}
	
	public void savePatientDetails(PatientAuthDetails patientAuthDetails) {
		patientAuthDetailsRepo.save(patientAuthDetails);
	}
	
	public void saveDoctorDetails(DoctorAuthDetails doctorAuthDetails) {
		doctorAuthDetailsRepo.save(doctorAuthDetails);
	}
	
	
	public PatientAuthDetails getPatientByUserName(String username) {
		
		PatientAuthDetails patientAuthDetails = patientAuthDetailsRepo.getByUserName(username);
		
		return patientAuthDetails;
		
	}
	
	public List<DoctorAuthDetails> getDoctorList() {
		return doctorAuthDetailsRepo.getDoctorList();
	}
	
	public List<PatientAuthDetails> getPatientList(){
		return patientAuthDetailsRepo.getPatientList();
	}
	
	
}
