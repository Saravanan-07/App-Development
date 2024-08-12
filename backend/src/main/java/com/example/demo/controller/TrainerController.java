package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Trainer;
import com.example.demo.model.User;
import com.example.demo.service.TrainerService;

@RestController
@RequestMapping("/trainer")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;


    @GetMapping("/trainers")
    public ResponseEntity<List<Trainer>> getAllTrainers() {
        List<Trainer> trainers = trainerService.getAllTrainers();
        return new ResponseEntity<>(trainers, HttpStatus.OK);
    }


    //to view the list of users for the trainer
    @GetMapping("/{trainerId}/users")
    public ResponseEntity<List<User>> getUsersByTrainer(@PathVariable Long trainerId) {
        return new ResponseEntity<>(trainerService.getUsersByTrainer(trainerId), HttpStatus.OK);
    }

    //save or add trainer
    @PostMapping("/signup")
    public ResponseEntity<Trainer> createTrainer(@RequestBody Trainer trainer) {
        Trainer savedTrainer = trainerService.createTrainer(trainer);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTrainer);
    }
}
