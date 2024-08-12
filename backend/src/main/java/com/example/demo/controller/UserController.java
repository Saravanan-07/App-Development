package com.example.demo.controller;

import com.example.demo.model.ExerciseVideo;
import com.example.demo.model.Trainer;
import com.example.demo.model.User;
import com.example.demo.model.WorkoutPlan;
import com.example.demo.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/signup")
    public ResponseEntity<User> createUser(@RequestBody User user) {
    try {
        User newUser = userService.createUser(user);
        return ResponseEntity.ok(newUser);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // or customize the error response
    }
}

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/exerciseVideos")
    public ResponseEntity<List<ExerciseVideo>> getAllExercises() {
        List<ExerciseVideo> exercises = userService.getAllExercises();
        return new ResponseEntity<>(exercises, HttpStatus.OK);
    }

    // //add workout plan for user
    // @PostMapping("/{userId}/workoutPlans")
    // public WorkoutPlan addWorkoutPlanToUser(@PathVariable Long userId, @RequestBody WorkoutPlan workoutPlan) {
    //     return userService.addWorkoutPlanToUser(userId, workoutPlan);
    // }

    // //list the workout plans of user
    // @GetMapping("/{userId}/workoutPlans")
    // public List<WorkoutPlan> getWorkoutPlansForUser(@PathVariable Long userId) {
    //     return userService.getWorkoutPlansForUser(userId);
    // }


    //choosing a trainer by user
    @PutMapping("/{userId}/chooseTrainer/{trainerId}")
    public ResponseEntity<User> chooseTrainer(@PathVariable Long userId, @PathVariable Long trainerId) {
        User updatedUser = userService.chooseTrainer(userId, trainerId);
        return ResponseEntity.ok(updatedUser);
    }

    //unselect trainer by setting trainer id to null
    @PutMapping("/{userId}/unselectTrainer")
    public ResponseEntity<User> unselectTrainer(@PathVariable Long userId) {
        User updatedUser = userService.unselectTrainer(userId);
        return ResponseEntity.ok(updatedUser);
    }


    @GetMapping("/{userId}/trainer")
    public ResponseEntity<Trainer> getTrainerForUser(@PathVariable Long userId) {
        Trainer trainer = userService.getTrainerByUserId(userId);
        if (trainer != null) {
            return ResponseEntity.ok(trainer);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
}
