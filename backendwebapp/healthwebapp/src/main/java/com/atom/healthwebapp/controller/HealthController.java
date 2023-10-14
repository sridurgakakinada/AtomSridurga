package com.atom.healthwebapp.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.atom.healthwebapp.dto.request.AuthenticateRequest;
import com.atom.healthwebapp.dto.response.AuthenticateResponse;
import com.atom.healthwebapp.service.HealthService;





//import io.swagger.annotations.ApiOperation;
//import io.swagger.annotations.ApiParam;
//@Tag(name = "Test", description = "Just a test endpoint")
//@RequestMapping(value ="/", produces =  { MediaType.APPLICATION_JSON_VALUE})

@RestController
public class HealthController {
	
	@Autowired
	private HealthService healthService;
	
	@PostMapping(path = "/Services/Health/AuthenticateUser", consumes = { 
			MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					 })
	@ResponseBody
	public AuthenticateResponse authenticateUser(@RequestBody AuthenticateRequest authenticateRequest) {
		AuthenticateResponse authenticateResponse = healthService.authenticateUserService(authenticateRequest);
		return authenticateResponse;
	}

}
