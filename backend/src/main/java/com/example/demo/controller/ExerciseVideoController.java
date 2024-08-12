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

import com.example.demo.model.ExerciseVideo;
import com.example.demo.service.ExerciseVideoService;

@RestController
@RequestMapping("/exerciseVideos")
public class ExerciseVideoController {

    @Autowired
    private ExerciseVideoService exerciseVideoService;

    //add exercise_video
    // @PostMapping
    // public ResponseEntity<ExerciseVideo> addExerciseVideo(@RequestBody ExerciseVideo exerciseVideo) {
    //     ExerciseVideo savedExerciseVideo = exerciseVideoService.addExerciseVideo(exerciseVideo);
    //     return ResponseEntity.status(HttpStatus.CREATED).body(savedExerciseVideo);
    // }

    //remove exercise_video
    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteExerciseVideo(@PathVariable Long id) {
    //     exerciseVideoService.deleteExerciseVideo(id);
    //     return ResponseEntity.noContent().build();
    // }
}