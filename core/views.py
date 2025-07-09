from django.contrib import messages
from django import forms
from .models import NewsletterSubscriber
from django.shortcuts import redirect, render
from django.core.mail import send_mail
from django.http import JsonResponse
import logging

def home(request):
    return render(request,"landing/index.html")

class NewsletterForm(forms.ModelForm):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']

def subscribe_newsletter(request):
    if request.method == "POST":
        form = NewsletterForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            if not NewsletterSubscriber.objects.filter(email=email).exists():
                form.save()
                messages.success(request, "Thanks for subscribing!")
            else:
                messages.info(request, "You're already subscribed.")
        else:
            messages.error(request, "Invalid email format.")
    return redirect("home")



logger = logging.getLogger(__name__)

def send_support_email(request):
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            email = request.POST.get('email')
            message = request.POST.get('message')
            
            logger.info(f"Received contact form: {name}, {email}, {message}")
            
            
            send_mail(
                f"New Support Request from {name}",
                f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}",
                'medeciels@gmail.com',
                ['medeciels@gmail.com'],  
                fail_silently=False,
            )
            
            logger.info("Email sent successfully")
            return JsonResponse({'status': 'success'})
            
        except Exception as e:
            logger.error(f"Email failed: {str(e)}")
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error'}, status=400)