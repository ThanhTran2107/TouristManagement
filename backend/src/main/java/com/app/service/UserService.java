package com.app.service;

import java.util.List;

import com.app.dto.UserDTO;
import com.app.entities.Role;

public interface UserService {
	UserDTO createUser(UserDTO user);

	UserDTO updateUser(UserDTO user, Long userId);

	UserDTO getUserByEmailAndPassword(String email, String password);
	
	UserDTO getUserById(Long userId);

	List<UserDTO> getAllUsers();

	void deleteUserById(Long ID);

	UserDTO updateUserRole(String email, Role newRole);

	UserDTO deleteUserByEmail(String email);
}
