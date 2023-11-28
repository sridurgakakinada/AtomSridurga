package com.atom.healthwebapp.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.atom.healthwebapp.dto.request.AuthenticateRequest;
import com.atom.healthwebapp.dto.request.RegisterPatientRequest;
import com.atom.healthwebapp.dto.request.SaveDoctorReplyRequest;
import com.atom.healthwebapp.dto.request.SendQueryToDocRequest;
import com.atom.healthwebapp.dto.response.ApiResponse;
import com.atom.healthwebapp.dto.response.AuthenticateResponse;
import com.atom.healthwebapp.dto.response.QueryListResponse;
import com.atom.healthwebapp.service.HealthService;





//import io.swagger.annotations.ApiOperation;
//import io.swagger.annotations.ApiParam;
//@Tag(name = "Test", description = "Just a test endpoint")
//@RequestMapping(value ="/", produces =  { MediaType.APPLICATION_JSON_VALUE})

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
public class HealthController {
	
	@Autowired
	private HealthService healthService;
	
	@PostMapping(path = "/Services/Health/AuthenticateUser", consumes = { 
			MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					 })
	@CrossOrigin(origins = "http://localhost:3000")

	@ResponseBody
	public AuthenticateResponse authenticateUser(@RequestBody AuthenticateRequest authenticateRequest) {
		AuthenticateResponse authenticateResponse = healthService.authenticateUserService(authenticateRequest);
		return authenticateResponse;
	}
	
	@PostMapping(path = "/Services/Health/RegisterPatient", consumes = { 
			MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					 })
	@ResponseBody
	@CrossOrigin(origins = "http://localhost:3000")
	public ApiResponse registerPatient(@RequestBody RegisterPatientRequest registerPatientRequest) {
		ApiResponse apiResponse = healthService.registerUserService(registerPatientRequest);
		return apiResponse;
	}
	
	@PostMapping(path = "/Services/Health/SendQueryToDoctor", consumes = { 
			MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					 })
	@ResponseBody
	public ApiResponse sendQueryToDoc(@RequestBody SendQueryToDocRequest sendQueryToDocRequest) {
		ApiResponse apiResponse = healthService.sendQueryToDocService(sendQueryToDocRequest);
		return apiResponse;
	}

	@PostMapping(path = "/Services/Health/getQueriesForDoc", consumes = { 
			MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					 })
	@ResponseBody
	public QueryListResponse getQueriesForDoc(@RequestBody AuthenticateRequest authenticateRequest) {
		QueryListResponse response = healthService.getListOfQueryForDoc(authenticateRequest);
		return response;
	}
	
	@PostMapping(path = "/Services/Health/SaveDoctorReplyToPatientQuery", consumes = { 
			MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					 })
	@ResponseBody
	public ApiResponse saveDocReplyToPatientQuery(@RequestBody SaveDoctorReplyRequest saveDoctorReplyRequest) {
		ApiResponse apiResponse = healthService.saveDocReplyService(saveDoctorReplyRequest);
		return apiResponse;
	}
	
	@PostMapping(path = "/Services/Health/getDoctorReplyForPatient", consumes = { 
			MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					 })
	@ResponseBody
	public QueryListResponse getDoctorReplyForPatient(@RequestBody SendQueryToDocRequest sendQueryToDocRequest) {
		QueryListResponse response = healthService.getDoctorReplyForPatientService(sendQueryToDocRequest);
		return response;
	}

}
