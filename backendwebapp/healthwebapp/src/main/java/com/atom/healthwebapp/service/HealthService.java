package com.atom.healthwebapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atom.healthwebapp.dao.HealthDao;
import com.atom.healthwebapp.designpatterninterface.DoctorServiceInterface;
import com.atom.healthwebapp.designpatterninterface.Iterator;
import com.atom.healthwebapp.dto.request.AuthenticateRequest;
import com.atom.healthwebapp.dto.request.RegisterPatientRequest;
import com.atom.healthwebapp.dto.request.SaveDoctorReplyRequest;
import com.atom.healthwebapp.dto.request.SendQueryToDocRequest;
import com.atom.healthwebapp.dto.response.ApiResponse;
import com.atom.healthwebapp.dto.response.AuthenticateResponse;
import com.atom.healthwebapp.dto.response.DoctorResponse;
import com.atom.healthwebapp.dto.response.PatientDetails;
import com.atom.healthwebapp.dto.response.PatientResponse;
import com.atom.healthwebapp.dto.response.Query;
import com.atom.healthwebapp.dto.response.QueryListResponse;
import com.atom.healthwebapp.entity.DoctorAuthDetails;
import com.atom.healthwebapp.entity.PatientAuthDetails;
import com.atom.healthwebapp.entity.PatientQueries;
import com.atom.healthwebapp.repository.DoctorAuthDetailsRepo;
import com.atom.healthwebapp.repository.PatientQueryRepo;
import com.atom.healthwebapp.repository.PatientQueryRepository;
import com.atom.healthwebapp.utils.CommonUtil;

import io.micrometer.common.util.StringUtils;

@Service
public class HealthService implements DoctorServiceInterface{
	
	@Autowired
	private HealthDao healthDao;
	
	@Autowired
	private PatientQueryRepo patientQueryRepo;
	
	@Autowired
	private DoctorAuthDetailsRepo doctorAuthDetailsRepo;
	
	
	
	
	public PatientResponse getPatientDetails(AuthenticateRequest authenticateRequest) {
		
		PatientResponse patientResponse = new PatientResponse();
		PatientAuthDetails patientAuthDetails = healthDao.getPatientAuthDetails(authenticateRequest);
		if(patientAuthDetails.getPassword().equals(authenticateRequest.getPassword())&&(patientAuthDetails.getUserName().equals(authenticateRequest.getUserName()))) {
			patientResponse.setEmailId(patientAuthDetails.getEmailid());
			patientResponse.setPatientHealthHistory(patientAuthDetails.getPatientHistory());
			patientResponse.setPhoneNumber(patientAuthDetails.getMobileNumber());
			patientResponse.setUsername(patientAuthDetails.getUserName());
			patientResponse.setPatientName(patientAuthDetails.getFullName());
			
		}
		
		return patientResponse;
	}
	
	public DoctorResponse getDoctorDetails(AuthenticateRequest authenticateRequest) {
		
		DoctorResponse doctorResponse = new DoctorResponse();
		DoctorAuthDetails doctorAuthDetails = healthDao.getDoctorAuthDetails(authenticateRequest);
		if(doctorAuthDetails.getPassword().equals(authenticateRequest.getPassword())&&(doctorAuthDetails.getUserName().equals(authenticateRequest.getUserName()))) {
			doctorResponse.setDoctorDesignation(doctorAuthDetails.getDocDesignation());
			doctorResponse.setDoctorName(doctorAuthDetails.getFullName());
			
		}
		
		return doctorResponse;
	}
	
	
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
		patientAuthDetails.setPatientHistory(registerPatientRequest.getPatientHistory());
		healthDao.savePatientDetails(patientAuthDetails);
		apiResponse.setMessage("User registered successful");
		
