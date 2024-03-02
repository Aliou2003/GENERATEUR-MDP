from django.urls import path
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InscriptionView, LoginView
from .views import ApplicationViewSet
from .views import UserProfile
from . import views
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
router = DefaultRouter()
router.register(r'applications', ApplicationViewSet, basename='application')

urlpatterns = [
    path('inscription/', InscriptionView.as_view(), name='Inscription'),
    path('connexion/', method_decorator(csrf_exempt)(LoginView.as_view()), name='connexion'),
    path('api/user-profiles/', views.UserProfileListCreate.as_view(), name='user-profile-list-create'),
    path('applications/', views.ApplicationViewSet.as_view(), name='applications'),
]
