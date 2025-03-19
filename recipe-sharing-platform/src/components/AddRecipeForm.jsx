import React, { useState } from 'react';

function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
      isValid = false;
    } else if (ingredients.trim().split('\n').filter(item => item.trim()).length < 2) {
      newErrors.ingredients = 'Please list at least two ingredients';
      isValid = false;
    }

    if (!steps.trim()) {
      newErrors.steps = 'Preparation steps are required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // In a real application, you would send this data to an API
      const newRecipe = {
        title,
        ingredients: ingredients.split('\n').map(item => item.trim()).filter(item => item),
        steps: steps.split('\n').map(item => item.trim()).filter(item => item),
        id: Date.now(),
        image: 'https://via.placeholder.com/300/CCCCCC/FFFFFF?Text=NewRecipe',
        summary: ingredients.split('\n')[0] || 'New Recipe Summary',
      };
      console.log('New Recipe Submitted:', newRecipe);
      setTitle('');
      setIngredients('');
      setSteps('');
      setErrors({}); // Clear errors on successful submission
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-gray-700 text-sm font-bold mb-2">
            Ingredients:
            <span className="text-gray-500 italic">(one per line)</span>
          </label>
          <textarea
            id="ingredients"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          {errors.ingredients && <p className="text-red-500 text-xs italic">{errors.ingredients}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="steps" className="block text-gray-700 text-sm font-bold mb-2">
            Preparation Steps:
            <span className="text-gray-500 italic">(one step per line)</span>
          </label>
          <textarea
            id="steps"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
          {errors.steps && <p className="text-red-500 text-xs italic">{errors.steps}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;