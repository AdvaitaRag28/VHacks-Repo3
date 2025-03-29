from django.db import models

# Createfrom django.db import models
class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class Product(models.Model):
    barcode = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    ingredients = models.TextField()
    nutrition_info = models.TextField()
    cholesterol_per_100g = models.FloatField()

    def __str__(self):
        return self.name



