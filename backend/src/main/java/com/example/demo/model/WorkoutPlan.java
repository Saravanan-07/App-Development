package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "workout_plan")
public class WorkoutPlan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String img_url;
    private int sets,reps;
    private String range_value;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private AppUser user;

    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public int getSets() {
        return sets;
    }
    
    public void setSets(int sets) {
        this.sets = sets;
    }
    
    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }
    
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getRange_value() {
        return range_value;
    }

    public void setRange_value(String range_value) {
        this.range_value = range_value;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }
}
