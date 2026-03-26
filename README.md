# 🍹 Quantum Cocktail

A full-stack web application that fetches random cocktails from The Cocktail DB API and displays them in an elegant, interactive interface.

## ✨ Features

- 🎲 **Random Cocktail Generator** - Fetch random cocktails with a single click
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Clean and intuitive user interface
- 🔗 **Real-time API Integration** - Fetches cocktail data from The Cocktail DB API
- 📋 **Detailed Information** - Displays cocktail name, image, category, glass type, instructions, and ingredients
- ⚡ **Fast & Lightweight** - Quick load times and smooth interactions

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: EJS (Embedded JavaScript templating)
- **Styling**: CSS3
- **Client-side**: Vanilla JavaScript
- **API Integration**: Axios

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/TanmayMahajan26/cocktail-api-FSD.git
   cd quantum-cocktail
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - The quantum interface will be accessible

## 🚀 Usage

1. Open the application in your web browser
2. Click the "Get Random Cocktail" button
3. View the cocktail details including:
   - Cocktail image
   - Name and category
   - Glass type
   - Preparation instructions
   - Complete ingredient list with measurements

## 🔌 API Endpoints

### Get Random Cocktail
- **Endpoint**: `/api/cocktail`
- **Method**: `GET`
- **Response**: JSON object containing cocktail data

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "name": "Margarita",
    "image": "https://...",
    "category": "Ordinary Drink",
    "glass": "Margarita glass",
    "instructions": "Rub the rim of the glass with the lime slice...",
    "ingredients": ["2 oz Tequila", "1 oz Cointreau", "1 oz Lime juice"]
  }
}
```

**Error Response (500)**:
```json
{
  "success": false,
  "message": "Failed to initiate handshake with the database."
}
```

## 📁 Project Structure

```
quantum-cocktail/
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── views/
│   └── index.ejs
├── server.js
├── package.json
└── README.md
```

## 🌐 Environment Variables

The application runs on:
- **PORT**: 3000 (default, can be overridden with `PORT` environment variable)

Example:
```bash
PORT=8080 node server.js
```

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
PORT=3001 node server.js
```

### API connection issues
- Ensure you have internet connectivity
- Check if The Cocktail DB API is accessible
- The error message "Failed to initiate handshake with the database" indicates an API connection problem

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🔗 External APIs

This application uses:
- **The Cocktail DB API** - https://www.thecocktaildb.com/api.php
  - Provides free access to a database of cocktails
  - No authentication required

## 📝 License

This project is licensed under the ISC License - see the `package.json` file for details.

## 👨‍💻 Author

**TanmayMahajan26**  
GitHub: [@TanmayMahajan26](https://github.com/TanmayMahajan26)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using Express.js and The Cocktail DB API**
