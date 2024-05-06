# Uni Hobbyist
This document explains the folder structure of the app.

## Folder Structure
This project is a React Native app that has been developed using the platform **Expo Go**.

### Expo Folder
The `.expo` folder is automatically generated after using the `npx expo start` or `yarn start` command to run
the project.

### Android Folder
The `android` folder contains folders and files to load the app on an Android device emulator for testing and was generated after connecting Firebase to the app.

### App Folder
The `app` folder contains folders and TypeScript files to help the app load functionalities in the background.

- The `(screens)` folder contains TypeScript files to load different screens or pages where information is loaded using their respective files from the `(info)` folder.

- The `(tabs)` folder contains TypeScript files to load tabs for the bottom tab menu.

### Assets Folder
The `assets` folder contains files to load fonts and images for the app.

### Components Folder
The `components` folder contains and folders to load custom components implemented by libraries and also contains content for the screens from the `(screens)` folder.

- The `__tests__` folder contains unit tests.
- The `(info)` folder contains TypeScript files to load content for the screens.

### Constants Folder
The `constants` folder contains a file to load the theme colours for the UI of the app.

### Coverage Folder
The `coverage` folder contains files that were automatically generated after running unit tests using Jest.

### Other Files
Other files were automatically generated when the **Expo** project was created.
- `.env.example` is used to store secrets for running the Firebase database for the app.
- `package.json` is used to define the packages or dependencies needed for the app.
