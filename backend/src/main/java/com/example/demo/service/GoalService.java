package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.UnauthorizedException;
import com.example.demo.model.Goal;
import com.example.demo.model.AppUser;
import com.example.demo.repository.GoalRepository;
import com.example.demo.repository.UserRepository;

@Service
public class GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserRepository userRepository;

    //adding goal
    public Goal postGoal(Long userId, Goal goal) {
        AppUser user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        goal.setUser(user);
        return goalRepository.save(goal);
    }

    //deleting goal
    public void deleteGoal(Long userId, Long goalId) {
        AppUser user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Goal goal = goalRepository.findById(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal not found"));

        if (goal.getUser().getId().equals(user.getId())) {
            goalRepository.delete(goal);
        } else {
            throw new UnauthorizedException("User is not authorized to delete this goal");
        }
    }

    public List<Goal> getGoalsByUser(Long userId) {
        return goalRepository.findByUserId(userId);
    }
}
