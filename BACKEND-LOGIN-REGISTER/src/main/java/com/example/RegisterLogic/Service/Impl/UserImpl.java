package com.example.RegisterLogic.Service.Impl;

import com.example.RegisterLogic.DTO.LoginDto;
import com.example.RegisterLogic.DTO.UserDTO;
import com.example.RegisterLogic.Entity.User;
import com.example.RegisterLogic.Repo.UserRepo;
import com.example.RegisterLogic.Response.LoginResponse;
import com.example.RegisterLogic.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepo userRepo;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UserDTO userDTO) {

        User user=new User(

                userDTO.getUserid(),
                userDTO.getUsername(),
                userDTO.getEmail(),
                this.passwordEncoder.encode(userDTO.getPassword())

        );
        userRepo.save(user);
        
        return user.getUsername();
    }

    @Override
    public LoginResponse loginEmployee(LoginDto loginDTO) {

        String msg = "";
        User user1 = userRepo.findByEmail(loginDTO.getEmail());
        if (user1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
//                User user1= userRepo.findByEmail(loginDTO.getEmail());
                Optional<User> user = userRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (user.isPresent()) {
                    return new LoginResponse("Login Success", true);
                } else {
                    return new LoginResponse("Login Failed", false);
                }
            } else {
                return new LoginResponse("password Not Match", false);
            }
        }else {
            return new LoginResponse("Email not exits", false);
        }


    }
}
