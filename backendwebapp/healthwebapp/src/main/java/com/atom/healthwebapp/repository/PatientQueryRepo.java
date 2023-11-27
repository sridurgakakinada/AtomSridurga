package com.atom.healthwebapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.atom.healthwebapp.entity.PatientAuthDetails;
import com.atom.healthwebapp.entity.PatientQueries;

public interface PatientQueryRepo extends JpaRepository<PatientQueries,Long>{
	

	@Query(value="select pa.FK__PAT_PATIENTQUERIES_ID from PatientQueries pa where pa.id = ?1",  nativeQuery = true)
	Long getPatientId(Long patientId);
	
	/*@Query("select pa.FK__PAT_PATIENTQUERIES_ID from PatientAuthDetails pa where pa.status = ?1")
	List<PatientAuthDetails> getPatientList(Long patientId);
	u.status = ?1", 
			  nativeQuery = true*/
}

