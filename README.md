# Uni Hobbyist
This document explains the folder structure and will guide you on how to run the **UniHobbyist** software on your device.

## Folder Structure
This project is a React Native app that has been tested using the platform **Expo Go** and on an iOS device however, this app should be able to work on both Android and iOS devices.

### Android Folder
The 'Android' folder contains folders and files to load the app on an Android device.

### App Folder
The 'App' folder contains folders and TypeScript files to help the app load functionalities in the background.

- The 'Screens' folder contains TypeScript files to load different screens or pages where information is loaded using their respective files from the 'Info' folder. These files also load the 'Toast' components.

- The 'Tabs' folder contains TypeScript files to load tabs for the bottom tab menu.

### Assets Folder
The 'Assets' folder contains files to load fonts and images for the app.

### Components Folder
The 'Components' folder contains and folders to load custom components implemented by libraries and also contains content for the screens from the 'Screens' folder.

- The 'Info' folder contains TypeScript files to load content for the screens.

## Running the app
1. Download the ```.zip``` file of the app from Moodle or OneDrive.
2. Download Visual Studio Code using this link: https://code.visualstudio.com/
3. Extract contents of the ```.zip``` file and open the project in Visual Studio Code.
4. Open up the terminal in Visual Studio Code and change the directory to 'uni-hobbyist' using:
    ```cd uni-hobbyist```

    The current directory should contain the file 'package.json' and to test this, input ```ls``` into the terminal to see the files of the current directory.
5. Run ```yarn``` in the terminal to install all the packages needed for the code.
6. A ```.env``` file is needed to connect the Firebase database to the React Native project. Copy and paste the ```.env.example``` file to the 'uni-hobbyist' folder and rename to ```.env```.
7. Head over to the Firebase Console and login with the details of the test account.
8. Look for the secrets in the project settings and the Android app section.
9. Click on the side menu and head over to the Realtime Database under the 'Build' section to get the final secret.
10. Go back to Visual Studio Code and run the app using ```npm start``` or ```npx expo start```.
11. Download **Expo Go** on your mobile device.
12. Scan the QR code from the terminal using your camera. This should open the app in **Expo Go**.