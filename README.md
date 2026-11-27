# Trello Clone

A Trello-inspired task management application built using React and JavaScript. It allows users to manage boards, lists, cards, and checklists through an interactive interface using the Trello REST API. React's useReducer hook is used for managing application state.


## Features

- **Boards**
  - View all boards.
  - Create new boards.
  - Customize board backgrounds with colors or images.

- **Lists**
  - Create lists inside boards.
  - Edit list names.
  - Delete lists.

- **Cards**
  - Create cards inside lists.
  - View and edit card details.

- **Checklists**
  - Create checklists inside cards.
  - Add and delete checklist items.
  - Mark checklist items as complete or incomplete.
  - Track checklist progress using a progress bar.
  - Expand and collapse checklists.

- **State Management**
  - Manage component state using React's useReducer hook.
  - Handle state updates through actions and reducers.
  - Organize state transitions using a reducer function.

## Technologies Used

- React.js
- JavaScript (ES6+)
- React Hooks (useState, useEffect, useReducer)
- Vite
- Ant Design
- Tailwind CSS
- React Router DOM
- Axios
- React Icons
- Trello REST API

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/kltejasree/trello-clone/tree/use-reducer
```

### 2. Navigate to the project directory

```bash
cd trello-clone
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add your Trello API credentials:

```env
VITE_TRELLO_API_KEY=your_api_key
VITE_TRELLO_TOKEN=your_token
```

Replace the placeholder values with your actual Trello API key and token.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## State Management

React's `useReducer` hook is used for managing state and handling complex state updates.

- **Reducer:** Defines how the application state changes based on dispatched actions.
- **Initial State:** Defines the initial values of the state.
- **Actions:** Specify the type of operation to perform.
- **Dispatch:** Sends actions to the reducer to update the state.

This approach helps organize state updates and keeps state management logic separate from component rendering.


## Future Improvements

- Add drag-and-drop functionality for cards and lists.
- Improve responsive design.
- Add user authentication.
- Add due dates and labels to cards.
- Improve error handling and loading states.

