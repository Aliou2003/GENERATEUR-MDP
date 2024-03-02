from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Utilisateur, UserProfile, Application
from .serializers import UtilisateurSerializer, UserProfileSerializer, ApplicationSerializer
from rest_framework import status
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import AllowAny  # Modifier la permission pour permettre à tout le monde de se connecter
from rest_framework.decorators import permission_classes
from rest_framework import generics
from rest_framework import viewsets
from .models import User



class InscriptionView(APIView):
    def get(self, request, *args, **kwargs):
        utilisateurs = Utilisateur.objects.all()
        serializer = UtilisateurSerializer(utilisateurs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')

        # Vérifier si l'utilisateur existe déjà
        if User.objects.filter(email=email).exists():
            return Response({'message': 'Cet utilisateur est déjà inscrit.'}, status=status.HTTP_400_BAD_REQUEST)

        # L'utilisateur n'existe pas, procéder à l'inscription
        serializer = UtilisateurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Inscription réussie.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    @method_decorator(csrf_exempt)  # Décorateur pour désactiver la protection CSRF
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        email = request.data.get('email')
        mot_de_passe = request.data.get('motDepasse')

        if not email or not mot_de_passe:
            return Response({'message': 'L\'email et le mot de passe sont requis.'}, status=status.HTTP_400_BAD_REQUEST)

        utilisateur = User.objects.filter(email=email).first()

        if utilisateur is not None and utilisateur.check_password(mot_de_passe):
            login(request, utilisateur)
            return Response({'message': 'Connexion réussie.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Email ou mot de passe incorrect.'}, status=status.HTTP_401_UNAUTHORIZED)

        

class ApplicationViewSet(APIView):
    def post(self, request):
        serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        applications = Application.objects.all()
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)

        
class UserProfileListCreate(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
