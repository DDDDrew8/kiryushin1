# Navi Naveen Portfolio

A modern, responsive portfolio website for Navi Naveen, featuring a beautiful liquid glass navbar effect, dark/light mode, and smooth animations.

## 🌟 Features

- **Liquid Glass Navbar**: Unique wavy design with glassmorphism and neon glowing borders
- **Dark/Light Mode**: Toggle between color schemes with smooth transitions
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Animated UI**: Smooth transitions and scroll animations using Framer Motion
- **Project Showcase**: Interactive project cards with detailed modal views
- **Timeline Layout**: Visual representation of academic journey
- **Contact Form**: Glassmorphic contact form with social links

## 🚀 Technologies Used

- React.js
- Tailwind CSS
- Framer Motion (for animations)
- React Icons

## 📋 Project Structure

```
/
├── public/              # Static files
│   ├── index.html       # HTML template
│   ├── profile.svg      # Profile image
│   └── manifest.json    # PWA manifest
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.js    # Liquid glass navbar
│   │   ├── Hero.js      # Hero section
│   │   ├── About.js     # About section
│   │   ├── Projects.js  # Projects section
│   │   ├── Studies.js   # Studies timeline
│   │   ├── Contact.js   # Contact form
│   │   └── ScrollToTop.js # Scroll to top button
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point
│   └── index.css        # Global styles and Tailwind directives
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies and scripts
```

## 🛠️ Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 🎨 Customization

- **Colors**: Edit the color palette in `tailwind.config.js`
- **Content**: Update personal information in respective component files
- **Animations**: Modify animation parameters in Framer Motion components
- **Projects**: Add or remove projects in the `Projects.js` file

## 📱 Responsive Design

The portfolio is fully responsive with three main breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌓 Dark/Light Mode

The theme toggle persists user preference using localStorage and also respects the user's system preference on first visit.

## 📄 License

MIT