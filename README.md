# Lead Capture Web Application

## Live Application

- **Frontend:** https://onboardly-45.vercel.app/
- **Backend API:** https://landing-page-klmm.onrender.com 
- **Repository:** https://github.com/amyy45/Landing-page

---

## Project Summary

This project is a lightweight full-stack web application designed to capture and store user leads through a simple landing page.  
The system is fully deployed and demonstrates end-to-end ownership — from UI to backend logic and data persistence.

---

## What Was Built

### Landing Page
- Clear value proposition
- Supporting description
- Lead capture form with:
  - Name
  - Email
  - Phone number
- Responsive layout
- Deployed and publicly accessible

### Backend Service
- REST API for accepting lead data
- Input handling and persistence
- Connected to a cloud-hosted PostgreSQL database
- Deployed as a production service

### Data Layer
- PostgreSQL database
- Structured lead storage
- Verified through live submissions

---

## Technology Stack

**Frontend**
- React
- Tailwind CSS
- Vercel

**Backend**
- Flask (Python)
- Gunicorn
- Render

**Database**
- PostgreSQL

---

## API Reference

### Create Lead
**POST** `/leads`

**Request**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210"
}
```

**Response**

```json
{
  "message": "Lead created successfully",
    "id": 1,
}
```

---

## Repository Structure

```
lead-capture-app/
├── frontend/   # React landing page
├── backend/    # Flask API
└── README.md
```

---

## Verification

* Form submissions trigger API requests
* API stores data in PostgreSQL
* Records confirmed via database dashboard
* All components are live and accessible

---

## Current Status

✔ Fully deployed
✔ Functional
