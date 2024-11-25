package com.app.service.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.TourDetailsDTO;
import com.app.entities.TourDetails;
import com.app.entities.TourTypeEnum;
import com.app.repository.TourDetailsRepository;
import com.app.service.TourDetailsService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TourDetailsServiceImpl implements TourDetailsService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private TourDetailsRepository tourDetailsRepository;

    // @Value("${upload.dir}")
    // private String uploadFolder;

    @Override
	public TourDetailsDTO saveTourDetails(TourDetailsDTO tourDetailsDTO) {
		TourDetails tourDetails = this.modelMapper.map(tourDetailsDTO, TourDetails.class);

		TourDetails savedTourDetails = tourDetailsRepository.save(tourDetails);

		return this.modelMapper.map(savedTourDetails, TourDetailsDTO.class);
	}

    @Override
    public TourDetailsDTO updateTourDetails(TourDetailsDTO tourDetailsDTO, Long tourDetailId) {
        TourDetails tourDetails = tourDetailsRepository.findById(tourDetailId)
                .orElseThrow(() -> new ResourceNotFoundException("Tour Details", "tourId", tourDetailId));

        tourDetails.setTourName(tourDetailsDTO.getTourName());
        tourDetails.setSource(tourDetailsDTO.getSource());
        tourDetails.setDestination(tourDetailsDTO.getDestination());
        tourDetails.setActivities(tourDetailsDTO.getActivities());
        tourDetails.setBookingAmount(tourDetailsDTO.getBookingAmount());
        tourDetails.setTourDetailInfo(tourDetailsDTO.getTourDetailInfo());
        tourDetails.setTourStartDate(tourDetailsDTO.getTourStartDate());
        tourDetails.setTourEndDate(tourDetailsDTO.getTourEndDate());
        tourDetails.setMaxSeats(tourDetailsDTO.getMaxSeats());
        tourDetails.setTransportationMode(tourDetailsDTO.getTransportationMode());
        tourDetails.setTourType(tourDetailsDTO.getTourType());
        tourDetails.setTourImage(tourDetailsDTO.getTourImage());
        
        tourDetailsRepository.save(tourDetails);
        return modelMapper.map(tourDetails, TourDetailsDTO.class);
    }


//     private String saveImage(MultipartFile image) {
//     if (image == null || image.isEmpty()) {
//         throw new IllegalArgumentException("File is empty or null");
//     }

//     String contentType = image.getContentType();
//     if (contentType == null || !contentType.startsWith("image/")) {
//         throw new IllegalArgumentException("Invalid file type. Only images are allowed.");
//     }

//     File dir = new File(uploadFolder);
//     if (!dir.exists() && !dir.mkdirs()) {
//         throw new RuntimeException("Failed to create upload directory");
//     }

//     String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
//     File uploadFile = new File(uploadFolder, fileName);

//     try {
//         image.transferTo(uploadFile);
//     } catch (IOException e) {
//         throw new RuntimeException("Failed to save image: " + e.getMessage());
//     }

//     return "/uploads/" + fileName;
// }

    @Override
    public TourDetailsDTO getTourDetailsById(Long tourId) {
        TourDetails tourDetails = this.tourDetailsRepository.findById(tourId)
                .orElseThrow(() -> new ResourceNotFoundException("Tour Details", "tourId", tourId));
        return this.modelMapper.map(tourDetails, TourDetailsDTO.class);
    }

    @Override
    public List<TourDetailsDTO> getAllToursDetails() {
        List<TourDetails> tourDetails = this.tourDetailsRepository.findAll();
        return tourDetails.stream()
                .map(tour -> this.modelMapper.map(tour, TourDetailsDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteTourDetailsById(Long tourId) {
        TourDetails tourDetails = this.tourDetailsRepository.findById(tourId)
                .orElseThrow(() -> new ResourceNotFoundException("Tour Details", "tourId", tourId));
        this.tourDetailsRepository.delete(tourDetails);
    }

    @Override
    public List<TourDetailsDTO> getToursByDestination(String destination) {
        List<TourDetails> tourDetailsList = this.tourDetailsRepository.findByDestination(destination)
                .orElseThrow(() -> new ResourceNotFoundException("Tour Details", "destination", destination));
        return tourDetailsList.stream()
                .map(tour -> this.modelMapper.map(tour, TourDetailsDTO.class))
                .collect(Collectors.toList());
    }

    @Override
	public List<TourDetailsDTO> findTourByBudget() {
		List<TourDetails> tourDetailsList = this.tourDetailsRepository.findTourByBudget();
		List<TourDetailsDTO> allTourDetails = tourDetailsList.stream()
				.map((tour) -> this.modelMapper.map(tour, TourDetailsDTO.class)).collect(Collectors.toList());
		return allTourDetails;
	}
	
	@Override
	public List<TourDetailsDTO> findTourByDuration() {
		List<TourDetails> tourDetailsList = this.tourDetailsRepository.findByDuration();
		List<TourDetailsDTO> allTourDetails = tourDetailsList.stream()
				.map((tour) -> this.modelMapper.map(tour, TourDetailsDTO.class)).collect(Collectors.toList());
		return allTourDetails;
	}
    
    @Override
    public List<TourDetailsDTO> getToursByTourType(TourTypeEnum tourType) {
        List<TourDetails> tourDetails = this.tourDetailsRepository.findByTourType(tourType)
                .orElseThrow(() -> new ResourceNotFoundException("Tour Details", "tourType", tourType));
        return tourDetails.stream()
                .map(tour -> this.modelMapper.map(tour, TourDetailsDTO.class))
                .collect(Collectors.toList());
    }

}