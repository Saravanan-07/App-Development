package com.example.demo.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name="users")
public class AppUser {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String username;

    @Column(unique=true,nullable=false)
    private String email;

    private String password;
    private Date createdAt;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<WorkoutPlan> workoutPlans;
    
    @ManyToOne
    @JoinColumn(name = "trainer_id")
    @JsonBackReference
    private Trainer trainer;
    
    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Goal> goals;
    
    @ManyToMany(mappedBy = "users")
    private List<Challenge> challenges=new ArrayList<>();
    
    
    public List<WorkoutPlan> getWorkoutPlans() {
        return workoutPlans;
    }
    
    public void setWorkoutPlans(List<WorkoutPlan> workoutPlans) {
        this.workoutPlans = workoutPlans;
    }
    
    public Trainer getTrainer() {
        return trainer;
    }
    
    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }
    
    public List<Goal> getGoals() {
        return goals;
    }
    
    public void setGoals(List<Goal> goals) {
        this.goals = goals;
    }
    
    public List<Challenge> getChallenges() {
        return challenges;
    }
    
    public void setChallenges(List<Challenge> challenges) {
        this.challenges = challenges;
    }
    
}