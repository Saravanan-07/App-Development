package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.*;
@RestController
@RequestMapping("/nutrition-plans")
public class NutritionPlanController {

    @Autowired
    private NutritionPlanService nutritionPlanService;

    @PutMapping("/user/{userId}/select/{nutritionPlanId}")
    public ResponseEntity<User> selectNutritionPlan(@PathVariable Long userId, @PathVariable Long nutritionPlanId) {
        User updatedUser = nutritionPlanService.selectNutritionPlan(userId, nutritionPlanId);
        return ResponseEntity.ok(updatedUser);
    }
}
