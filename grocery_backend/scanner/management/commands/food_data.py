import requests
from django.core.management.base import BaseCommand
from scanner.models import Product

class Command(BaseCommand):
    help = 'Imports product data from Open Food Facts'

    def handle(self, *args, **kwargs):
        # API URL (change based on your needs)
        url = "https://world.openfoodfacts.org/cgi/search.pl?search_terms=apple&json=true"

        # Send GET request to Open Food Facts API
        response = requests.get(url)

        # If the request was successful (status code 200)
        if response.status_code == 200:
            data = response.json()  # Convert the JSON response to a Python dictionary

            # Loop through each product in the response
            for product in data['products']:
                barcode = product.get('code', 'N/A')
                name = product.get('product_name', 'Unknown')
                ingredients = product.get('ingredients_text', 'Not Available')
                nutrition_info = product.get('nutrition_grades', 'Not Available')

                # Create a new product entry in the database
                Product.objects.get_or_create(
                    barcode=barcode,
                    name=name,
                    ingredients=ingredients,
                    nutrition_info=nutrition_info
                )

            self.stdout.write(self.style.SUCCESS('Successfully imported food data'))
        else:
            self.stdout.write(self.style.ERROR('Failed to retrieve data from Open Food Facts'))
