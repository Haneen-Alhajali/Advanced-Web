<a name="readme-top"></a>
<div align="center">
     <br>
</div>
<div align="center">
  <br>
<h1>Village Management System</h1> &nbsp;     
</div>
<div align="center">
<img src="/src/assets/images/VMS1.png" alt="logo image" style="height: 200px; width: 100%; object-fit: contain;">
</div>
<br>
<br>

<a name="intro"></a>
## 🌟 About the Project
<strong>Village Management System</strong> is designed to manage and display information about various villages, including their demographics, geographical data, and administrative details. The goal is to provide a comprehensive platform to streamline village management and facilitate decision-making processes. 

### Phases Overview:
- **Phase 1**: Frontend Development (Completed) – LocalStorage for managing village data.
- **Phase 2**: Backend Development (Completed) – Integration with Node.js for server-side functionality and database handling ( LocalStorage and MySQL).
- **Phase 3**: Advanced Features and Data Visualization – Enhanced user interface, interactive elements, and detailed reporting features.

<br>
<br>

<details>
  <summary><h2>💳 Table of Contents<h2\></summary>
  <ol>
    <li><a href="#intro">Introduction (What's Village Management System?)</a></li>
    <li><a href="#bw">Built With</a></li>
    <li><a href="#gs">Getting Started</a></li>
    <li><a href="#coref">Main Features</a></li>
    <li><a href="#corecomp">Core Components</a></li>
    <li><a href="#roles">Roles</a></li>
    <li><a href="#doc">Documentation</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>
 <br>
 <br>
 <br>

<a name="bw"></a>
## 🔨 Built With
- **Frontend**:  
  - HTML, CSS, JavaScript  
  - **React** for building the user interface and managing state.

- **Backend** (Planned for Phase 2):  
  - **Node.js** for server-side development.
  - **WebSocket** for real-time communication (e.g., chat functionality).
  - **Apollo Server** for handling GraphQL API queries and mutations.

- **Database**:  
  - **LocalStorage** (Phase 1) for storing data on the client side.
  - **MySQL** (Phase 2/3) for scalable, server-side data storage.

- **Other Technologies**:  
  - **Express** for backend routing and server management.
  - **CORS** to handle cross-origin requests between the frontend and backend.
  - **fs** for file system interaction (e.g., reading/writing files on the server).

<br>
<br>

<a name="gs"></a>
## 🚀 Getting Started
### ⚙️ Running the project
#### To get started with the project:
##### 1. Clone the repository:
> [![Github][Github]][wewe]
>
> 
> git clone https://github.com/Haneen-Radad/Advanced-Web.git
> 
##### 2. Navigate to the project directory

   ```bash
cd Advanced-Web
   ```
##### 3. Set up the database:
First, create and configure the MySQL database. Run the following commands in your MySQL server:
   ```bash
CREATE DATABASE VillageDB;
USE VillageDB;

CREATE TABLE Villages (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  Region VARCHAR(100),
  land INT,
  Latitude FLOAT,
  Longitude FLOAT,
  Tags VARCHAR(100),
  img VARCHAR(255),
  population INT,
  age VARCHAR(100),
  gender VARCHAR(100),
  growthRate FLOAT,
  Urban BOOLEAN
);

INSERT INTO Villages (id, name, Region, land, Latitude, Longitude, Tags, img, population, age, gender, growthRate, Urban)
VALUES
(1, 'Jabalia', '- Gaza Strip', 10, 31.6, 35.22, 'undifined', 'https://via.placeholder.com/100', 4, '5, 75, 5, 5', '30, 70', 31.6, TRUE),
(2, 'Beit Lahia', '- Gaza Strip', 15, 31.5, 34.4, 'undifined', 'https://via.placeholder.com/100', 3, '30,60,10', '20', 38, TRUE),
(3, 'Quds', '- West Bank', 17, 31.76, 35.21, 'undifined', 'https://via.placeholder.com/100', 6, '30,60,10', '50', 64.01, FALSE),
(4, 'Shejaiya', '- Gaza Strip', 33, 31.26, 35.0, 'undifined', 'https://via.placeholder.com/100', 11, '30,60,10', '90', 8.3, TRUE);

ALTER TABLE Villages MODIFY region VARCHAR(255) NOT NULL;
   ```
##### 4. Install dependencies:
   ```bash
   npm install
   ```
##### 5. Run the server files
- First, run the `server.js` file:
   ```bash
   node server.js
   ```
- Then, run the `websocketServer.js` file:
   ```bash
   node websocketServer.js
   ```

##### 6. Run the React project
Finally, run the React app with npm:
   ```bash
npm start
   ```

##### ⚠️ Important:
Please do not place the project folder in another folder. We do not use absolute path URLs in this project, so it will break if the folder is moved or nested inside another directory.
<br>
<br>
<br>

 <a name="coref"></a>

## 📌 Main Features
### 🛠️ Village Data Management
- Comprehensive CRUD operations for managing village data, including demographics, geographical information, and resources.
- Interactive gallery for showcasing village facilities and landmarks.
  <br>
  
### 📊 User Roles and Permissions
- Role-based access control:
  - **Admins**: Full access to add, edit, and delete data.
  - **Users**: View-only access to data.
    <br>

### ⭐ User Experience
- Clean, responsive design optimized for ease of use on multiple devices.
- Personalized recommendations based on village data.
  
### ⚙️ Backend Integration (Phase 2)
- **Server-side support**: Node.js integrated to manage village data through API endpoints.
- **Database Integration**:  include LocalStorage & MySQL integration to ensure reliable and scalable data storage.
  <br>
  
### 🌱 Phase 3: Advanced Features & Data Visualization
- Enhanced data visualization and reporting tools.
- Interactive maps and charts for better decision-making.
- Detailed village statistics and analytics for administrators.
  <br>

### 🛡️ Security Features (Planned for Phase 3)
- Authentication and authorization protocols for secure access to sensitive data.
- Improved data validation and error handling in the backend system.

 <br>
 <br>
 
  <a name="corecomp"></a>
## 🧩 Core Components
1.  **Landing Page**: A welcoming page with navigation to login/signup.
   
2.  **User Authentication**: Allows users to register and log in, with validation to prevent duplicate usernames.
   
3.  **Dashboard & Sidebar**: Central navigation hub with access to various sections (Overview, Village Management, Chat, Gallery).
   
4.  **Village Overview**: Displays demographic and geographical data using charts and Google Maps
   
5.  **Village Management**: Admins can manage village data (CRUD operations) with sorting and pagination features.
    
6.  **Chat System**: Real-time communication between users and admins via WebSockets, with persistent chat history.
    
7.  **Gallery Section**: Displays and manages village-related images with admin functionality to add new images.

 <br>
 <br>
 <br>
 <br>
 
 <a name="roles"></a>
## 👥 Roles
### 👤 User
- View village data, demographics, and facilities.
- Cannot add, edit, or delete any information.

### 👥 Admin
- Full control over the platform, including managing village data, user roles, and permissions.
- Ability to add images to the gallery and oversee data updates.
  <br>
 <br>

 <a name="doc"></a>
## 📄 Documentation

For in-depth information and a comprehensive guide to the project, please refer to the [Village Management System Documentation](./Village%20Management%20System%20Report.pdf).
  <br>
 <br>
 
<a name="contact"></a>
## 📱 Contact
* Haneed Alhajali - haneenradad2013@gmail.com
* Shahd Yaseen - shadthabit@gmail.com
<br>
  <p align="center"><a href="https://github.com/Haneen-Radad/Advanced-Web/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Haneen-Radad/Advanced-Web" />
</a> </p>
 <p align="right">(<a href="#readme-top">⬆️</a>)</p>
 <br>
<br>
<br>
<br>

[wewe]: https://github.com/Haneen-Radad/Advanced-Web.git
[Github]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
