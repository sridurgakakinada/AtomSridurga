package com.atom.healthwebapp;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.atom.healthwebapp.controller.HealthController;
import com.atom.healthwebapp.dto.request.AuthenticateRequest;
import com.atom.healthwebapp.dto.request.RegisterPatientRequest;
import com.atom.healthwebapp.dto.request.SaveDoctorReplyRequest;
import com.atom.healthwebapp.dto.request.SendQueryToDocRequest;
import com.atom.healthwebapp.dto.response.ApiResponse;
import com.atom.healthwebapp.dto.response.AuthenticateResponse;
import com.atom.healthwebapp.dto.response.QueryListResponse;
import com.atom.healthwebapp.entity.DoctorAuthDetails;
import com.atom.healthwebapp.repository.DoctorAuthDetailsRepo;

@SpringBootTest
class HealthwebappApplicationTests {
	
	@Autowired
	private HealthController healthController;
	
	@Autowired
	private DoctorAuthDetailsRepo doctorAuthDetailsRepo;

	private SaveDoctorReplyRequest saveDoctorReplyRequest;

	@Test
	void contextLoads() {
	}
	
	
	@Test
	void testUserRegisterationApi() {
		RegisterPatientRequest registerPatientRequest = new RegisterPatientRequest();
		registerPatientRequest.setUsername("hema");
		registerPatientRequest.setPassword("hem");
		registerPatientRequest.setEmailid("patient@gmail.com");
		registerPatientRequest.setFullname("hema");
		registerPatientRequest.setMobileNumber("9949296272");
		
		
		ApiResponse apiResponse =	healthController.registerPatient(registerPatientRequest);
		assertEquals("User registered successful",apiResponse.getMessage());
		
	}
	
	
	@Test
	void testSendQueryToDoctorApi() {
		//register patient
		RegisterPatientRequest registerPatientRequest = new RegisterPatientRequest();
		registerPatientRequest.setUsername("sarala");
		registerPatientRequest.setPassword("sarala");
		registerPatientRequest.setEmailid("sarala@gmail.com");
		registerPatientRequest.setFullname("sarala");
		registerPatientRequest.setMobileNumber("9949296272");
		registerPatientRequest.setPatientHistory("diabetes");
		
		
		ApiResponse apiResponser =	healthController.registerPatient(registerPatientRequest);
		//register doctor
		
		DoctorAuthDetails doctorAuthDetails =new DoctorAuthDetails();
		doctorAuthDetails.setDocDesignation("phsician");
		doctorAuthDetails.setFullName("doctor");
		doctorAuthDetails.setId("12");
		doctorAuthDetails.setPassword("doctor");
		doctorAuthDetails.setUserName("doctorusername");
		doctorAuthDetailsRepo.save(doctorAuthDetails);
		
		
		SendQueryToDocRequest sendQueryToDocRequest = new SendQueryToDocRequest();
		if("User registered successful".equalsIgnoreCase(apiResponser.getMessage())) {
			
			sendQueryToDocRequest.setUsername("sarala");
			sendQueryToDocRequest.setPatientId("2");
			sendQueryToDocRequest.setPatientName("sarala");
			sendQueryToDocRequest.setQuery("I have cold and cough since 3 weeks? what should be done");
			sendQueryToDocRequest.setDocDesignation("physician");
			ApiResponse apiResponse =	healthController.sendQueryToDoc(sendQueryToDocRequest);
			assertEquals("Query Sent Succesfull",apiResponse.getMessage());
		}
		
		
	}
	
