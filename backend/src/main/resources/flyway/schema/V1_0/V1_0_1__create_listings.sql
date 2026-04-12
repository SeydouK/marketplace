CREATE TABLE listings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(180) NOT NULL,
    description TEXT,
    animal_type VARCHAR(60) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    location VARCHAR(120) NOT NULL,
    seller_name VARCHAR(160) NOT NULL,
    seller_phone VARCHAR(60) NOT NULL,
    image VARCHAR(512),
    rating NUMERIC(2, 1),
    age_months INTEGER,
    breed VARCHAR(120),
    status VARCHAR(20) NOT NULL DEFAULT 'DISPONIBLE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_listings_user_id ON listings(user_id);
CREATE INDEX idx_listings_location ON listings(location);
CREATE INDEX idx_listings_animal_type ON listings(animal_type);
CREATE INDEX idx_listings_status ON listings(status);
