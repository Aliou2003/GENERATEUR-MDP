from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models





class Utilisateur(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255, blank=False)
    email = models.EmailField(unique=True)
    motDepasse = models.CharField(max_length=100, blank=True)
    dateCreation = models.DateField()

    def __str__(self):
        return f"{self.nom} {self.prenom}"

    def save(self, *args, **kwargs):
        # Hashage du mot de passe avant de l'enregistrer dans la base de données
        if self.motDepasse:
            self.motDepasse = make_password(self.motDepasse)
        super().save(*args, **kwargs)


class Application(models.Model):
    date_association = models.DateField(auto_now_add=True)
    nom_application = models.CharField(max_length=100)
    mot_de_passe_généré = models.CharField(max_length=100)


class UserProfile(models.Model):
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)

    def __str__(self):
        return f"Profile de {self.user.username}"


