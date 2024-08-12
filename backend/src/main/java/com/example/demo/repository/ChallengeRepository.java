package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.*;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {}