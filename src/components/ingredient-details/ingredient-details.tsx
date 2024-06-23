import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectorIngredients } from '../../services/slices/ingredientsSlice';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { selectorIngredientsData } = selectorIngredients;
  const ingredientsData = useSelector(selectorIngredientsData);
  const location = useLocation();
  const searchId = location.pathname.toString().replace('/ingredients/', '');

  const ingredientData = ingredientsData.find((item) => item._id === searchId);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
