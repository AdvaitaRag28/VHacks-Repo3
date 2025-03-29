from django.shortcuts import render

from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
# Create your views here.
from .models import CustomUser, Product

def check_cholesterol_level(user_id, product_id):
    # First, check if the user has high cholesterol
    if user_has_high_cholesterol(user_id):
        # Retrieve the product details
        try:
            product = Product.objects.get(id=product_id)
            
            # Check if the product has a cholesterol level higher than 50mg
            if product.cholesterol > 50:
                return f"Warning: The product '{product.name}' has {product.cholesterol} mg of cholesterol per 100g, which is high for users with high cholesterol."
            else:
                return f"The product '{product.name}' has a safe cholesterol level of {product.cholesterol} mg per 100g."
        except Product.DoesNotExist:
            return "Product not found."
    else:
        return "The user does not have high cholesterol listed in their conditions."

from django.http import JsonResponse
from .utils import check_cholesterol_level  # If you've separated the logic in a utils.py

def check_product_cholesterol(request, user_id, product_id):
    result = check_cholesterol_level(user_id, product_id)
    return JsonResponse({"message": result})

import pytesseract
from PIL import Image
from django.http import JsonResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage

# Make sure Tesseract executable is in your PATH, or provide the path explicitly:
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # on Windows

def process_image(request):
    if request.method == 'POST' and request.FILES['product_image']:
        product_image = request.FILES['product_image']
        
        # Save the uploaded image to a temporary location
        fs = FileSystemStorage()
        filename = fs.save(product_image.name, product_image)
        filepath = fs.url(filename)
        
        # Open the image and extract text using Tesseract OCR
        img = Image.open(filename)
        extracted_text = pytesseract.image_to_string(img)

        # For example, you can now search for "cholesterol" in the extracted text
        if 'cholesterol' in extracted_text.lower():
            return JsonResponse({"message": "Cholesterol information found in the image.", "extracted_text": extracted_text}, status=200)
        else:
            return JsonResponse({"message": "Cholesterol information not found in the image.", "extracted_text": extracted_text}, status=200)

    return JsonResponse({"error": "No image uploaded."}, status=400)


from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Product
from accounts.models import CustomUser

def check_cholesterol_from_image(request, user_id):
    # Assume cholesterol value is extracted from image
    cholesterol_per_100g = float(request.GET.get('cholesterol_per_100g'))  # Get extracted cholesterol value
    
    # Get the user
    user = get_object_or_404(CustomUser, pk=user_id)

    # Check if the user has 'high cholesterol' in their health conditions
    if 'high cholesterol' in user.health_conditions.lower():
        # Compare the cholesterol level with the threshold
        if cholesterol_per_100g > 50:
            warning_message = f"The product has high cholesterol levels ({cholesterol_per_100g} mg per 100g), which may not be suitable for your condition."
            return JsonResponse({"warning": warning_message}, status=200)
        else:
            return JsonResponse({"message": "This product is safe for you."}, status=200)
    else:
        return JsonResponse({"message": "No health condition detected for cholesterol."}, status=200)

