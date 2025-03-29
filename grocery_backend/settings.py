INSTALLED_APPS = [
    # ... existing apps ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ... existing middleware ...
]

# During development, you can use:
CORS_ALLOW_ALL_ORIGINS = True  # Only for development!

# For production, specify your frontend domain:
# CORS_ALLOWED_ORIGINS = [
#     "http://your-frontend-domain.com",
# ] 