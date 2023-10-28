package com.example.RegisterLogic.Controller;


import com.example.RegisterLogic.DTO.LoginDto;
import com.example.RegisterLogic.DTO.UserDTO;
import com.example.RegisterLogic.Response.LoginResponse;
import com.example.RegisterLogic.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class Controller {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/save")
    public String saveUser(@RequestBody UserDTO userDTO)
    {
        String id = userService.addUser(userDTO);
        return id;
    }


    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDTO)
    {
        LoginResponse loginResponse = userService.loginEmployee(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }

}
