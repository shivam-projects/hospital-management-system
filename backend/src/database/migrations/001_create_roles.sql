CREATE TABLE IF NOT EXISTS public.roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO public.roles (name, description)
VALUES
('Super Admin', 'Full system access'),
('Admin', 'Administrative access'),
('Doctor', 'Doctor access'),
('Receptionist', 'Patient and appointment handling')
ON CONFLICT (name) DO NOTHING;