
# DonateLife | Every Drops Count

## Assignment Category

- assignment12_category_0001

## Live Site URL

- <https://donatelife-f661c.web.app>
- <https://donatelife-f661c.firebaseapp.com>

## Admin Credentials

- **UserEmail:** <admin@gmail.com>
- **Password:** 123@as

## Features

1. **User Authentication:**

   - Login with email and password.
   - Registration and login pages provided.
   - Users can register with the following information:
     - Email
     - Name
     - Avatar
     - Blood group
     - District
     - Upazila
     - Password

2. **Dashboard:**
   - Separate dashboards for Admin, Donor, and Volunteer.
   - Responsive layout for mobile, tablet, and desktop views.
   - Private routes for authenticated users.

3. **Profile Management:**
   - Users can view and update their profiles.
   - Profile includes name, email, avatar, address, and blood group.

4. **Donor Dashboard:**
   - Displays a welcome message with the donor's name.
   - Shows maximum 3 recent donation requests created by the donor.
   - Allows donors to view all of their donation requests.
   - Provides a form to create a new donation request.

5. **Admin Dashboard:**
   - Displays welcome section and featured cards with statistics.
   - Allows admins to manage users, donation requests, and content.
   - Provides CRUD operations for users, donation requests, and blogs.

6. **Volunteer Dashboard:**
   - Similar to the Admin Dashboard but with restricted permissions.
   - Volunteers can only update the donation status and manage content.

7. **Public Pages:**
   - Home page with navigation, banner, featured section, contact form, and footer.
   - Search page for finding donors based on blood group, district, and upazila.
   - Blood Donation Requests page showing pending requests with view details option.
   - Blog page displaying published blogs with detailed view option.

8. **Private Funding Page:**
   - Displays all funds made by users in a tabular form.
   - Allows users to give funds for the organization using Stripe payment method.

9. **Tools & Tecnology :**
    - For Frontend:
      - HTML
      - CSS
      - Tailwind CSS
        - DaisyUI
        - Mamba UI
      - JavaScript
      - React.js
      - Farmar Motion
        - hover.dev
      - React Router
      - TanStack Query
    - For Backend:
      - Node.js
      - MangoDB
      - Express.js
      - JSON Web Token
    - For Payment system:
      - Stripe Payment method
