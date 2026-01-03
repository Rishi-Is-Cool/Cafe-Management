#SmartCafé  
### AI-Enabled Café Management System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)

> **SmartCafé** is a full-stack café management system designed to simulate real-world business operations such as order processing, inventory management, wastage tracking, analytics, and AI-driven decision support.

This project was developed as part of an **engineering internship at Tata Consulting Engineers Limited (TCE)** and focuses on **scalable architecture, clean database design, backend automation, and practical business intelligence**.

---

##Features

### Dashboard & UI
- Modern and clean admin dashboard built using React and CSS.
- Component-based architecture with reusable UI elements.
- Responsive layout suitable for desktop and tablet screens.

### Order Management
- Product-based order placement with quantity selection.
- Automatic total price calculation.
- Order history with timestamps.
- Daily sales summary generation.

### Inventory Management
- Ingredient-based inventory tracking system.
- Recipe mapping between products and ingredients.
- Automatic inventory deduction using PostgreSQL triggers.

### Wastage Tracking
- Manual logging of wastage due to spoilage or spillage.
- Backend-level automation to deduct wasted quantities from inventory.
- Historical wastage records for analysis and reporting.

### Analytics & Reports
- Daily sales trend analysis.
- Product performance overview.
- Ingredient wastage insights.
- Data-driven visual analytics using real transactional data.

### AI-Based Business Insights
- Rule-based decision support system.
- Identification of best-selling products.
- Detection of high-wastage ingredients.
- Actionable recommendations to improve operational efficiency.

---

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript (ES6+)
- CSS3

### Backend & Database
- Supabase
- PostgreSQL
- SQL (Triggers and Functions)

### Architecture & Concepts
- MVC (Model-View-Controller)
- Layered Architecture (BLL and DAL concepts)
- Relational Database Design
- Backend Automation

---

## 🛠️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/smart-cafe.git
cd smart-cafe
```

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the project root directory and add your Supabase credentials.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup (Supabase)

Use the Supabase SQL Editor to create the required tables:

* products
* orders
* ingredients
* product_ingredients
* wastage

Database triggers and functions are used to automate inventory and wastage deduction.

### Run the Application

```bash
npm run dev
```

---

## Project Structure

```plaintext
src/
├── components/
├── pages/
├── services/
├── styles/
├── App.jsx
├── main.jsx
```

---

## Learning Outcomes

* Practical implementation of MVC and layered architecture concepts.
* Hands-on experience with SQL, PostgreSQL, and backend automation.
* Real-world usage of React component-based development.
* Understanding of inventory and wastage economics.
* Exposure to industry-style workflows and problem-solving approaches.

---

## Future Enhancements

* Authentication system with role-based access (Owner / Staff).
* Exportable reports in CSV or PDF format.
* Advanced AI integration using language models.
* Payment gateway integration.
* Production deployment using Vercel and Supabase.

---

## License

This project is developed strictly for **educational and internship purposes**.

---

<div align="center">
  <sub>Developed during an Engineering Internship</sub><br/>
  <strong>Rishikesh Patil</strong>
</div>
```
