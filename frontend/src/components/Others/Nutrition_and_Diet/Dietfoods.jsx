import React, { useState } from 'react';
import '../../../assets/css/Others/Nutrition_and_Diet/Dietfood.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CalorieCalculator from './CalorieCalculator';

const cardData = [
  { id: 1, category: 'meats', title: 'Chicken Fry with oil', image: 'https://t4.ftcdn.net/jpg/06/28/27/79/360_F_628277923_qT6P3ITveUaKTvSDk6s9DYiuXkNviGII.jpg', carbs: 0, protein: 25, fats: 10, fiber: 0, calories: 220 },
  { id: 2, category: 'meats', title: 'Mutton with oil', image: 'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/jyothir/Kerala_Mutton_Pepper_Fry.jpg', carbs: 0, protein: 20, fats: 15, fiber: 0, calories: 250 },
  { id: 3, category: 'meats', title: 'Fish', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw-OVJWuFn4iK_0OqbjJS3xyA96jbanNEEZA&s', carbs: 0, protein: 22, fats: 5, fiber: 0, calories: 150 },
  { id: 4, category: 'meats', title: 'Beef', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDfO_QSWBm4j6s8EZgYRWEqFnan0mJZYZEeLRNdBi_JnBSf5KBdzUNmv12E-YhF6svnw7qfZBRgc7lB-IhAtWHROR30dNwt6ku_R6Jn0iYGgdDs2Ibf41wPSFmi-sXM8CjAvfnynwyVhk/s1600/beef+fry+1i.JPG', carbs: 0, protein: 26, fats: 20, fiber: 0, calories: 290 },
  { id: 5, category: 'nuts', title: 'Groundnut', image: 'https://t3.ftcdn.net/jpg/03/31/41/94/360_F_331419421_Km1fAYtIUbdId8eWetjAKTdpydJIBMcL.jpg', carbs: 16, protein: 25, fats: 49, fiber: 9, calories: 567 },
  { id: 6, category: 'meat', title: 'Whole egg', image: 'https://www.jerkyholic.com/wp-content/uploads/2023/04/Eggs-Smoked.jpg', carbs: 1.1, protein: 13, fats: 11, fiber: 0, calories: 155 },
  { id: 7, category: 'meat', title: 'Egg whites', image: 'https://laughingspatula.com/wp-content/uploads/2022/03/egg-white-shell-for-deviled-egg.jpg', carbs: 0.7, protein: 11, fats: 0.2, fiber: 0, calories: 52 },
  { id: 8, category: 'millets', title: 'Oats', image: 'https://img.freepik.com/free-photo/raw-barley-grain-old-dark-background_1150-37928.jpg', carbs: 66, protein: 17, fats: 7, fiber: 11, calories: 389 },
  { id: 9, category: 'millets', title: 'Boiled Black chana', image: 'https://www.cookwithmanali.com/wp-content/uploads/2019/03/Kala-Chana-Chaat-500x375.jpg', carbs: 27, protein: 9, fats: 3, fiber: 8, calories: 164 },
  { id: 10, category: 'millets', title: 'Boiled White Chana', image: 'https://media.istockphoto.com/id/1577137916/photo/cooked-chickpeas-in-white-bowl-isolated-on-white.jpg?s=612x612&w=0&k=20&c=byVp7OJMvVO6YDQFTBHof7VMdcFXaUNJ8Ab-yx586Wo=', carbs: 27, protein: 9, fats: 3, fiber: 8, calories: 164 },
  { id: 11, category: 'millets', title: 'Green Moong Dal', image: 'https://5.imimg.com/data5/SELLER/Default/2023/3/DC/CM/HQ/31738799/green-gram-500x500.jpg', carbs: 59, protein: 24, fats: 1, fiber: 16, calories: 347 },
  { id: 12, category: 'millets', title: 'Boiled Brown Beans', image: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2020-10-How-to-Cook-a-Perfect-Pot-of-Pinto-Beans%2FHow-to-Cook-a-Perfect-Pot-of-Pinto-Beans_010', carbs: 27, protein: 9, fats: 3, fiber: 8, calories: 164 },
  { id: 13, category: 'millets', title: 'Boiled Rice', image: 'https://www.kitchensanctuary.com/wp-content/uploads/2019/08/How-to-boil-rice-square-FS-6126.jpg', carbs: 28, protein: 2.7, fats: 0.3, fiber: 0.4, calories: 130 },
  { id: 14, category: 'millets', title: 'Chapati', image: 'https://static.toiimg.com/thumb/61203720.cms?imgsize=670417&width=800&height=800', carbs: 18, protein: 4, fats: 3, fiber: 2, calories: 104 },
  { id: 15, category: 'millets', title: 'Parotta', image: 'https://www.whiskaffair.com/wp-content/uploads/2020/04/Kerala-Parotta-1.jpg', carbs: 32, protein: 6, fats: 10, fiber: 2, calories: 300 },
  { id: 16, category: 'millets', title: 'Dosa', image: 'https://t3.ftcdn.net/jpg/01/86/33/72/360_F_186337209_9rbcMLu3wGCDNaEoK1jO0aNzb0pv7Xs7.jpg', carbs: 27, protein: 4, fats: 6, fiber: 1, calories: 168 },
  { id: 17, category: 'millets', title: 'Idly', image: 'https://us.123rf.com/450wm/cokemomo/cokemomo1310/cokemomo131000040/23294622-Idli    -south-indian-rice-cake-on-banana-leaf.jpg?ver=6', carbs: 12, protein: 2, fats: 0.4, fiber: 0.5, calories: 58 },
  { id: 18, category: 'millets', title: 'Ragi Dosa', image: 'https://www.chefkunalkapur.com/wp-content/uploads/2021/05/Ragi-Dosa-Instant-scaled.jpg?v=1619848402', carbs: 32, protein: 5, fats: 7, fiber: 2, calories: 170 },
  { id: 19, category: 'millets', title: 'Puri', image: 'https://cdn.cdnparenting.com/articles/2020/02/26144721/PURI-BHAJI-RECIPE.webp', carbs: 23, protein: 3, fats: 9, fiber: 0.8, calories: 149 },
];

const Dietfoods = () => {
  const [filter, setFilter] = useState('all');
  const [inputValues, setInputValues] = useState({});
  const [meals, setMeals] = useState({
    breakfast: [],
    morningSnacks: [],
    lunch: [],
    eveningSnacks: [],
    dinner: []
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleInputChange = (event, itemId) => {
    const { value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [itemId]: value,
    }));
  };

  const calculateTotal = (item) => {
    const grams = parseFloat(inputValues[item.id] || 0);
    const factor = grams / 100;

    return {
      carbs: (item.carbs * factor).toFixed(2),
      protein: (item.protein * factor).toFixed(2),
      fats: (item.fats * factor).toFixed(2),
      fiber: (item.fiber * factor).toFixed(2),
      calories: (item.calories * factor).toFixed(2),
    };
  };

  const addToMeal = (mealName, item) => {
    const totals = calculateTotal(item);
    const foodItem = {
      ...item,
      quantity: inputValues[item.id],
      totals
    };

    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealName]: [...prevMeals[mealName], foodItem],
    }));
  };

  const removeFromMeal = (mealName, itemId) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealName]: prevMeals[mealName].filter((food) => food.id !== itemId),
    }));
  };

  const resetMeals = () => {
    setMeals({
      breakfast: [],
      morningSnacks: [],
      lunch: [],
      eveningSnacks: [],
      dinner: []
    });
    setInputValues({});
  };

  const filteredItems = filter === 'all' ? cardData : cardData.filter(item => item.category === filter);

  const renderMeal = (mealName) => {
    const meal = meals[mealName];

    const totalNutrients = meal.reduce((acc, food) => {
      acc.carbs += parseFloat(food.totals.carbs);
      acc.protein += parseFloat(food.totals.protein);
      acc.fats += parseFloat(food.totals.fats);
      acc.fiber += parseFloat(food.totals.fiber);
      acc.calories += parseFloat(food.totals.calories);
      return acc;
    }, { carbs: 0, protein: 0, fats: 0, fiber: 0, calories: 0 });

    return (
      <div className="meal">
        <h3 style={{color:'white',marginBottom:'20px',fontSize:'25px'}}>{mealName.charAt(0).toUpperCase() + mealName.slice(1)}</h3>
        <ul>
          <li>Total Carbs: {totalNutrients.carbs.toFixed(2)} g</li>
          <li>Total Protein: {totalNutrients.protein.toFixed(2)} g</li>
          <li>Total Fats: {totalNutrients.fats.toFixed(2)} g</li>
          <li>Total Fiber: {totalNutrients.fiber.toFixed(2)} g</li>
          <li>Total Calories: {totalNutrients.calories.toFixed(2)} kcal</li>
        </ul>
        <div class="typesofmeals">
        <ul>
          {meal.map(food => (
            <li key={food.id}>
              {food.title} - {food.quantity}g
              <button class='remove' onClick={() => removeFromMeal(mealName, food.id)}>Remove</button>
            </li>
          ))}
        </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      
      <CalorieCalculator/>
      <h2 className="headdd">Track your calories</h2>
<div className="meals-container">
    <div className="mealbox">{renderMeal('breakfast')}</div>
    <div className="mealbox">{renderMeal('morningSnacks')}</div>
    <div className="mealbox">{renderMeal('lunch')}</div>
    <div className="mealbox">{renderMeal('eveningSnacks')}</div>
    <div className="mealbox">{renderMeal('dinner')}</div>
</div>
<div className="resetbtn">
    <button onClick={resetMeals}>Reset All</button>
</div>
<div className="search-filter-container">
    <FormControl variant="outlined" className="filter-dropdown">
        <InputLabel></InputLabel>
        <Select
            className="selectfood"
            value={filter}
            onChange={handleFilterChange}
        >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="meats">Meats</MenuItem>
            <MenuItem value="nuts">Nuts</MenuItem>
            <MenuItem value="millets">Millets</MenuItem>
        </Select>
    </FormControl>
</div>
<div className="dietfoods">
    <div className="dietrows">
        {filteredItems.map(item => {
            const totals = calculateTotal(item);
            return (
                <div key={item.id} className={`subcard ${item.isSelected ? 'selected' : ''}`}>
                    <Card sx={{ width: 230 }}>
                        <CardMedia
                            component="img"
                            alt={item.title}
                            height="140"
                            image={item.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h7" component="div">
                                {item.title}
                                <input className="graminput"
                                    type="number"
                                    placeholder="In grams"
                                    value={inputValues[item.id] || ''}
                                    onChange={(event) => handleInputChange(event, item.id)}
                                />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <ul className='subcardul'>
                                    <li className='subcardulli'>Carbs: {totals.carbs} g</li>
                                    <li className='subcardulli'>Protein: {totals.protein} g</li>
                                    <li className='subcardulli'>Fats: {totals.fats} g</li>
                                    <li className='subcardulli'>Fiber: {totals.fiber} g</li>
                                    <li className='subcardulli'>Calories: {totals.calories} kcal</li>
                                    <br />
                                    <li className='subcardulli'>
                                        <button className='adddd' onClick={() => addToMeal('breakfast', item)}>Add to Breakfast</button>
                                        <button className='adddd' onClick={() => addToMeal('morningSnacks', item)}>Add to Morning Snacks</button>
                                        <button className='adddd' onClick={() => addToMeal('lunch', item)}>Add to Lunch</button>
                                        <button className='adddd' onClick={() => addToMeal('eveningSnacks', item)}>Add to Evening Snacks</button>
                                        <button className='adddd' onClick={() => addToMeal('dinner', item)}>Add to Dinner</button>
                                    </li>
                                </ul>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            );
        })}
    </div>
</div>
<div className="contentbox footer">
        <ul>
          <li><h1>VEST ARMOUR</h1></li>
          <li>© 2024 Vest Armour®, Inc. All rights reserved</li>
          <li>Privacy Policy  /</li>
          <li>Terms of use  /</li>
          <li>Cookie Policy  /</li>
          <li>Manage Your Content /</li>
          <li>AdChoices</li>
        </ul>
      </div>

    </div>
  );
};

export default Dietfoods;

