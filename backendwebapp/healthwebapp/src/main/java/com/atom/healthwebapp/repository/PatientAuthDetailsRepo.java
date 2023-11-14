package com.atom.healthwebapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.atom.healthwebapp.entity.PatientAuthDetails;

//@Repository
public interface PatientAuthDetailsRepo extends JpaRepository<PatientAuthDetails,Long>{
	PatientAuthDetails getByUserName(String userName);
	
}
