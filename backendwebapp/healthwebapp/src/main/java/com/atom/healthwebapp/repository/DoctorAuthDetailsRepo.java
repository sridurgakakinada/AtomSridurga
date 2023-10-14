package com.atom.healthwebapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.atom.healthwebapp.entity.DoctorAuthDetails;

//@Repository
public interface DoctorAuthDetailsRepo extends JpaRepository<DoctorAuthDetails,String>{
	DoctorAuthDetails getById(String id);
}
