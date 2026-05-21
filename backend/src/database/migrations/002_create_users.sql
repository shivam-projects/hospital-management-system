CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone VARCHAR(15),
    role_id INT NOT NULL REFERENCES roles(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO public.users (
    full_name,
    email,
    password,
    role_id
)
VALUES (
    'Super Admin',
    'admin@hms.com',
    '$2b$10$1hOTUzi4q7mXGbKIAxLkf.chbStrtIHs6WyNihz6O7a5Cq8RlVG9m',
    1
)
ON CONFLICT (email) DO NOTHING;