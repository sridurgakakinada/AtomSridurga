package com.example.RegisterLogic.Service;

import com.example.RegisterLogic.DTO.LoginDto;
import com.example.RegisterLogic.DTO.UserDTO;
import com.example.RegisterLogic.Response.LoginResponse;

public interface UserService {


    String addUser(UserDTO userDTO);

    LoginResponse loginEmployee(LoginDto loginDTO);
}
