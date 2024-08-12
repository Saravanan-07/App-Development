package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Admin;
import com.example.demo.model.ExerciseVideo;
import com.example.demo.model.NutritionPlan;
import com.example.demo.model.Trainer;
import com.example.demo.model.User;
import com.example.demo.model.WorkoutPlan;
import com.example.demo.service.AdminService;
import com.example.demo.service.TrainerService;
import com.example.demo.service.WorkoutPlanService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private WorkoutPlanService workoutPlanService;
    @Autowired
    private TrainerService trainerService;

    @GetMapping("/admins")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.getAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @PostMapping("/exerciseVideos")
    public ResponseEntity<ExerciseVideo> addExercise(@RequestBody ExerciseVideo exercise) {
        return new ResponseEntity<>(adminService.addExercise(exercise), HttpStatus.CREATED);
    }

    @DeleteMapping("/exerciseVideos/{exerciseVideoId}")
    public ResponseEntity<Void> deleteExercise(@PathVariable Long exerciseVideoId) {
        adminService.deleteExercise(exerciseVideoId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin savedAdmin = adminService.createAdmin(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);
    }

    @PostMapping("/users")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return new ResponseEntity<>(adminService.updateUser(user), HttpStatus.OK);
    }


    @PostMapping("/trainers")
    public ResponseEntity<Trainer> updateTrainer(@RequestBody Trainer trainer) {
        return new ResponseEntity<>(adminService.updateTrainer(trainer), HttpStatus.OK);
    }

    @PostMapping("/nutritionPlans")
    public ResponseEntity<NutritionPlan> addNutritionPlan(@RequestBody NutritionPlan nutritionPlan) {
        return new ResponseEntity<>(adminService.addNutritionPlan(nutritionPlan), HttpStatus.CREATED);
    }

    @DeleteMapping("/nutritionPlans/{nutritionPlanId}")
    public ResponseEntity<Void> deleteNutritionPlan(@PathVariable Long nutritionPlanId) {
        adminService.deleteNutritionPlan(nutritionPlanId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/workoutPlans")
    public ResponseEntity<WorkoutPlan> addWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) {
        return new ResponseEntity<>(workoutPlanService.addWorkoutPlan(workoutPlan), HttpStatus.CREATED);
    }

    @DeleteMapping("/workoutPlans/{workoutPlanId}")
    public ResponseEntity<Void> deleteWorkoutPlan(@PathVariable Long workoutPlanId) {
        workoutPlanService.deleteWorkoutPlan(workoutPlanId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @DeleteMapping("/trainers/{trainerId}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable Long trainerId) {
        trainerService.deleteTrainer(trainerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
