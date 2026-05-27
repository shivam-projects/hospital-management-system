CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL PRIMARY KEY,

    user_id INT UNIQUE NOT NULL,
    department_id INT NOT NULL,

    specialization VARCHAR(100) NOT NULL,
    qualification VARCHAR(150),

    experience_years INT DEFAULT 0,

    availability_status BOOLEAN DEFAULT true,

    license_number VARCHAR(100) UNIQUE,

    profile_image TEXT,

    consultation_fee DECIMAL(10,2) DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_doctor_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_doctor_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE CASCADE
);