		return apiResponse;
	}
	
	
	public ApiResponse sendQueryToDocService(SendQueryToDocRequest sendQueryToDocRequest) {
		
		ApiResponse apiResponse = new ApiResponse();
		try {
		
			PatientAuthDetails patientAuthDetails = healthDao.getPatientByUserName(sendQueryToDocRequest.getUsername());
			List<PatientQueries> listQueries = new ArrayList<>();
			PatientQueries patientQuery = new PatientQueries();
			DoctorAuthDetails doctorAuthDetails = healthDao.getDoctorByDesignation(sendQueryToDocRequest.getDocDesignation());
			if(doctorAuthDetails==null) {
				doctorAuthDetails = new DoctorAuthDetails();
				doctorAuthDetails.setDocDesignation("phsician");
				doctorAuthDetails.setFullName("doctor");
				doctorAuthDetails.setId("12");
				doctorAuthDetails.setPassword("doctor");
				doctorAuthDetails.setUserName("doctorusername");
				doctorAuthDetailsRepo.save(doctorAuthDetails);
			}
			patientQuery.setQuestion(sendQueryToDocRequest.getQuery());
			listQueries.add(patientQuery);
			patientAuthDetails.setPatientQueries(listQueries);
			doctorAuthDetails.setPatientQueries(listQueries);
			
			healthDao.savePatientDetails(patientAuthDetails);
			
		
			
			apiResponse.setMessage("Query Sent Succesfull");
			
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return apiResponse;
	}
	
	
	public QueryListResponse getListOfQueryForDoc(AuthenticateRequest authenticateRequest) {
		QueryListResponse queryListResponse = new QueryListResponse();
		DoctorAuthDetails doctorAuthDetails = healthDao.getDoctorAuthDetails(authenticateRequest);
		
		List<PatientQueries> listQueries = doctorAuthDetails.getPatientQueries();
		List<Query> queryList = new ArrayList<Query>();
		/*
		for(int i=0;i<listQueries.size();i++) {
			Query query = new Query();
			query.setQuestion(listQueries.get(i).getQuestion());
			queryList.add(query);
		}
		*/
		
		PatientQueryRepository patientQueryRepository = new PatientQueryRepository();
		patientQueryRepository.instantiateObject(doctorAuthDetails, listQueries);
		//Iterator Pattern implementation
		for(Iterator iter = patientQueryRepository.getIterator(); iter.hasNext();){
			PatientQueries patientQuery = (PatientQueries)iter.next();
			Query query = new Query();
			query.setQuestion(patientQuery.getQuestion());
			query.setQuestionId(patientQuery.getId());
			if(StringUtils.isNotBlank(patientQuery.getAnswer())) {
				query.setReply(patientQuery.getAnswer());
			}
			Long patientId = patientQueryRepo.getPatientId(patientQuery.getId());
			PatientAuthDetails patientAuthDetails = healthDao.getPatientById(patientId);
			PatientDetails patientDetails = new PatientDetails();
			patientDetails.setEmailid(patientAuthDetails.getEmailid());
			patientDetails.setFullname(patientAuthDetails.getFullName());
			patientDetails.setMobileNumber(patientAuthDetails.getMobileNumber());
			patientDetails.setPatientHistory(patientAuthDetails.getPatientHistory());
			query.setPatientDetails(patientDetails);
			queryList.add(query);
	        
	      } 
		
		
		queryListResponse.setQueryList(queryList);
		return queryListResponse;
	}
	
	public ApiResponse saveDocReplyService(SaveDoctorReplyRequest saveDoctorReplyRequest) {
		ApiResponse apiResponse = new ApiResponse();
		DoctorAuthDetails doctorAuthDetails = new DoctorAuthDetails();
		try {
				
				doctorAuthDetails = healthDao.getDoctorById(saveDoctorReplyRequest.getId());
				if(Optional.ofNullable(doctorAuthDetails).isEmpty()) {
					doctorAuthDetails = new DoctorAuthDetails();
					doctorAuthDetails.setDocDesignation("phsician");
					doctorAuthDetails.setFullName("doctor");
					doctorAuthDetails.setId("1");
					doctorAuthDetails.setPassword("doctor");
					doctorAuthDetails.setUserName("doctorusername");
					PatientQueries patientQuery = new PatientQueries();
					patientQuery.setQuestion("I have bad cold");
					List<PatientQueries> listQueries = new ArrayList();
					listQueries.add(patientQuery);
					//patientAuthDetails.setPatientQueries(listQueries);
					doctorAuthDetails.setPatientQueries(listQueries);
					doctorAuthDetailsRepo.save(doctorAuthDetails);
					
					
				}
				
				List<PatientQueries> listQueries = doctorAuthDetails.getPatientQueries();
				List<PatientQueries> newlistQueries = new ArrayList<>();
				
				
				for(int i=0;i<listQueries.size();i++) {
					PatientQueries patientQuery = listQueries.get(i);
					if(saveDoctorReplyRequest.getQuestionid()==patientQuery.getId()) {
						patientQuery.setAnswer(saveDoctorReplyRequest.getDocreply());
						newlistQueries.add(patientQuery);		
					}
					
					
				}
				doctorAuthDetails.setPatientQueries(newlistQueries);
				healthDao.saveDoctorDetails(doctorAuthDetails);	
				apiResponse.setMessage("Doctor Reply Saved Successful");
				
			}
		catch(Exception e) {
			e.printStackTrace();
		}
		return apiResponse;
		
	}

	public QueryListResponse getDoctorReplyForPatientService(SendQueryToDocRequest sendQueryToDocRequest) {
		QueryListResponse queryListResponse = new QueryListResponse();
		PatientAuthDetails patientAuthDetails = healthDao.getPatientByUserName(sendQueryToDocRequest.getUsername());
		List<PatientQueries> listQueries = patientAuthDetails.getPatientQueries();
		List<Query> queryList = new ArrayList<Query>();
		
		for(int i=0;i<listQueries.size();i++) {
			Query query = new Query();
			query.setQuestion(listQueries.get(i).getQuestion());
			query.setQuestionId(listQueries.get(i).getId());
			query.setReply(listQueries.get(i).getAnswer());
			queryList.add(query);
		} 
		queryListResponse.setQueryList(queryList);
		return queryListResponse;
	}
	
	public List<DoctorResponse> getDoctorList() {
		List<DoctorAuthDetails> doctorAuthDetailsList = healthDao.getDoctorList();
		List<DoctorResponse> doctorResponseList = new ArrayList();
		
		for(int i=0;i<doctorAuthDetailsList.size();i++) {
			DoctorResponse doctorResponse = new DoctorResponse();
			DoctorAuthDetails doctorAuthDetails = doctorAuthDetailsList.get(i);
			doctorResponse.setDoctorDesignation(doctorAuthDetails.getDocDesignation());
			doctorResponse.setDoctorName(doctorAuthDetails.getFullName());
			doctorResponseList.add(doctorResponse);
		}
		
		return doctorResponseList;
	}
	
	public List<PatientResponse> getPatientList() {
		List<PatientAuthDetails> patientAuthDetailsList = healthDao.getPatientList();
		List<PatientResponse> patientResponseList = new ArrayList();
		
		for(int i=0;i<patientAuthDetailsList.size();i++) {
			PatientResponse patientResponse = new PatientResponse();
			PatientAuthDetails patientAuthDetails = patientAuthDetailsList.get(i);
			patientResponse.setPatientName(patientAuthDetails.getFullName());
			patientResponse.setEmailId(patientAuthDetails.getEmailid());
			patientResponse.setPhoneNumber(patientAuthDetails.getMobileNumber());
			patientResponse.setUsername(patientAuthDetails.getUserName());
			patientResponse.setPatientHealthHistory(patientAuthDetails.getPatientHistory());
			patientResponseList.add(patientResponse);
		}
		
		return patientResponseList;
	}
	
}
