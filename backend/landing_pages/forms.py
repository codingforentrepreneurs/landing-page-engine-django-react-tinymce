from django import forms 

from .models import LandingPage

class LandingPageForm(forms.ModelForm):
    # DRF -> vaildate
    class Meta:
        model = LandingPage
        fields = [
            'content'
        ]