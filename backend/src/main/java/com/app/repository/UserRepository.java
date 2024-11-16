package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

	public Optional<User> findByEmailAndPassword(String email,String password);


    void deleteByEmail(String email);

}
