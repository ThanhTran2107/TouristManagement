package com.app.entities;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString(exclude = "password")
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long userId;
	
	@Column(name = "email", nullable = false, unique = true)
	@Email(message = "Invalid Email format")
	private String email;

	@Column(name = "password", nullable = false)
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", message = "Invalid Password!")
	private String password;

	@Enumerated(EnumType.STRING)
	private Role role;

	@Column(name = "first_name", nullable = false)
	@Length(min = 2, max = 20, message = "Invalid length of the first name")
	private String firstName;

	@Column(name = "last_name", nullable = false)
	@Length(min = 2, max = 20, message = "Invalid length of the last name")
	private String lastName;

	@Column(name = "date_of_birth", nullable = false)
	@Past(message = "dob should be in past")
	private LocalDate dob;

	@Column(name = "address", nullable = false)
	@Length(max = 100, message = "Invalid length of the address")
	private String address;

	@Column(name = "phone_no", nullable = false)
	@Pattern(regexp = "^[0-9]{9,11}$", message = "Phone number must be between 9 and 11 digits")
	private String phoneNo;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Feedback> feedbackList;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Booking> bookingList;
}