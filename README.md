# Coffee app React Native Monorepo

This project, "Coffee app React Native Monorepo," is a mobile application developed with **React Native (Expo)** and a backend service built with **Node.js**. The app allows users to explore a variety of coffee options, customize them with specific modifiers, add them to their cart, and place orders.

## Features

- **Browse Coffees**: View a list of available coffees fetched from the Node.js server.
- **Coffee Details and Modifiers**: View detailed information for each coffee, including customization options through modifiers.
- **Customization**: Use modifiers to customize coffee selections and personalize orders.
- **Cart Management**: Manage items in the cart, remove items as needed, and review before placing an order.
- **Order Submission**: Submit orders directly from the cart.

## Installation

To get started with the project, follow these steps:

1. Clone the repository to your local machine.
2. In the root folder, run the following command to install all dependencies:

   ```bash
   yarn
   ```

## Running the Project

To start the development servers for both the React Native and Node.js applications, in the root, run:

```bash
yarn dev-kill
```

This command must be executed from the root folder of the monorepo, as it uses Yarn Workspaces to manage dependencies and start processes.

### Server Details

- The Node.js app runs on `localhost:5555`, handling data retrieval and order submissions.

## Project Structure

This monorepo contains two main projects:

1. **Node.js App**: Handles API requests, data storage, and other backend logic.
2. **React Native App (Expo)**: A mobile app interface for viewing and ordering coffees.

## Usage

- **Coffee List**: Open the app to view the list of coffees.
- **Customize Coffee**: Tap on a coffee to view details and available modifiers, allowing you to personalize your selection.
- **Cart Management**: Access the cart through a separate tab to manage items and place your order.
- **Order Submission**: Confirm your selections in the cart and submit your order.

## Configuration

No additional configuration is required.

## License

This project is licensed under the MIT License.

---

Feel free to reach out if you encounter any issues or have questions about the project.
