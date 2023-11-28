package com.atom.healthwebapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.atom.healthwebapp.entity.DoctorAuthDetails;

//@Repository
public interface DoctorAuthDetailsRepo extends JpaRepository<DoctorAuthDetails,String>{
	DoctorAuthDetails getById(String id);
	DoctorAuthDetails getBydocDesignation(String designation);
	
	@Query("select da from DoctorAuthDetails da")
	List<DoctorAuthDetails> getDoctorList();
	
	
	
	
}
