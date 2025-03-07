import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom'; // Import Link for recipe details

const RecommendationsList = () => {
  const { recommendations } = useRecipeStore((state) => ({
    recommendations: state.recommendations,
  }));

  return (
    <div>
      <h2>Recommendations</h2>
      {recommendations.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}> {/* Link to recipe details */}
            <h3>{recipe.title}</h3>
          </Link>
          <p>{recipe.description}</p>
          {/* ... other recipe details or actions (e.g., add to favorites) ... */}
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;