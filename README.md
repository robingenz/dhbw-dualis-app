# dhbw-dualis-app

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/robingenz/dhbw-dualis-app/CI/main)](https://github.com/robingenz/dhbw-dualis-app/actions)
[![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/robingenz/dhbw-dualis-app?color=brightgreen&label=version)](https://github.com/robingenz/dhbw-dualis-app/releases)
[![Platforms](https://img.shields.io/badge/platform-android%20%7C%20ios-lightgrey)](https://github.com/robingenz/dhbw-dualis-app)

🎓 An **unofficial** app for students of the Baden-Wuerttemberg Cooperative State University (DHBW) to query the examination results.

---

## Features 🔥

- [x] Optimized content display for mobile devices
- [x] All results at a glance (no pop-ups)
- [ ] All results searchable (Coming soon)
- [x] Dark theme

## Screenshots 📷

| Android                                                                            | iOS                                                                        |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![Android Exam Results Page](/resources/screenshots/android-exam-results-page.jpg) | ![iOS Exam Results Page](/resources/screenshots/ios-exam-results-page.jpg) |

## FAQ 📢

1. **Is this an official app of the DHBW?**  
   No, this is NOT an official app of the DHBW.
   It is a private project of a former DHBW student that is not affiliated with the DHBW.
   It serves exclusively for learning purposes.
   For this reason the app is not available for download.

2. **Will this app be published?**  
   No, this app will not be published.

3. **How does the app work?**  
   Basically the app acts like a normal browser.
   The app communicates exclusively with the DHBW Dualis server.
   The received content is parsed and displayed in an optimized way.

4. **Does the app collect any data?**  
   The app does not collect any data.
   The app stores the session key of the current session in order to retrieve the data requested by the user.
   This session key is stored in the app's temporary memory and is deleted when the app is closed completely or when using the logout function.

## Development Setup 💻

### Prerequisites

- Install [Node.js](https://nodejs.org) which includes [Node Package Manager](https://www.npmjs.com/get-npm)
- Android development: Install [Android Studio](https://developer.android.com/studio)
- iOS development: Install [XCode](https://apps.apple.com/de/app/xcode/id497799835?mt=12)

### Getting Started

Clone this repository:

```
git clone https://github.com/robingenz/dhbw-dualis-app.git
```

Change to the root directory of the project:

```
cd dhbw-dualis-app
```

Install all dependencies:

```
npm i
```

Prepare and launch the Android app:

```
npx ionic cap sync android
npx ionic cap run android -l
```

Prepare and launch the iOS app:

```
npx ionic cap sync ios
npx ionic cap run ios -l
```

This project uses [Ionic](https://ionicframework.com/) as app development platform and the [Ionic CLI](https://ionicframework.com/docs/cli).

<!-- ## Contributing 😊

See [CONTRIBUTING.md](https://github.com/robingenz/dhbw-dualis-app/blob/main/CONTRIBUTING.md). -->
