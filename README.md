# 🏥 Patient Management System

A modern, full-stack patient management system built with Next.js 15, featuring patient registration, appointment scheduling, and administrative dashboard capabilities.

## ✨ Features

### 🧑‍⚕️ Patient Management

- **Patient Registration**: Complete patient onboarding with comprehensive medical information
- **Document Upload**: Secure file upload for identification documents
- **Medical History**: Track allergies, current medications, and family medical history
- **Insurance Information**: Store insurance provider and policy details
- **Emergency Contacts**: Maintain emergency contact information

### 📅 Appointment System

- **Appointment Scheduling**: Book appointments with available doctors
- **Status Tracking**: Monitor appointment status (pending, scheduled, cancelled)
- **Doctor Selection**: Choose from available medical professionals
- **Appointment History**: View past and upcoming appointments

### 👨‍💼 Admin Dashboard

- **Real-time Statistics**: View appointment counts and status overview
- **Data Management**: Comprehensive table view of all appointments
- **Patient Records**: Access complete patient information
- **Secure Access**: Passkey-protected admin panel

### 🔧 Technical Features

- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Form Validation**: Robust form validation using Zod and React Hook Form
- **File Upload**: Secure document handling with drag-and-drop interface
- **Error Monitoring**: Integrated Sentry for error tracking and monitoring
- **Responsive Design**: Mobile-first, responsive design
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **TanStack Table** - Data table functionality
- **Twilio** - SMS and phone verification

### Backend & Database

- **Appwrite** - Backend-as-a-Service
- **Node.js** - Server-side runtime

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundling (development)

### Monitoring

- **Sentry** - Error tracking and performance monitoring

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Appwrite account and project setup

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Patient -management-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   # Appwrite Configuration
   NEXT_PUBLIC_ENDPOINT=your_appwrite_endpoint
   PROJECT_ID=your_project_id
   API_KEY=your_api_key
   DATABASE_ID=your_database_id
   PATIENT_COLLECTION_ID=your_patient_collection_id
   DOCTOR_COLLECTION_ID=your_doctor_collection_id
   APPOINTMENT_COLLECTION_ID=your_appointment_collection_id
   NEXT_PUBLIC_BUCKET_ID=your_bucket_id

   # Admin Access
   NEXT_PUBLIC_ADMIN_PASSKEY=your_admin_passkey

   # Sentry Configuration (Optional)
   SENTRY_DSN=your_sentry_dsn
   SENTRY_ORG=your_sentry_org
   SENTRY_PROJECT=your_sentry_project

   # Environment
   NODE_ENV=development
   ```

4. **Appwrite Setup**

   Set up your Appwrite project with the following collections:

   **Patients Collection:**

   - `userId` (string)
   - `name` (string)
   - `email` (string)
   - `phone` (string)
   - `birthDate` (datetime)
   - `gender` (enum: male, female)
   - `address` (string)
   - `occupation` (string)
   - `emergencyContactName` (string)
   - `emergencyContactNumber` (string)
   - `primaryPhysician` (string)
   - `insuranceProvider` (string)
   - `insurancePolicyNumber` (string)
   - `allergies` (string, optional)
   - `currentMedication` (string, optional)
   - `familyMedicalHistory` (string, optional)
   - `pastMedicalHistory` (string, optional)
   - `identificationType` (string, optional)
   - `identificationNumber` (string, optional)
   - `identificationDocumentId` (string, optional)
   - `identificationDocumentUrl` (string, optional)
   - `privacyConsent` (boolean)

   **Appointments Collection:**

   - `patient` (relation to patients)
   - `doctor` (string)
   - `appointmentDate` (datetime)
   - `appointmentTime` (string)
   - `status` (enum: pending, scheduled, cancelled)
   - `notes` (string, optional)

5. **Run the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage

### Patient Registration

1. Visit the homepage
2. Fill in basic information (name, email, phone)
3. Complete detailed medical information
4. Upload identification documents (optional)
5. Review and submit registration

### Appointment Booking

1. After registration, navigate to appointment booking
2. Select preferred doctor
3. Choose available date and time
4. Add any additional notes
5. Confirm appointment

### Admin Access

1. Click "Admin" link on the homepage
2. Enter the admin passkey
3. View dashboard with appointment statistics
4. Manage appointments and patient records

## 🏗️ Project Structure

```
Patient -management-system/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard
│   ├── api/                      # API routes
│   ├── patients/                 # Patient-related pages
│   └── sentry-example-page/      # Sentry testing page
├── components/                   # Reusable components
│   ├── forms/                    # Form components
│   ├── table/                    # Data table components
│   └── ui/                       # UI components
├── lib/                          # Utility functions
│   ├── actions/                  # Server actions
│   └── validation.ts             # Form validation schemas
├── types/                        # TypeScript type definitions
├── constants/                    # Application constants
└── public/                       # Static assets
    └── assets/                   # Images, icons, etc.
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Vercel
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- **Admin Authentication**: Passkey-protected admin access
- **Data Validation**: Comprehensive form validation
- **Secure File Upload**: Safe document handling
- **Error Monitoring**: Sentry integration for security monitoring

## 🐛 Error Monitoring

This project includes Sentry integration for:

- Error tracking and reporting
- Performance monitoring
- User session tracking
- Real-time error notifications

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation

**Built with ❤️ using Next.js and modern web technologies**
