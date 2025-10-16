# CS-465 Full Stack Development Project

## Architecture
This full stack web application was built using both front-end and back-end technologies that work together to provide a smooth and dynamic user experience. On the front end, Express HTML and JavaScript were initially used to render multi-page templates for the customer and administrative views. Later, the project transitioned into a Single Page Application (SPA) using Angular, which allowed for faster navigation, reusable components, and more responsive user interactions. Angular’s component-based structure streamlined development and maintained consistent styling across the interface.

The backend was built using Node.js and Express, connecting to a NoSQL MongoDB database. The decision to use MongoDB was made because of its flexible document-based schema, which stores data in JSON-like structures. This flexibility made it easy to handle data exchange between the front-end and back-end, especially when working with JavaScript objects. MongoDB’s scalability and ability to handle large amounts of unstructured data made it ideal for modern web applications like this one.

## Functionality
JSON, or JavaScript Object Notation, is different from JavaScript in that it is purely a data format used for transmitting structured data between systems. In this project, JSON played a critical role in linking the front-end and back-end layers. The backend returned JSON responses from API endpoints, which were then consumed by the Angular front-end to dynamically update the user interface without refreshing the entire page.

During the refactoring process, several pieces of code were improved for better efficiency and maintainability. By creating reusable UI components in Angular, I reduced redundancy and improved performance. For example, I created shared components for trip listings and admin forms so that they could be reused across different views. This approach not only made the code cleaner but also made updates easier, since changes could be made in one place and reflected throughout the application.

## Testing
Testing was an important part of verifying that both the front-end and back-end worked as intended. Postman was used to test API endpoints through GET, POST, PUT, and DELETE requests. These tests ensured that the endpoints properly interacted with the MongoDB database, handling data retrieval, updates, and deletions accurately. I also tested edge cases such as invalid inputs to confirm that proper error messages and responses were being returned.

Adding authentication and security for the admin login introduced additional testing requirements. I verified that only authenticated users could access restricted routes and that password validation worked correctly. Testing methods included checking both frontend form validation and backend middleware to ensure secure data handling. These layers of testing strengthened the application and confirmed that user data and administrative functions were protected.

## Reflection
This course has significantly contributed to my growth as a software engineer. Building a full stack application allowed me to see how front-end and back-end systems communicate through APIs, and how each part contributes to the overall functionality of a modern web app. I developed a stronger understanding of frameworks like Angular and Express, gained confidence in using MongoDB, and learned how to implement authentication and authorization securely.

I also improved my ability to think critically about design and performance. Refactoring and building reusable components taught me how to write cleaner, more scalable code. This project helped me practice the kind of development workflows used in real industry environments, making me a more confident and marketable candidate. Overall, this course has strengthened both my technical and professional skills as I prepare to transition into a full-time software engineering role.
