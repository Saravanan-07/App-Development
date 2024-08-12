package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/user/{userId}")
    public ResponseEntity<Challenge> postChallenge(@PathVariable Long userId, @RequestBody Challenge challenge) {
        Challenge savedChallenge = challengeService.postChallenge(userId, challenge);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedChallenge);
    }

    @PostMapping("/{challengeId}/user/{userId}")
    public ResponseEntity<Challenge> addUserToChallenge(@PathVariable Long challengeId, @PathVariable Long userId) {
        Challenge updatedChallenge = challengeService.addUserToChallenge(userId, challengeId);
        return ResponseEntity.ok(updatedChallenge);
    }

     @DeleteMapping("/{challengeId}/user/{userId}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Long challengeId, @PathVariable Long userId) {
        challengeService.deleteChallenge(userId, challengeId);
        return ResponseEntity.noContent().build();
    }
}