	/*
	@Test
	void testSaveDocReplyApi() {
		
		//register patient
		RegisterPatientRequest registerPatientRequest = new RegisterPatientRequest();
		registerPatientRequest.setUsername("sarala");
		registerPatientRequest.setPassword("sarala");
		registerPatientRequest.setEmailid("sarala@gmail.com");
		registerPatientRequest.setFullname("sarala");
		registerPatientRequest.setMobileNumber("9949296272");
		registerPatientRequest.setPatientHistory("diabetes");
				
				
		ApiResponse apiResponser =	healthController.registerPatient(registerPatientRequest);
		
		//register doctor
				
		DoctorAuthDetails doctorAuthDetails =new DoctorAuthDetails();
		doctorAuthDetails.setDocDesignation("phsician");
		doctorAuthDetails.setFullName("doctor");
		doctorAuthDetails.setId("1");
		doctorAuthDetails.setPassword("doctor");
		doctorAuthDetails.setUserName("doctorusername");
		doctorAuthDetailsRepo.save(doctorAuthDetails);
				
		//send query to doc		
		SendQueryToDocRequest sendQueryToDocRequest = new SendQueryToDocRequest();
		if("User registered successful".equalsIgnoreCase(apiResponser.getMessage())) {
			
			sendQueryToDocRequest.setUsername("sarala");
			sendQueryToDocRequest.setPatientId("2");
			sendQueryToDocRequest.setPatientName("sarala");
			sendQueryToDocRequest.setQuery("I have cold and cough since 3 weeks? what should be done");
			sendQueryToDocRequest.setDocDesignation("physician");
			ApiResponse apiResponse =	healthController.sendQueryToDoc(sendQueryToDocRequest);
			//assertEquals("Query Sent Succesfull",apiResponse.getMessage());
			
			
			if("Query Sent Succesfull".equalsIgnoreCase(apiResponse.getMessage())) {
				SaveDoctorReplyRequest saveDoctorReplyRequests = new SaveDoctorReplyRequest();
				saveDoctorReplyRequests.setUserName("doctorusername");
				saveDoctorReplyRequests.setDocreply("take cold tablet");
				saveDoctorReplyRequests.setQuestionid(new Long(1));
				saveDoctorReplyRequests.setId("1");
				
				ApiResponse apiResponsen =	healthController.saveDocReplyToPatientQuery(saveDoctorReplyRequests);
				assertEquals("Doctor Reply Saved Successful",apiResponsen.getMessage());
			
			}
		}
		
		
		
		
		
		
	}*/
	
	
	
	
	
	
	
	
	@Test
	void testAuthenticationFailureApi() {
		
		RegisterPatientRequest registerPatientRequest = new RegisterPatientRequest();
		registerPatientRequest.setUsername("hema");
		registerPatientRequest.setPassword("hem");
		registerPatientRequest.setEmailid("patient@gmail.com");
		registerPatientRequest.setFullname("hema");
		registerPatientRequest.setMobileNumber("9949296272");
		
		
		healthController.registerPatient(registerPatientRequest);
		//assertEquals("User registered successful",apiResponse.getMessage());
		
		
		AuthenticateRequest authenticateRequest = new AuthenticateRequest();
		authenticateRequest.setUserName("hema");
		authenticateRequest.setPassword("hema");
		authenticateRequest.setUserType("Patient");
		authenticateRequest.setId("1");
		
		AuthenticateResponse apiResponse =	healthController.authenticateUser(authenticateRequest);
		assertEquals("Authentication Failed",apiResponse.getMessage());
		
	}
	
	
	@Test
	void testAuthenticationSuccessApi() {
		
		RegisterPatientRequest registerPatientRequest = new RegisterPatientRequest();
		registerPatientRequest.setUsername("Sarala");
		registerPatientRequest.setPassword("hem");
		registerPatientRequest.setEmailid("patient@gmail.com");
		registerPatientRequest.setFullname("hema");
		registerPatientRequest.setMobileNumber("9949296272");
		
		
		healthController.registerPatient(registerPatientRequest);
		//assertEquals("User registered successful",apiResponse.getMessage());
		
		
		AuthenticateRequest authenticateRequest = new AuthenticateRequest();
		authenticateRequest.setUserName("Sarala");
		authenticateRequest.setPassword("hem");
		authenticateRequest.setUserType("Patient");
		authenticateRequest.setId("2");
		
		AuthenticateResponse apiResponse =	healthController.authenticateUser(authenticateRequest);
		assertEquals("Authentication Successful",apiResponse.getMessage());
		
	}
	
	
	
	
	/*
	@Test
	void testGetQueriesForDocApi() {
		AuthenticateRequest authenticateRequest = new AuthenticateRequest();
		authenticateRequest.setUserName("hema");
		authenticateRequest.setId("1");
		QueryListResponse queryListResponse =	healthController.getQueriesForDoc(authenticateRequest);
		for(int i=0;i<queryListResponse.getQueryList().size();i++) {
			assertEquals("I have cold and cough since 3 weeks? what should be done",queryListResponse.getQueryList().get(i));
		}
		
	}*/
}
