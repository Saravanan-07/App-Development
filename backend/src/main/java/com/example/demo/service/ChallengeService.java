package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.UnauthorizedException;
import com.example.demo.model.Challenge;
import com.example.demo.model.User;
import com.example.demo.repository.ChallengeRepository;
import com.example.demo.repository.UserRepository;

@Service
public class ChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private UserRepository userRepository;

    public Challenge postChallenge(Long userId, Challenge challenge) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        challenge.getUsers().add(user);
        return challengeRepository.save(challenge);
    }

    public Challenge addUserToChallenge(Long userId, Long challengeId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(() -> new ResourceNotFoundException("Challenge not found"));
        challenge.getUsers().add(user);
        return challengeRepository.save(challenge);
    }

    public void deleteChallenge(Long userId, Long challengeId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow(() -> new ResourceNotFoundException("Challenge not found"));

        if (challenge.getUsers().get(0).getId().equals(user.getId())) {
            challengeRepository.delete(challenge);
        } else {
            throw new UnauthorizedException("User is not authorized to delete this challenge");
        }
    }
}
