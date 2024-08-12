package com.example.demo.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;

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
    
    @ManyToOne
    @JoinColumn(name = "nutrition_plan_id")
    private NutritionPlan nutritionPlan;

    
    
     @ManyToMany(mappedBy = "users")
     private List<Challenge> challenges=new ArrayList<>();
     
     public Long getId() {
         return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
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
    
    public NutritionPlan getNutritionPlan() {
        return nutritionPlan;
    }
    
    public void setNutritionPlan(NutritionPlan nutritionPlan) {
        this.nutritionPlan = nutritionPlan;
    }
    
    public List<Challenge> getChallenges() {
        return challenges;
    }
    
    public void setChallenges(List<Challenge> challenges) {
        this.challenges = challenges;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    
    
    
    
    
 
    





    //nutrition plan
    //challenges













    
    
    /* @ManyToMany
     @JoinTable(
         name = "user_challenges",
         joinColumns = @JoinColumn(name = "user_id"),
         inverseJoinColumns = @JoinColumn(name = "challenge_id")
     )
     private List<Challenge> challenges;*/
}