package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.ExerciseVideo;
import com.example.demo.repository.ExerciseVideoRepository;

@Service
public class ExerciseVideoService {

    @Autowired
    private ExerciseVideoRepository exerciseVideoRepository;

    //add exercise video
    public ExerciseVideo addExerciseVideo(ExerciseVideo exerciseVideo) {
        return exerciseVideoRepository.save(exerciseVideo);
    }

    //remove exercise_video
     public void deleteExerciseVideo(Long id) {
        if (!exerciseVideoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Exercise video not found with id: " + id);
        }
        exerciseVideoRepository.deleteById(id);
    }
}
