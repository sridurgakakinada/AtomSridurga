package com.atom.healthwebapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atom.healthwebapp.dao.HealthDao;
import com.atom.healthwebapp.dto.request.AuthenticateRequest;
import com.atom.healthwebapp.dto.response.AuthenticateResponse;
import com.atom.healthwebapp.entity.DoctorAuthDetails;
import com.atom.healthwebapp.entity.PatientAuthDetails;
import com.atom.healthwebapp.utils.CommonUtil;

@Service
public class HealthService {
	
	@Autowired
	private HealthDao healthDao;
	
	public AuthenticateResponse authenticateUserService(AuthenticateRequest authenticateRequest) {
		AuthenticateResponse authenticateResponse = new AuthenticateResponse();
		
		if(CommonUtil.DOCTOR.equalsIgnoreCase(authenticateRequest.getUserType())) {
			DoctorAuthDetails doctorAuthDetails = healthDao.getDoctorAuthDetails(authenticateRequest);
			if(doctorAuthDetails.getPassword().equals(authenticateRequest.getPassword())&&(doctorAuthDetails.getUserName().equals(authenticateRequest.getUserName()))) {
				authenticateResponse.setAuthCheck(true);
				authenticateResponse.setMessage(CommonUtil.SUCCESS);
			}
			else {
				authenticateResponse.setAuthCheck(false);
				authenticateResponse.setMessage(CommonUtil.FAILED);
			}
		}
		if(CommonUtil.PATIENT.equalsIgnoreCase(authenticateRequest.getUserType())) {
			PatientAuthDetails patientAuthDetails = healthDao.getPatientAuthDetails(authenticateRequest);
			if(patientAuthDetails.getPassword().equals(authenticateRequest.getPassword())&&(patientAuthDetails.getUserName().equals(authenticateRequest.getUserName()))) {
				authenticateResponse.setAuthCheck(true);
				authenticateResponse.setMessage(CommonUtil.SUCCESS);
			}
			else {
				authenticateResponse.setAuthCheck(false);
				authenticateResponse.setMessage(CommonUtil.FAILED);
			}
			
		}
		
		return authenticateResponse;
	}
	
}
