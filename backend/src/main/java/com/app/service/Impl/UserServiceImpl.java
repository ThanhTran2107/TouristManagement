package com.app.service.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.repository.UserRepository;
import com.app.service.UserService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	ModelMapper modelMapper;
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDTO createUser(UserDTO userdto) {
		User user = this.modelMapper.map(userdto, User.class);
		User createdUser = userRepository.save(user);
		return this.modelMapper.map(createdUser, UserDTO.class);
	}

	@Override
	public UserDTO updateUser(UserDTO userdto, Long userId) {
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("user", "userid", userId));
		user.setEmail(userdto.getEmail());
		user.setPassword(userdto.getPassword());
		user.setFirstName(userdto.getFirstName());
		user.setLastName(userdto.getLastName());
		user.setAddress(userdto.getAddress());
		user.setDob(userdto.getDob());
//		user.setPassword(userdto.getPassword());
		user.setPhoneNo(userdto.getPhoneNo());
		User updatedUser = this.userRepository.save(user);

		return this.modelMapper.map(updatedUser, UserDTO.class);
	}

	@Override
	public UserDTO getUserById(Long userId) {
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("user", "userid", userId));
		return this.modelMapper.map(user, UserDTO.class);
	}

	@Override
	public List<UserDTO> getAllUsers() {
		List<User> users = this.userRepository.findAll();
		List<UserDTO> allUserDto = users.stream().map((user) -> this.modelMapper.map(user, UserDTO.class))
				.collect(Collectors.toList());
		return allUserDto;
	}

	@Override
	public void deleteUserById(Long userId) {
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("user", "userid", userId));
		this.userRepository.delete(user);
	}

	@Override
	public UserDTO getUserByEmailAndPassword(String email, String password) {
		User user = this.userRepository.findByEmailAndPassword(email, password).orElseThrow(()-> new ResourceNotFoundException("User", "email", email));
		
		return this.modelMapper.map(user, UserDTO.class);
	}

	@Override
	public UserDTO getUserByEmail(String email) {
		User user = this.userRepository.findByEmail(email).orElse(null); // Trả về null nếu không tìm thấy
		return user != null ? this.modelMapper.map(user, UserDTO.class) : null; // Trả về null nếu không tìm thấy
	}

    @Override
	public UserDTO updateUserRole(String email, Role newRole) {
    // Tìm người dùng theo email
		User user = this.userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User ", "email", email));

		// Cập nhật vai trò
		user.setRole(newRole); // Giả sử bạn có phương thức setRole trong User
		User updatedUser  = this.userRepository.save(user); // Lưu thay đổi

    return this.modelMapper.map(updatedUser , UserDTO.class); // Trả về UserDTO đã cập nhật

	}

	@Override
    public UserDTO deleteUserByEmail(String email) {
        User user = this.userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User ", "email", email));

        UserDTO userDTO = this.modelMapper.map(user, UserDTO.class);

        this.userRepository.delete(user);

        return userDTO;
    }
}