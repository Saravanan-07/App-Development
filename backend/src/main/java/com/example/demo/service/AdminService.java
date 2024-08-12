package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.demo.model.Admin;
import com.example.demo.model.ExerciseVideo;
import com.example.demo.model.NutritionPlan;
import com.example.demo.model.Trainer;
import com.example.demo.model.User;
import com.example.demo.repository.ExerciseVideoRepository;
import com.example.demo.repository.NutritionPlanRepository;
import com.example.demo.repository.TrainerRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private NutritionPlanRepository nutritionPlanRepository;

    @Autowired
    private ExerciseVideoRepository exerciseVideoRepository;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public ExerciseVideo addExercise(ExerciseVideo exercise) {
        return exerciseVideoRepository.save(exercise);
    }

    public void deleteExercise(Long exerciseId) {
        exerciseVideoRepository.deleteById(exerciseId);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public Trainer updateTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    public NutritionPlan addNutritionPlan(NutritionPlan nutritionPlan) {
        return nutritionPlanRepository.save(nutritionPlan);
    }

    public void deleteNutritionPlan(Long nutritionPlanId) {
        nutritionPlanRepository.deleteById(nutritionPlanId);
    }

    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
}
