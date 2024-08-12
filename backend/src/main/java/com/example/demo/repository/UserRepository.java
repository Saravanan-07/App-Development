package com.example.demo.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.*;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByTrainerId(Long trainerId);
}