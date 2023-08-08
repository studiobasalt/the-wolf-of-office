# The Wolf of Office

The Wolf of Office is a versatile project that turns your Raspberry Pi into a powerful kiosk system, complete with a custom admin panel for easy management. This project utilizes Firebase and Svelte to create a user-friendly UI, and it includes a convenient Pi setup script for quick installation.

## Features

-   Raspberry Pi Kiosk: Transform your Raspberry Pi into an efficient kiosk system.
-   Custom Admin Panel: Manage your kiosk content and settings effortlessly through the dedicated admin panel.
-   Firebase Integration: Seamlessly integrate Firebase for data storage and real-time updates.
-   Svelte UI: Enjoy a responsive and modern user interface built with the Svelte framework.
-   Pi Setup Script: Use the provided setup script to streamline the installation process.
-   Chromium Startup: The system will launch Chromium on startup, disregarding x-frame-options for improved compatibility.
-   User Control: Ensure user access and control within the kiosk environment.

## Getting Started

To get started with The Wolf of Office on your Raspberry Pi, follow these steps:

1. Install and host the svelte UI, accessable by the pi
2. Setup firebase and add your credentials to the UI
   '''file: /apps/kiosk-ui/src/stores/firebase.ts'''
3. Make sure you have a Raspberry Pi running a compatible operating system.
4. Open the terminal on your Raspberry Pi.

Run the following command to install The Wolf of Office:

```bash
$ bash <(curl -Ls https://raw.githubusercontent.com/studiobasalt/the-wolf-of-office/main/apps/pi-setup/install.sh)
```

5. The setup script will guide you through the installation process.

6. After the installation is complete, your Raspberry Pi will automatically launch Chromium in kiosk mode on startup.

## Usage

### Admin Panel

The admin panel provides an intuitive interface to manage your kiosk content and settings. Simply log in to the admin panel and customize the displayed content, URLs, and other options.

### User Control

The user control feature allows you to manage user access within the kiosk environment. Define user roles, access levels, and permissions to create a tailored experience.

### VNC setup

Connect remotely to your Raspberry Pi using VNC. The setup script will automatically install and configure VNC for you.
https://www.realvnc.com/en/connect/download/viewer/

## Contributing

Contributions are welcome! If you'd like to contribute to The Wolf of Office, please follow these steps:

1. Fork the repository and create a new branch.
2. Make your changes and test thoroughly.
3. Create a pull request, detailing the changes you've made.
