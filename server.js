const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/cocktail', async (req, res) => {
    try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const drink = response.data.drinks[0];
        
        const cocktailData = {
            name: drink.strDrink,
            image: drink.strDrinkThumb,
            category: drink.strCategory,
            glass: drink.strGlass,
            instructions: drink.strInstructions,
            ingredients: []
        };

        for (let i = 1; i <= 15; i++) {
            if (drink[`strIngredient${i}`]) {
                const measure = drink[`strMeasure${i}`] ? drink[`strMeasure${i}`].trim() : '';
                const ingredient = drink[`strIngredient${i}`].trim();
                cocktailData.ingredients.push(`${measure} ${ingredient}`.trim());
            }
        }

        res.json({ success: true, data: cocktailData });
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to initiate handshake with the database.' });
    }
});

app.listen(PORT, () => {
    console.log(`[SYSTEM] Server initialized on port ${PORT}. Quantum interface accessible via http://localhost:${PORT}`);
});
