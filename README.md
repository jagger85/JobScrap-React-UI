# JobSweeper 🧹

A modern web application for aggregating and managing job listings from multiple platforms. Built with React and Vite.

## 🌟 Features

- **Multi-Platform Support**: Scrape job listings from multiple platforms including LinkedIn, JobStreet, Kalibrr, and Indeed
- **Flexible Date Ranges**: Filter jobs by different time periods (24 hours, week, 15 days, month)
- **Real-time Updates**: Live status updates for scraping operations
- **Export Functionality**: Download job listings in CSV format
- **Dark Mode**: Eye-friendly dark theme interface
- **Secure Authentication**: Token-based authentication system

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

2. Install dependencies

```bash
npm install
``` 

3. Create environment files

```bash
.env.development
VITE_BACKEND_HOST=localhost
VITE_BACKEND_PORT=3000
.env.production
VITE_API_URL=your_production_api_url
```

4. Start the development server

```bash
npm run dev
``` 

## 🛠️ Built With

- React 18
- Vite
- Zustand (State Management)
- React Router DOM
- CSS Modules

## 🔧 Configuration

The application can be configured through environment variables:

- `VITE_API_URL`: Production API URL
- `VITE_BACKEND_HOST`: Development backend host
- `VITE_BACKEND_PORT`: Development backend port

## 🚢 Deployment

Build the production bundle:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons provided by Lucide React
- UI components inspired by modern design principles
- Special thanks to all contributors

---

Made with 💖 by [Jagger85](https://gitlab.com/Jagger85)