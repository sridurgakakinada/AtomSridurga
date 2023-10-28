package com.atom.healthwebapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atom.healthwebapp.dao.HealthDao;
import com.atom.healthwebapp.dto.request.AuthenticateRequest;
import com.atom.healthwebapp.dto.request.RegisterPatientRequest;
import com.atom.healthwebapp.dto.request.SendQueryToDocRequest;
import com.atom.healthwebapp.dto.response.ApiResponse;
import com.atom.healthwebapp.dto.response.AuthenticateResponse;
import com.atom.healthwebapp.dto.response.Query;
import com.atom.healthwebapp.dto.response.QueryListResponse;
import com.atom.healthwebapp.entity.DoctorAuthDetails;
import com.atom.healthwebapp.entity.PatientAuthDetails;
import com.atom.healthwebapp.entity.PatientQueries;
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
	
	
	
	public ApiResponse registerUserService(RegisterPatientRequest registerPatientRequest) {
		ApiResponse apiResponse = new ApiResponse();
		PatientAuthDetails patientAuthDetails = new PatientAuthDetails();
		patientAuthDetails.setEmailid(registerPatientRequest.getEmailid());
		patientAuthDetails.setFullName(registerPatientRequest.getFullname());
		patientAuthDetails.setMobileNumber(registerPatientRequest.getMobileNumber());
		patientAuthDetails.setPassword(registerPatientRequest.getPassword());
		patientAuthDetails.setUserName(registerPatientRequest.getUsername());
		healthDao.savePatientDetails(patientAuthDetails);
		apiResponse.setMessage("User registered successful");
		
		return apiResponse;
	}
	
	
	public ApiResponse sendQueryToDocService(SendQueryToDocRequest sendQueryToDocRequest) {
		ApiResponse apiResponse = new ApiResponse();
		PatientAuthDetails patientAuthDetails = healthDao.getPatientByUserName(sendQueryToDocRequest.getUsername());
		List<PatientQueries> listQueries = new ArrayList<>();
		PatientQueries patientQuery = new PatientQueries();
		DoctorAuthDetails doctorAuthDetails = healthDao.getDoctorByDesignation(sendQueryToDocRequest.getDocDesignation());
		
		patientQuery.setQuestion(sendQueryToDocRequest.getQuery());
		listQueries.add(patientQuery);
		patientAuthDetails.setPatientQueries(listQueries);
		healthDao.savePatientDetails(patientAuthDetails);
		
		doctorAuthDetails.setPatientQueries(listQueries);
		
		apiResponse.setMessage("Query Sent Succesfull");
		
		return apiResponse;
	}
	
	
	public QueryListResponse getListOfQueryForDoc(AuthenticateRequest authenticateRequest) {
		QueryListResponse queryListResponse = new QueryListResponse();
		DoctorAuthDetails doctorAuthDetails = healthDao.getDoctorAuthDetails(authenticateRequest);
		List<PatientQueries> listQueries = doctorAuthDetails.getPatientQueries();
		List<Query> queryList = new ArrayList<Query>();
		
		for(int i=0;i<listQueries.size();i++) {
			Query query = new Query();
			query.setQuestion(listQueries.get(i).getQuestion());
			queryList.add(query);
		}
		queryListResponse.setQueryList(queryList);
		return queryListResponse;
	}
	
}
