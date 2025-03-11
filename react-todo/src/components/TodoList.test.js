// src/__tests__/TodoList.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';
import '@testing-library/jest-dom';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'New Todo' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Todo' }));
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles a todo', () => {
    render(<TodoList />);
    fireEvent.click(screen.getByText('Learn React'));
    expect(screen.getByText('Learn React')).toHaveStyle('text-decoration: line-through');
    fireEvent.click(screen.getByText('Learn React'));
    expect(screen.getByText('Learn React')).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    fireEvent.click(screen.getAllByRole('button', {name: 'Delete'})[0]);
    expect(screen.queryByText('Learn React')).toBeNull();
  });
});