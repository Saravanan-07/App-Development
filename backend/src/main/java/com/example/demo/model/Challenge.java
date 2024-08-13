package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Challenge {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @ManyToMany
    @JoinTable(
        name = "user_challenge",
        joinColumns = @JoinColumn(name = "challenge_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnore
    private List<AppUser> users = new ArrayList<>();
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public List<AppUser> getUsers() {
        return users;
    }
    
    public void setUsers(List<AppUser> users) {
        this.users = users;
    }  
}