# Note-Taking App

## Overview

This is a simple note-taking web application where users can create, edit, and delete notes. The notes are stored in the browser's **local storage**, ensuring that they persist even after the browser is closed. Each note consists of a **title** and a **main note section**.

## Features

- Add new notes with a title and content.
- Save notes to **local storage** for persistence.
- Edit existing notes by clicking on them.
- Delete notes with a confirmation prompt.
- Automatically updates the UI based on available notes.

## Technologies Used

- **HTML**: For the page structure.
- **CSS**: For styling (not included in this file, but assumed to be present).
- **JavaScript**: For handling interactivity, local storage, and dynamic UI updates.

## How It Works

### Adding Notes

- Users enter a **title** and **note content** into the input fields.
- Clicking the **Save** button adds the note to the **local storage** and displays it on the page.
- If the title or content is empty, an alert will prompt the user to enter both.

### Editing Notes

- Clicking on the title of an existing note will load it into the input fields for editing.
- The old note is removed from storage before saving the updated version.

### Deleting Notes

- Clicking the delete button ("X" icon) prompts the user for confirmation.
- If confirmed, the note is removed from both the UI and local storage.

### Persistent Storage

- Notes are stored in **local storage** using `JSON.stringify()`.
- Retrieved notes are parsed using `JSON.parse()` and displayed on page load.

### UI Updates

- Notes are dynamically added or removed from the DOM.
- The visibility of UI elements (such as the link area) is adjusted based on the number of saved notes.

## File Structure

```plaintext
/project-root
│── index.html         # Main HTML file
│── css
│   └── styles.css     # CSS for styling
│── js
│   └── styles.css     # JavaScript logic (this file)
│── README.md          # This documentation
```

## How to Use

1. Open `index.html` in a browser.
2. Enter a **title** and **note content**.
3. Click **Save** to add the note.
4. Click on an existing note title to edit it.
5. Click the **delete button (X icon)** to remove a note.

## Future Improvements

- Add **search functionality** to quickly find notes.
- Implement **dark mode** for better UI experience.
- Sync notes with a **cloud database** for multi-device access.

---

Enjoy using the Note-Taking App! 
