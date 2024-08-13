package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.model.AppUser;
import com.example.demo.repository.AppUserRepo;

@Service
public class AppUserService implements UserDetailsService{
    
    @Autowired
    private AppUserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repo.findByUsername(username);
        
        if(appUser != null) {
            var springUser = User.withUsername(appUser.getUsername())
                                                    .password(appUser.getPassword())
                                                    .build();
            

            return springUser;
        }
        
        return null;
    }
}
