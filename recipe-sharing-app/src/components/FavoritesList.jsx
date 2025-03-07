import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom'; // Import Link for recipe details

const FavoritesList = () => {
  const { favorites, recipes } = useRecipeStore((state) => ({
    favorites: state.favorites,
    recipes: state.recipes,
  }));

  const favoriteRecipes = favorites.map((favId) =>
    recipes.find((recipe) => recipe.id === favId)
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}> {/* Link to recipe details */}
            <h3>{recipe.title}</h3>
          </Link>
          <p>{recipe.description}</p>
          {/* ... other recipe details or actions (e.g., remove from favorites) ... */}
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;