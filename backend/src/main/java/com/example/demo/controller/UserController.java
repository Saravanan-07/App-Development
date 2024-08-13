package com.example.demo.controller;

import com.example.demo.model.Challenge;
import com.example.demo.model.ExerciseVideo;
import com.example.demo.model.Trainer;
import com.example.demo.model.AppUser;
import com.example.demo.service.ChallengeService;
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
    @Autowired
    private ChallengeService challengeService;

    @GetMapping("/users")
    public List<AppUser> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public AppUser getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public AppUser updateUser(@PathVariable Long id, @RequestBody AppUser user) {
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

     @PostMapping("/userpost/{userId}")
    public ResponseEntity<Challenge> postChallenge(@PathVariable Long userId, @RequestBody Challenge challenge) {
        Challenge savedChallenge = challengeService.postChallenge(userId, challenge);
        return ResponseEntity.ok(savedChallenge);
    }


    //choosing a trainer by user
    @PutMapping("/{userId}/chooseTrainer/{trainerId}")
    public ResponseEntity<AppUser> chooseTrainer(@PathVariable Long userId, @PathVariable Long trainerId) {
        AppUser updatedUser = userService.chooseTrainer(userId, trainerId);
        return ResponseEntity.ok(updatedUser);
    }

    //unselect trainer by setting trainer id to null
    @PutMapping("/{userId}/unselectTrainer")
    public ResponseEntity<AppUser> unselectTrainer(@PathVariable Long userId) {
        AppUser updatedUser = userService.unselectTrainer(userId);
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
