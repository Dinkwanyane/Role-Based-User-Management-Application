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


## 4. Prerequisites


## 5. Environment Variables


## 6. Getting Started
### 6.1 Backend Setup
- ensure python 3.12 is being used for backend
- run cd Role Based User Management Application\backend
- run pip install django djangorestframework psycopg2-binary python-dotenv
- run pip freeze > requirements.txt
- to create django project run django-admin startproject config .
- to launch the django app named users, run python manage.py startapp users



### 6.2 Frontend Setup
- cd to Role Based User Management Application\frontend
- run nvm use 22.23.2
- run npm install -g @angular/cli@22.1.6
- run npm install tailwindcss @tailwindcss/postcss postcss
- to create angular app run ng new app --routing --style=css

### 6.3 Logging In


## 7. API Reference


## 8. Features by Role
### 8.1 Admin


### 8.2 User


## 9. Authorization Model


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



## 12. Development Timeline


## 13. Definition of Done


## 14. Known Limitations / Out of Scope


## 15. Contributors


