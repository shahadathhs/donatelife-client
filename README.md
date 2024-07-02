# DonateLife | Every Drop Counts

- Live Site URL: [DonateLife](https://donatelife-f661c.web.app)

## Tools & Technology
- HTML
- CSS
- Tailwind CSS
- JavaScript
- React.js
- React Router
- Farmer Motion
- TanStack Query

## Admin Credentials
- **UserEmail:** admin@gmail.com
- **Password:** 123@as

## How to run locally

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Stripe account for payment integration

### Running the Frontend Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/shahadathhs/donatelife-client.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd donatelife-client
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Create a `.env.local` file in the root directory and add the following environment variables with your own credentials:**

   ```env
   VITE_APIKEY=your_firebase_api_key
   VITE_AUTHDOMAIN=your_firebase_auth_domain
   VITE_PID=your_firebase_project_id
   VITE_STORAGE=your_firebase_storage_bucket
   VITE_MESSAGE=your_firebase_messaging_sender_id
   VITE_APPTD=your_firebase_app_id

   VITE_API_URL=your_server_api_url

   VITE_IMAGE_HOSTING_KEY=your_imgbb_api_key

   VITE_PAYMENT_GATEWAY_PK=your_stripe_public_key
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

### Running the Backend Locally

- **Visit server repository:** [Server Repository on GitHub](https://github.com/shahadathhs/donatelife-server)


## Features

- **User Authentication:**
  - Email and password login.
  - Detailed registration with email, name, avatar, blood group, district, upazila, and password.

- **Dashboards:**
  - Separate dashboards for Admins, Donors, and Volunteers.
  - Responsive layouts and private routes.

- **Profile Management:**
  - View and update profiles (excluding email).

- **Donor Dashboard:**
  - Displays welcome message, recent donation requests, and creation form.

- **Admin Dashboard:**
  - Manages users, donation requests, and content with full CRUD operations.

- **Volunteer Dashboard:**
  - Restricted permissions for updating donation status and adding blogs.

- **Public Pages:**
  - Home, search, donation requests, and blog pages.

- **Private Funding Page:**
  - Displays funds and allows Stripe payments.

- **Pagination and Filtering:**
  - Enhances navigation and search efficiency.

- **Enhanced Security with JWT:**
  - Secure authentication and authorization for private APIs.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## Contact

For any inquiries, please reach out to Shahadath Hossen Sajib at <shahadathhossensajib732@gmail.com>.