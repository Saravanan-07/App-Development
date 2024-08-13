package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.ExerciseVideo;
import com.example.demo.model.Trainer;
import com.example.demo.model.AppUser;
import com.example.demo.model.WorkoutPlan;
import com.example.demo.repository.ExerciseVideoRepository;
import com.example.demo.repository.TrainerRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.WorkoutPlanRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TrainerRepository trainerRepository;
    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;
    @Autowired
    private ExerciseVideoRepository exerciseVideoRepository;

    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }

    public AppUser createUser(AppUser user) {
        return userRepository.save(user);
    }

    public AppUser getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public AppUser updateUser(Long id, AppUser user) {
        AppUser existingUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void deleteWorkoutPlanForUser(Long userId, Long workoutPlanId) {
        AppUser user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(workoutPlanId)
                .orElseThrow(() -> new ResourceNotFoundException("Workout Plan not found"));
        
        if (!workoutPlan.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Workout Plan does not belong to the specified user");
        }
        // Remove the association between the user and the workout plan
        user.getWorkoutPlans().remove(workoutPlan);
        workoutPlan.setUser(null);
        userRepository.save(user);
        workoutPlanRepository.save(workoutPlan);
    }

    //choose trainer
    public AppUser chooseTrainer(Long userId, Long trainerId) {
        AppUser user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Trainer trainer = trainerRepository.findById(trainerId).orElseThrow(() -> new ResourceNotFoundException("Trainer not found"));

        user.setTrainer(trainer);
        return userRepository.save(user);
    }

    //unselect trainer
    public AppUser unselectTrainer(Long userId) {
        AppUser user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setTrainer(null);
        return userRepository.save(user);
    }

    public AppUser addWorkoutPlanToUser(Long userId, Long workoutPlanId) {
        AppUser user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(workoutPlanId)
            .orElseThrow(() -> new RuntimeException("Workout Plan not found"));
        
        workoutPlan.setUser(user);
        workoutPlanRepository.save(workoutPlan);

        return userRepository.save(user);
    }

    public List<WorkoutPlan> getUserWorkoutPlans(Long userId) {
        AppUser user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getWorkoutPlans();
    }

    public List<ExerciseVideo> getAllExercises() {
        return exerciseVideoRepository.findAll();
    }



    public Trainer getTrainerByUserId(Long userId) {
        AppUser user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return user.getTrainer();
        } else {
            return null;
        }
    }
}
