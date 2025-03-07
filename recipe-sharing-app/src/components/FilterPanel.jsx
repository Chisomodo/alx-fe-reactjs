// FilterPanel.jsx
import { useRecipeStore } from './recipeStore';

const FilterPanel = () => {
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleFilterChange = () => {
    filterRecipes();
  };

  return (
    <div>
      {/* ... filter options for ingredients, cooking time, etc. ... */}
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};