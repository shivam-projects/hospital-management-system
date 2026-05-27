CREATE TABLE IF NOT EXISTS public.departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO public.departments (name, description)
VALUES
('Cardiology', 'Heart related treatments'),
('Neurology', 'Brain and nervous system'),
('Orthopedics', 'Bone and joint treatments'),
('Pediatrics', 'Child healthcare department')

ON CONFLICT (name) DO NOTHING;