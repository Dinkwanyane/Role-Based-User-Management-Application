# Role-Based-User-Management-Application
A small full-stack application demonstrating role-based authentication and authorization, built with Django, Django REST Framework, PostgreSQL, Angular, and Tailwind CSS.

## 2. Technology Stack
- Database	PostgreSQL
- Backend	Django 5.2
- API	Django REST Framework
- Frontend	Angular 22.1.6
- Styling	Tailwind CSS
- Authentication	Django authentication/session-based authentication
- Source Control	Git
- API Format	JSON
- Testing	Django tests + Angular unit tests
- Optional Environment	Docker / Docker Compose




## 3. Project Structure
```text
Role Based User Management Application/
├── backend/
│ ├── config/ # Django project settings, urls, wsgi/asgi
│ ├── users/ # Custom user app
│ │ ├── models.py # Custom User model (name, surname, role)
│ │ ├── managers.py # Custom UserManager (admin role on createsuperuser)
│ │ ├── serializers.py # UserSerializer, UserCreateSerializer
│ │ ├── views.py # Auth + user endpoints
│ │ ├── permissions.py # Role-based DRF permissions
│ │ ├── urls.py
│ │ └── migrations/
│ ├── manage.py
│ └── requirements.txt
│
└── frontend/
└── app/
├── src/
│ ├── app/
│ │ ├── core/
│ │ │ └── auth/
│ │ │ ├── auth.service.ts
│ │ │ ├── auth.guard.ts
│ │ │ ├── admin.guard.ts
│ │ │ ├── user.guard.ts
│ │ │ └── auth.interceptor.ts
│ │ ├── features/
│ │ │ ├── login/
│ │ │ ├── admin-welcome/
│ │ │ ├── user-welcome/
│ │ │ └── user-create/
│ │ ├── app.routes.ts
│ │ ├── app.config.ts
│ │ └── app.ts
│ └── styles.css
├── tailwind.config.js
├── postcss.config.js
└── angular.json
```

## 4. Prerequisites
- Python 3.12
- Node.js 22.23.2 (managed via nvm)
- Angular CLI 22.1.6
- PostgreSQL 16
- Git

## 5. Environment Variables

Backend `.env` file (in `backend/`, never committed to Git):

## 6. Getting Started

### 6.1 Backend Setup
- ensure python 3.12 is being used for backend
- run cd Role Based User Management Application\backend
- run pip install django djangorestframework psycopg2-binary python-dotenv
- run pip freeze > requirements.txt
- to create django project run django-admin startproject config .
- to launch the django app named users, run python manage.py startapp users
- create a PostgreSQL database (e.g. `role_mgmt_db`) via pgAdmin4 or psql
- add the `.env` file as shown in section 5
- run `python manage.py makemigrations` and `python manage.py migrate`
- run `python manage.py createsuperuser` (prompts for username, name, surname, and password; role is automatically set to admin)
- run `python manage.py runserver` to start the backend at `http://127.0.0.1:8000/`



### 6.2 Frontend Setup
- cd to Role Based User Management Application\frontend
- run nvm use 22.23.2
- run npm install -g @angular/cli@22.1.6
- run npm install tailwindcss @tailwindcss/postcss postcss
- to create angular app run ng new app --routing --style=css

### 6.3 Logging In

- Navigate to `http://localhost:4200/login`
- Log in using a username and password created via `createsuperuser` (admin) or via the Create User page (standard user)
- Admins are redirected to `/admin-welcome`; standard users are redirected to `/user-welcome`
- Session-based authentication is used, with a CSRF token fetched automatically on page load


## 7. API Reference


## 8. Features by Role
### 8.1 Admin
- View a list of all registered standard users (excluding other admins)
- Create new standard user accounts via the Create User page
- Blocked from accessing the standard User Welcome page, with an authorization alert

### 8.2 User
- View a personalized welcome page with their name and surname
- Log out of their session
- Blocked from accessing Admin Welcome and Create User pages, with an authorization alert

## 9. Authorization Model
- Authentication is session-based, handled by Django's built-in auth system
- Every user has a `role` field: `admin` or `user` (default)
- `authGuard` confirms a valid session exists before allowing access to any protected route
- `adminGuard` allows only `role === 'admin'` to access `/admin-welcome` and `/user-create`; non-admins see an alert and are redirected to `/user-welcome`
- `userGuard` allows only non-admins to access `/user-welcome`; admins see an alert and are redirected
- Role checks are enforced on both the frontend (route guards) and backend (DRF permissions) to prevent direct API access by unauthorized roles

## 10. Testing


## 11. Git Workflow

main
- |
- +-- feature/user-model
- +-- feature/auth-api
- +-- feature/login-page
- +-- feature/role-guards
- +-- feature/user-create

### Pull Request rules
- No direct commits to `main`.
- At least one review before merge (mentor: Twalani/Vestar).
- Small, focused PRs per feature — avoid one large PR for the whole app.
- PRs are reviewed for: correctness, readability, security, testing, naming, error handling, architecture.




## 12. Known Limitations / Out of Scope
- No password reset or email verification flow
- No pagination on the registered users list
- No automated CI pipeline configured
- Docker/Docker Compose setup is optional and not yet implemented
- No audit logging of admin actions (e.g. user creation history)

## 13. Contributors
- Dinkwanyane — Intern Developer
- Twalani — Product Owner / Scrum Master, Technical Reviewer
- Vestar — Technical Reviewer

