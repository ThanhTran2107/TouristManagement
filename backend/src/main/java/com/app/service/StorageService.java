package com.app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StorageService {

    private final Path rootLocation = Paths.get("../uploads");

    public String store(MultipartFile file) {
        try {
            // Kiểm tra nếu thư mục lưu trữ chưa tồn tại thì tạo
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }

            // Tạo tên file ngẫu nhiên để tránh trùng
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path targetLocation = rootLocation.resolve(fileName);

            // Lưu file vào thư mục uploads
            Files.copy(file.getInputStream(), targetLocation);

            return fileName;  // Trả về tên file đã lưu
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
}
