AlTER TABLE users
ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;


AlTER TABLE users
ADD COLUMN email_verification_token VARCHAR(100);