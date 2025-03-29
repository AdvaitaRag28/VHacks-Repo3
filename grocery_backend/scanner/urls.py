from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('scanner.urls')),
]

from django.urls import path
from . import views

urlpatterns = [
    path('check_cholesterol/<int:user_id>/<int:product_id>/', views.check_product_cholesterol, name='check_cholesterol'),
]


urlpatterns = [
    path('check_cholesterol/<int:user_id>/<int:product_id>/', views.check_cholesterol_warning, name='check_cholesterol_warning'),
]

from django.urls import path
from . import views

urlpatterns = [
    path('process_image/', views.process_image, name='process_image'),
]
