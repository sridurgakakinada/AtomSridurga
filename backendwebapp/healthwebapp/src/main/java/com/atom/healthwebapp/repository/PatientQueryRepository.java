package com.atom.healthwebapp.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.atom.healthwebapp.dao.HealthDao;
import com.atom.healthwebapp.designpatterninterface.Container;
import com.atom.healthwebapp.designpatterninterface.Iterator;
import com.atom.healthwebapp.dto.response.Query;
import com.atom.healthwebapp.entity.DoctorAuthDetails;
import com.atom.healthwebapp.entity.PatientQueries;

public class PatientQueryRepository implements Container{

	//public String names[] = {"Robert" , "John" ,"Julie" , "Lora"};
	
	public DoctorAuthDetails doctorAuthDetails = new DoctorAuthDetails();
	public List<PatientQueries> listQueries = new ArrayList<PatientQueries>();
	
	
	public void instantiateObject(DoctorAuthDetails doctorAuthDetails,List<PatientQueries> listQueries) {
		this.doctorAuthDetails=doctorAuthDetails;
		this.listQueries=listQueries;
	}
	
	@Override
	public Iterator getIterator() {
		// TODO Auto-generated method stub
		return new NameIterator();
	}
	
	private class NameIterator implements Iterator {
		
		 
			
	      int index;

	      @Override
	      public boolean hasNext() {
	      
	         if(index < listQueries.size()){
	            return true;
	         }
	         return false;
	      }

	      @Override
	      public Object next() {
	      
	         if(this.hasNext()){
	            return listQueries.get(index++);
	         }
	         return null;
	      }		
	   }
	

}
