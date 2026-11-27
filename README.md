# Trello Clone

A Trello-inspired task management application built using React and JavaScript. It allows users to manage boards, lists, cards, and checklists through an interactive interface using the Trello REST API.

### Trello clone vercel Link: https://trello-clone-kohl.vercel.app/

## Features

- **Boards**
  - View all boards.
  - Create new boards.
  - Customize board backgrounds with colors or images.

- **Lists**
  - Create lists inside boards.
  - Edit list names.
  - Archive lists.

- **Cards**
  - Create cards inside lists.
  - View and edit card details.

- **Checklists**
  - Create checklists inside cards.
  - Add and delete checklist items.
  - Mark checklist items as complete or incomplete.
  - Track checklist progress using a progress bar.
  - Expand and collapse checklists.

## Technologies Used

- React.js
- JavaScript (ES6+)
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
git clone https://github.com/kltejasree/trello-clone.git
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

## Project Structure

```text
src/
├── api/
│   ├── Boards.js
│   ├── List.js
│   ├── Cards.js
│   ├── CheckLists.js
│   ├── CheckItems.js
│   └── TrelloApi.js
│
├── components/
│   ├── Navbar.jsx
│   ├── Board.jsx
│   ├── CreateBoard.jsx
│   ├── BoardLists.jsx
│   ├── Cards.jsx
│   ├── CardDetails.jsx
│   ├── CardActions.jsx
│   ├── ChecklistSection.jsx
│   ├── ChecklistItem.jsx
│   ├── AddChecklist.jsx
│   ├── AddCheckItem.jsx
│   ├── Description.jsx
│   └── ProgressBar.jsx
│
├── App.jsx
├── main.jsx
└── App.css
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_TRELLO_API_KEY` | Trello API key |
| `VITE_TRELLO_TOKEN` | Trello API token |

**Note:** Never commit your `.env` file or expose your API credentials publicly.

## Future Improvements

- Add drag-and-drop functionality for cards and lists.
- Improve responsive design.
- Add user authentication.
- Add due dates and labels to cards.
- Improve error handling and loading states.

