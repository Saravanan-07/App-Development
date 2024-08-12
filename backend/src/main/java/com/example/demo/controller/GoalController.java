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

import com.example.demo.model.Goal;
import com.example.demo.service.GoalService;

@RestController
@RequestMapping("/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<Goal> postGoal(@PathVariable Long userId, @RequestBody Goal goal) {
        Goal savedGoal = goalService.postGoal(userId, goal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGoal);
    }

    @DeleteMapping("/{goalId}/user/{userId}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long goalId, @PathVariable Long userId) {
        goalService.deleteGoal(userId, goalId);
        return ResponseEntity.noContent().build();
    }
}
