# Friendbook - Social Media Platform

A modern social media platform built with Next.js, featuring a complete social networking experience with posts, messaging, profiles, events, and more.

## ✨ Features

- **News Feed** - Dynamic feed with posts, stories, and interactions
- **User Profiles** - Customizable profiles with cover photos and personal information
- **Messaging System** - Real-time chat and messaging capabilities
- **Events & Calendar** - Event creation and management with calendar integration
- **Music Integration** - Music sharing and discovery features
- **Games** - Built-in social games and entertainment
- **Weather Integration** - Location-based weather information
- **Photo Albums** - Image galleries and photo sharing
- **Company Pages** - Business profiles and company features
- **Help & Support** - Comprehensive help system and support features
- **Authentication** - Secure login and registration system
- **Responsive Design** - Mobile-first responsive UI

## 🚀 Tech Stack

- **Framework**: Next.js 15.1.2 with TypeScript
- **UI Library**: React 19.0 with Reactstrap & Bootstrap 5
- **State Management**: Redux Toolkit
- **Authentication**: NextAuth.js
- **Backend**: Appwrite
- **Styling**: SCSS/Sass with Bootstrap
- **Icons**: React Feather, React Icons, Font Awesome
- **Charts**: ApexCharts
- **Maps**: Google Maps API
- **Calendar**: FullCalendar
- **Image Processing**: Sharp
- **Notifications**: React Toastify & SweetAlert2

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- An Appwrite server instance (for backend services)

## 🛠️ Installation

### Quick Setup (Recommended)

Run the automated setup script:
```bash
git clone <repository-url>
cd friendbook-next
chmod +x setup.sh
./setup.sh
```

### Manual Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd friendbook-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Copy the example environment file and configure your variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Then update `.env.local` with your actual Appwrite configuration:
   ```env
   # Appwrite Configuration
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_APPWRITE_KEY=your_api_key_here
   
   # Database Configuration
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
   NEXT_PUBLIC_APPWRITE_STORAGE_ID=your_storage_id_here
   
   # Collection IDs (create these in your Appwrite console)
   NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=users
   NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID=posts
   NEXT_PUBLIC_APPWRITE_LIKES_COLLECTION_ID=likes
   NEXT_PUBLIC_APPWRITE_DAILY_QUESTS_COLLECTION_ID=dailyQuests
   NEXT_PUBLIC_APPWRITE_MOODS_COLLECTION_ID=moods
   NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID=comments
   NEXT_PUBLIC_APPWRITE_FOLLOWERS_COLLECTION_ID=followers
   NEXT_PUBLIC_APPWRITE_TRENDING_TOPICS_COLLECTION_ID=trendingTopics
   NEXT_PUBLIC_APPWRITE_BOOKMARKS_COLLECTION_ID=bookmarks
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   ```

4. **Configure Appwrite**
   
   Set up your Appwrite project:
   
   a. **Create an Appwrite Project:**
      - Go to [Appwrite Console](https://cloud.appwrite.io/)
      - Create a new project
      - Copy the Project ID to your `.env.local`
   
   b. **Create Database and Collections:**
      - Create a new database
      - Create the following collections with their respective attributes:
        - `users` - User profiles and data
        - `posts` - Social media posts
        - `likes` - Post likes/reactions
        - `comments` - Post comments
        - `followers` - User follow relationships
        - `dailyQuests` - Daily challenges/quests
        - `moods` - User mood tracking
        - `trendingTopics` - Trending hashtags/topics
        - `bookmarks` - Saved posts
   
   c. **Set Up Storage:**
      - Create a storage bucket for file uploads
      - Configure appropriate permissions
   
   d. **Configure Authentication:**
      - Enable Email/Password authentication
      - Set up any additional auth providers as needed
   
   e. **Deploy Appwrite Configuration:**
      ```bash
      npx appwrite deploy
      ```

## 🚀 Getting Started

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13+ App Router pages
├── components/            # Reusable UI components
├── Common/               # Shared common components
├── Data/                 # Static data and configuration
├── layout/               # Layout components and wrappers
├── lib/                  # Utility libraries and configurations
├── redux-toolkit/        # Redux store and slices
├── types/                # TypeScript type definitions
└── utils/                # Utility functions and helpers
```

## 📚 Documentation

For detailed documentation including setup instructions, API references, and customization guides, visit:

**[Friendbook Documentation](https://docs.pixelstrap.net/next/friendbook/)**

## 🔧 Configuration

The application can be customized through various configuration files:

- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `appwrite.json` - Appwrite backend configuration
- `src/utils/constant/` - Application constants and settings

## 🚨 Troubleshooting

### Common Issues

1. **Appwrite Connection Issues**
   - Ensure your `.env.local` file has the correct Appwrite endpoint and project ID
   - Check that your Appwrite project is active and accessible
   - Verify API keys have the correct permissions

2. **Environment Variables Not Loading**
   - Make sure `.env.local` is in the root directory
   - Restart the development server after changing environment variables
   - Check that variable names match exactly (case-sensitive)

3. **Database Collection Errors**
   - Ensure all required collections are created in Appwrite
   - Check collection IDs match your environment variables
   - Verify collection permissions are set correctly

4. **Authentication Issues**
   - Check NextAuth configuration
   - Ensure session cookies are being set correctly
   - Verify Appwrite auth settings match your requirements

### Database Schema Requirements

The application expects the following collections with these key attributes:

- **Users Collection**: `userId`, `name`, `email`, `username`, `phone`, `age`, `gender`, `profileImage`
- **Posts Collection**: `userId`, `content`, `imageUrl`, `createdAt`, `likes`, `comments`
- **Comments Collection**: `postId`, `userId`, `content`, `createdAt`
- **Likes Collection**: `postId`, `userId`, `createdAt`
- **Followers Collection**: `followerId`, `followingId`, `createdAt`

## 🌐 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy!

### Other Platforms

This application can be deployed on any platform that supports Node.js applications:

- Netlify
- AWS Amplify
- Heroku
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Check the [Documentation](https://docs.pixelstrap.net/next/friendbook/)
- Create an issue in this repository
- Contact the support team

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
