package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.ExerciseVideo;
import com.example.demo.model.Trainer;
import com.example.demo.model.User;
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

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        // Update other fields as needed
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // //add workout plan for a user
    // public WorkoutPlan addWorkoutPlanToUser(Long userId, WorkoutPlan workoutPlan) {
    //     User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    //     workoutPlan.setUser(user);
    //     return workoutPlanRepository.save(workoutPlan);
    // }

    // //get workout plan of a user
    // public List<WorkoutPlan> getWorkoutPlansForUser(Long userId) {
    //     User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    //     return user.getWorkoutPlans();
    // }


    //delete workout plan for a user
    public void deleteWorkoutPlanForUser(Long userId, Long workoutPlanId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(workoutPlanId)
                .orElseThrow(() -> new ResourceNotFoundException("Workout Plan not found"));
        
        if (!workoutPlan.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Workout Plan does not belong to the specified user");
        }
        
        workoutPlanRepository.delete(workoutPlan);
    }


    //choose trainer
    public User chooseTrainer(Long userId, Long trainerId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Trainer trainer = trainerRepository.findById(trainerId).orElseThrow(() -> new ResourceNotFoundException("Trainer not found"));

        user.setTrainer(trainer);
        return userRepository.save(user);
    }

    //unselect trainer
    public User unselectTrainer(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setTrainer(null);
        return userRepository.save(user);
    }

    // public User addWorkoutPlanToUser(Long userId, Long workoutPlanId) {
    //     User user = userRepository.findById(userId).orElseThrow();
    //     WorkoutPlan workoutPlan = workoutPlanRepository.findById(workoutPlanId).orElseThrow();
    //     user.getWorkoutPlans().add(workoutPlan);
    //     workoutPlan.setUser(user);
    //     return userRepository.save(user);
    // }

    // public User addWorkoutPlanToUser(Long userId, Long workoutPlanId) {
    //     User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    //     WorkoutPlan workoutPlan = workoutPlanRepository.findById(workoutPlanId).orElseThrow(() -> new RuntimeException("Workout Plan not found"));
        
    //     // Add workout plan to user's list of workout plans
    //     workoutPlan.setUser(user);
    //     workoutPlanRepository.save(workoutPlan);

    //     return userRepository.save(user);
    // }

    // public List<WorkoutPlan> getUserWorkoutPlans(Long userId) {
    //     User user = userRepository.findById(userId).orElseThrow();
    //     return user.getWorkoutPlans();
    // }

    public User addWorkoutPlanToUser(Long userId, Long workoutPlanId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(workoutPlanId)
            .orElseThrow(() -> new RuntimeException("Workout Plan not found"));
        
        workoutPlan.setUser(user);
        workoutPlanRepository.save(workoutPlan);

        return userRepository.save(user);
    }

    public List<WorkoutPlan> getUserWorkoutPlans(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getWorkoutPlans();
    }

    public List<ExerciseVideo> getAllExercises() {
        return exerciseVideoRepository.findAll();
    }



    public Trainer getTrainerByUserId(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return user.getTrainer();
        } else {
            return null;
        }
    }
}
