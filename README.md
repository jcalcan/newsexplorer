# NewsExplorer app

### Overview

- Intro
- Figma
- Tech used
- Description and functionality
- Github link
- Backend Express server

**Intro**

Newsexplorer is a project displaying the power of React combined with express.js server API's and an external news API tied to a back-end MongoDB. All React components are displayed correctly on popular screen sizes using css grid and very minimal media queries. The app searches current trending news in any subject without logging in. Registered users can save their favorite articles based on their likes.

**Figma**

- [Link to the project on Figma](https://www.figma.com/design/3ottwMEhlBt95Dbn8dw1NH/Your-Final-Project?node-id=22618-547&t=4HykAwFwEcMGI1ub-0)

**Tech used**

In this project React was used for the responsive design along with css display grid. React hooks were maximized to increase loading and performance. Bandwith, server strain, mobile performance are all taken into account when designing the app. This app was built with and MVC (Model-View-Controller) Architecture in mind. The user interacts with the application through the View when registering, logging in/out, adding, liking, disliking, and deleting items with the front-end UI. The View captures the user info and sends it to the controller. The Controller receives the info (username, email, password), news items and processes it (validates inputs and determines actions to take) to interact with the model. The model is actually mongoose and mongoDB. Mongoose creates the model for the documents which define the data structures and business logic, and interacts with MongoDB - the database. MongoDB stores the data. These are the steps of the data flow.

[1.] React (View) sends requests to -------> Express.js (Controller);
[2.]Express.js processes requests, uses the Model (Mongoose + MongoDB) to access or modify data;
[3.]The Model interacts with MongoDB and returns data to the Controller;
[4.]The Controller sends data back to the View

This separation keeps the application organized, scalable, and maintainable.

**Description and Functionality**
Newsexplorer is a site that provides results based on news articles searched. The site is designed to function on any browser- mobile or desktop. No need to install special extensions. Plans to improve the project includes user database management, archiving news feature, adding location services to determine user location for local news.

**Github link**
[old project] https://github.com/jcalcan/newsexplorer
[updated project with back-end]

Good luck and have fun!
