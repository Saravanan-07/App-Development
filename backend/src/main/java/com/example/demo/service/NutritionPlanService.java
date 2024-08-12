package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.NutritionPlan;
import com.example.demo.model.User;
import com.example.demo.repository.NutritionPlanRepository;
import com.example.demo.repository.UserRepository;

@Service
public class NutritionPlanService {

    @Autowired
    private NutritionPlanRepository nutritionPlanRepository;

    @Autowired
    private UserRepository userRepository;

    //choose nutrition plan
    public User selectNutritionPlan(Long userId, Long nutritionPlanId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        NutritionPlan nutritionPlan = nutritionPlanRepository.findById(nutritionPlanId).orElseThrow(() -> new ResourceNotFoundException("Nutrition Plan not found"));

        user.setNutritionPlan(nutritionPlan);
        return userRepository.save(user);
    }
}
