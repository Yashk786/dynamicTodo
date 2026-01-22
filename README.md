# DynamicTodo

A modern React Native todo application with local persistence, Redux state management, and undo functionality.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Yashk786/dynamicTodo.git
cd userList

# Install dependencies
npm install

# iOS only - Install pods
cd ios && pod install && cd ..

# Run the app
npm run android  # For Android
npm run ios      # For iOS
```

## 📦 APK File

The tested APK file is located in the `releases/` folder at the root of the repository.

**APK Location:** `releases/DynamicTodo-v1.0.apk` (or `releases/app-release.apk`)

To build your own APK:

```bash
# Navigate to android directory
cd android

# Build release APK
./gradlew assembleRelease

# The APK will be generated at:
# android/app/build/outputs/apk/release/app-release.apk
```

## 🛠️ Tech Stack

- **React Native** (0.83.1) - Mobile app framework
- **Redux Toolkit** - State management
- **React Redux** - Redux bindings for React
- **React Navigation** - Navigation library
- **AsyncStorage** - Local data persistence
- **React Native Progress** - Progress bar component
- **React Native Safe Area Context** - Safe area handling


