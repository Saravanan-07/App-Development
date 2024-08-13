package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.AppUser;

public interface AppUserRepo extends JpaRepository<AppUser,Long>{
    public AppUser findByUsername(String username);
    public AppUser findByEmail(String email);
}
