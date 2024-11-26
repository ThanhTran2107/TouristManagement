package com.app.entities;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "tourist")
public class Tourist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tourist_id")
	private Long touristId;

	@Column(name = "age", nullable = false)
	private Integer age;

	@Column(name = "phone_number", nullable = false)
	@Pattern(regexp = "^[0-9]{9,11}$", message = "Phone number must be between 9 and 11 digits")
	private String phoneNumber;

	@Enumerated(EnumType.STRING)
	@Column(name = "id_proof", nullable = false)
	private IdProof idProof;

	@Column(name = "id_proof_no", nullable = false)
	private String idProofNo;

	@Length(min = 2, max = 20, message = "Invalid length of tourist name")
	@Column(name = "tourist_name", nullable = false)
	private String touristName;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "booking_id")
	private Booking booking;
}
