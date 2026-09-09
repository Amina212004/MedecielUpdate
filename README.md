#  Medeciel — School Clinic Management System (Backend)

A Django REST Framework backend for managing a school/campus medical clinic — built for **ESI-SBA** (École Supérieure en Informatique, Sidi Bel Abbès). Handles role-based accounts (patients, doctors, assistants, directors, admins), an admin-verified signup workflow, email-based password recovery, and a public landing page with a newsletter/contact form. Designed to pair with a separate frontend (CORS is configured for a Vite dev server on `localhost:5173`).

##  Features

- **Role-Based Accounts** – Custom user model with distinct roles: `Patient`, `Student`, `Teacher`, `ATS`, `Medecin` (Doctor), `Assistant` (Assistant-Doctor), `Director`, and `Admin`
- **Email-Based Authentication** – Login with institutional email (validated against the `prenom.nom@esi-sba.dz` format), token-based auth via DRF's `TokenAuthentication`
- **Admin-Gated Signup** – New users register and wait for an admin to verify their account before they can log in; admins get notified by email on every signup
- **Admin User Management** – Admins can directly add pre-verified users, view recently added users filtered by role, and activate/deactivate accounts
- **Password Recovery** – Emails a 6-digit verification code (1-hour expiry) to reset a forgotten password
- **Staff & Patient Directories** – Paginated endpoints to list medical staff (doctors/assistants) and patients, filterable by role
- **Profile Management** – Authenticated users can update their profile (including a profile picture) and change their password
- **Public Landing Page** – Marketing/info page with a newsletter subscription form and a contact/support form that emails the clinic team
- **Admin Dashboard** – Custom-branded `django-jazzmin` admin panel ("Medical Admin Portal") with role-specific icons

##  Tech Stack

| Category | Technology |
|---|---|
| **Backend** | Python, Django 5.2 |
| **API** | Django REST Framework, Token Authentication |
| **Database** | SQLite (default) |
| **CORS** | django-cors-headers (configured for a separate frontend app) |
| **Email** | Django SMTP backend (Gmail) — verification codes, admin notifications, support requests |
| **Admin UI** | django-jazzmin |

##  Project Structure

```
MedecielUpdate/
├── clinic/              # Django project settings & root URL config
├── accounts/            # Custom user model, auth, and admin-management API
│   ├── models.py          # CustomUser (role-based, email login)
│   ├── serializers.py     # Login/Signup/Password-reset serializers
│   ├── views.py           # Auth, admin, staff & patient management endpoints
│   └── urls.py
├── core/                 # Public-facing app
│   ├── models.py           # NewsletterSubscriber
│   └── views.py             # Landing page, newsletter, support/contact email
├── templates/landing/     # Landing page template
├── static/                # CSS, JS, and image assets
├── media/profile_images/  # Uploaded user profile pictures
└── manage.py
```

##  API Overview

All account/auth endpoints are namespaced under `/api/`:

| Endpoint | Method | Description |
|---|---|---|
| `/api/signup/` | POST | Register a new account (pending admin verification) |
| `/api/login/` | POST | Log in and receive an auth token |
| `/api/password-reset-request/` | POST | Request a password reset code by email |
| `/api/verify-code/` | POST | Verify the reset code |
| `/api/password-reset/` | POST | Set a new password using the verified code |
| `/api/current-user/` | GET | Get the logged-in user's profile |
| `/api/profile/update/` | PUT | Update profile info / picture |
| `/api/change-password/` | POST | Change password while logged in |
| `/api/verify-user/` | GET/POST | Admin: list & approve/reject pending signups |
| `/api/admin/add-user/` | POST | Admin: create a pre-verified user |
| `/api/recent-users/` | GET | Admin: recently added users, filterable by role |
| `/api/medical-staff/` | GET | List doctors & assistant-doctors (paginated) |
| `/api/patients/` | GET | List patients (paginated) |
| `/api/patients/<id>/toggle-active/` | PATCH | Admin: activate/deactivate an account |

Public/landing endpoints (root URL):

| Endpoint | Description |
|---|---|
| `/` | Landing page |
| `/subscribe/` | Newsletter signup |
| `/send-support-email/` | Contact/support form submission |

##  Installation & Setup

### Prerequisites
- Python 3.11+
- pip

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amina212004/MedecielUpdate.git
   cd MedecielUpdate
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install django djangorestframework django-cors-headers django-jazzmin pillow
   ```
   > No `requirements.txt` is currently in the repo — run `pip freeze > requirements.txt` once everything's installed so others can set up in one command.

4. **Configure environment variables**

   Move the secrets out of `settings.py` and into environment variables (see security note below):
   ```
   SECRET_KEY=your-django-secret-key
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-gmail-app-password
   ```

5. **Apply migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server**
   ```bash
   python manage.py runserver
   ```

   Visit `http://127.0.0.1:8000/` for the landing page and `http://127.0.0.1:8000/admin/` for the admin dashboard.



---

*A Django REST Framework backend powering a role-based clinic management platform for a school/university campus.*
