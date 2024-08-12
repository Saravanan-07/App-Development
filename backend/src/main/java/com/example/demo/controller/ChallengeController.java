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

import com.example.demo.model.Challenge;
import com.example.demo.service.ChallengeService;

@RestController
@RequestMapping("/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @PostMapping("/userpost/{userId}")
    public ResponseEntity<Challenge> postChallenge(@PathVariable Long userId, @RequestBody Challenge challenge) {
        Challenge savedChallenge = challengeService.postChallenge(userId, challenge);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedChallenge);
    }

    // @PostMapping(value = "/userpost/{userId}", consumes = "application/json", produces = "application/json")
    // public ResponseEntity<Challenge> postChallenge(@PathVariable Long userId, @RequestBody Challenge challenge) {
    //     Challenge savedChallenge = challengeService.postChallenge(userId, challenge);
    //     return ResponseEntity.status(HttpStatus.CREATED).body(savedChallenge);
    // }

    @PutMapping("/{challengeId}/user/{userId}")
    public ResponseEntity<Challenge> addUserToChallenge(@PathVariable Long challengeId, @PathVariable Long userId) {
        Challenge updatedChallenge = challengeService.addUserToChallenge(userId, challengeId);
        return ResponseEntity.ok(updatedChallenge);
    }

     @DeleteMapping("/{challengeId}/user/{userId}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Long challengeId, @PathVariable Long userId) {
        challengeService.deleteChallenge(userId, challengeId);
        return ResponseEntity.noContent().build();
    }

    // New method to list all challenges
    @GetMapping
    public ResponseEntity<List<Challenge>> listChallenges() {
        List<Challenge> challenges = challengeService.getAllChallenges();
        return ResponseEntity.ok(challenges);
    }

    // Method to list challenges for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Challenge>> listChallengesByUser(@PathVariable Long userId) {
        List<Challenge> challenges = challengeService.getChallengesByUser(userId);
        return ResponseEntity.ok(challenges);
    }
}
