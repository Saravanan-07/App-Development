package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.AppUser;
import com.example.demo.model.WorkoutPlan;
import com.example.demo.service.UserService;
import com.example.demo.service.WorkoutPlanService;

@RestController
@RequestMapping("/workoutPlans")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    @Autowired
    private UserService userService;

    @PostMapping("/user/{userId}/add/{workoutPlanId}")
    public ResponseEntity<AppUser> addWorkoutPlanToUser(@PathVariable Long userId, @PathVariable Long workoutPlanId) {
        AppUser user = userService.addWorkoutPlanToUser(userId, workoutPlanId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WorkoutPlan>> getUserWorkoutPlans(@PathVariable Long userId) {
        List<WorkoutPlan> workoutPlans = userService.getUserWorkoutPlans(userId);
        return new ResponseEntity<>(workoutPlans, HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<List<WorkoutPlan>> getAllWorkoutPlans() {
        List<WorkoutPlan> workoutPlans = workoutPlanService.getAllWorkoutPlans();
        return new ResponseEntity<>(workoutPlans, HttpStatus.OK);
    }
    
    //deleting a workout plan
    @DeleteMapping("/{userId}/workoutPlans/{workoutPlanId}")
    public ResponseEntity<Void> deleteWorkoutPlanForUser(@PathVariable Long userId, @PathVariable Long workoutPlanId) {
         userService.deleteWorkoutPlanForUser(userId, workoutPlanId);
         return ResponseEntity.noContent().build();
    }
}
