package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tour_details")
public class TourDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tour_id")
    private Long tourId;

    @Column(name = "tour_name", nullable = false)
    @NonNull
    private String tourName; 

    @Column(name = "source", nullable = false)
    @NonNull
    private String source; 

    @Column(name = "destination", nullable = false)
    @NonNull
    private String destination; 

    @Column(name = "activities", nullable = false)
    @NonNull
    private String activities; 

    @Column(name = "booking_amount", nullable = false)
    @Min(value = 0, message = "The value must be positive")
    private Double bookingAmount;

    @Column(name = "tour_detail_info")
    private String tourDetailInfo; 

    @Column(name = "tour_start_date", nullable = false)
    private LocalDate tourStartDate;

    @Column(name = "tour_end_date", nullable = false)
    private LocalDate tourEndDate;

    @Column(name = "departure_time", nullable = false)
    @NonNull
    private String departureTime; 

    @Column(name = "max_seats")
    @Min(value = 0)
    private Integer maxSeats;

    @Column(name = "transportation_mode")
    @Enumerated(EnumType.STRING)
    private TransportationMode transportationMode;

    @Column(name = "tour_type")
    @Enumerated(EnumType.STRING)
    private TourTypeEnum tourType;

    @OneToMany(mappedBy = "tourDetails", cascade = CascadeType.ALL)
    private List<Booking> bookingList = new ArrayList<>();

    @Column(name = "image_path", nullable = false)
    private String tourImage;

}