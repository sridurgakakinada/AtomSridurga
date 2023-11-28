package com.atom.healthwebapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.atom.healthwebapp.entity.DoctorAuthDetails;
import com.atom.healthwebapp.entity.PatientAuthDetails;

//@Repository
public interface PatientAuthDetailsRepo extends JpaRepository<PatientAuthDetails,Long>{
	
	PatientAuthDetails getByUserName(String userName);
	
	@Query("select pa from PatientAuthDetails pa")
	List<PatientAuthDetails> getPatientList();
	
	PatientAuthDetails getById(Long id);
	
}
