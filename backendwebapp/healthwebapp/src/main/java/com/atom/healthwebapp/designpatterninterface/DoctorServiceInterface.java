package com.atom.healthwebapp.designpatterninterface;

import com.atom.healthwebapp.dto.request.AuthenticateRequest;
import com.atom.healthwebapp.dto.request.SaveDoctorReplyRequest;
import com.atom.healthwebapp.dto.request.SendQueryToDocRequest;
import com.atom.healthwebapp.dto.response.ApiResponse;
import com.atom.healthwebapp.dto.response.QueryListResponse;

public interface DoctorServiceInterface {
	
	public ApiResponse saveDocReplyService(SaveDoctorReplyRequest saveDoctorReplyRequest);
	
	public QueryListResponse getDoctorReplyForPatientService(SendQueryToDocRequest sendQueryToDocRequest);
}
