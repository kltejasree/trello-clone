# Trello Clone

A Trello-inspired task management application built using React and Redux Toolkit. It allows users to manage boards, lists, cards, and checklists through an interactive interface using the Trello REST API.


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
  - Manage application state using Redux Toolkit.
  - Organize state using feature-based slices.
  - Use Redux hooks to access and update the application state.

## Technologies Used

- React.js
- JavaScript (ES6+)
- Redux Toolkit
- React Redux
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
git clone https://github.com/kltejasree/trello-clone/tree/reduxToolkit
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

## Redux Toolkit

Redux Toolkit is used for centralized state management.

The Redux structure is organized into feature-based slices:

- **boardSlice:** Manages board-related state.
- **boardListSlice:** Manages board list-related state.
- **cardsSlice:** Manages card-related state.
- **cardDetailsSlice:** Manages card details-related state.
- **store:** Configures the Redux store and combines the reducers.

React Redux hooks such as `useSelector` and `useDispatch` are used to access the state and dispatch actions from components.

## Project Structure

```text
src/
├── api/
│   ├── List.js
│   └── TrelloApi.js
│
├── assets/
│
├── components/
│   ├── AddCheckItem.jsx
│   ├── Addchecklist.jsx
│   ├── Board.jsx
│   ├── BoardLists.jsx
│   ├── CardActions.jsx
│   ├── CardDetails.jsx
│   ├── Cards.jsx
│   ├── Checklistitem.jsx
│   ├── ChecklistSection.jsx
│   ├── CreateBoard.jsx
│   ├── DeleteList.jsx
│   ├── Description.jsx
│   ├── Navbar.jsx
│   └── ProgressBar.jsx
│
├── redux/
│   ├── features/
│   │   ├── board/
│   │   │   └── boardSlice.js
│   │   ├── boardList/
│   │   │   └── boardListSlice.js
│   │   ├── cardDetails/
│   │   │   └── cardDetailsSlice.js
│   │   └── cards/
│   │       └── cardsSlice.js
│   │
│   └── store/
│       └── store.js
│
├── App.css
├── App.jsx
├── index.css
└── main.jsx

.env
```


## Future Improvements

- Add drag-and-drop functionality for cards and lists.
- Improve responsive design.
- Add user authentication.
- Add due dates and labels to cards.
- Improve error handling and loading states.