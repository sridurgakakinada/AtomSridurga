package com.atom.healthwebapp;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.atom.healthwebapp.controller.HealthController;
import com.atom.healthwebapp.dto.request.AuthenticateRequest;
import com.atom.healthwebapp.dto.request.RegisterPatientRequest;
import com.atom.healthwebapp.dto.response.ApiResponse;
import com.atom.healthwebapp.dto.response.QueryListResponse;

@SpringBootTest
class HealthwebappApplicationTests {
	
	@Autowired
	private HealthController healthController;

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
	void testGetQueriesForDocApi() {
		AuthenticateRequest authenticateRequest = new AuthenticateRequest();
		authenticateRequest.setUserName("hema");
		authenticateRequest.setId("1");
		QueryListResponse queryListResponse =	healthController.getQueriesForDoc(authenticateRequest);
		for(int i=0;i<queryListResponse.getQueryList().size();i++) {
			assertEquals("query",queryListResponse.getQueryList().get(i));
		}
		
	}
}
