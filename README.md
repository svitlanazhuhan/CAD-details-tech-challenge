# CAD-details-tech-challenge

## Overview
This test automation project validates the authentication flow and access restrictions for CAD Drawings and Sample Collections. The framework is implemented using Playwright and structured with Page Object Model (POM) for better maintainability. User credentials are securely stored in a .env file.

## Test Scenarios

### 1. Login Flow Validation
 - Verify that users can log in with valid credentials.
 - Validate error messages for invalid login attempts:
   - Incorrect email format.
   - Unregistered email.
   - Incorrect password.
   - Empty email or password fields.
   - Ensure the login process updates the UI accordingly.

### 2. Authentication Blocking for CAD Drawings
 - Logged Out:
   - All preview images should be blurred.
   - A "Login/Register" button should be present.
   - The "Download CAD Files" button should prompt a login dialog.
 - Logged In:
   - Users can preview CAD Drawings without blurring.
   - Users can download CAD files from the visualizer or card icons.
### 3. Authentication Blocking for QuickPacks Download
 - Logged Out: "Download a Sample Collection" on the homepage should prompt a login dialog.
 - Logged In: The download should proceed without authentication barriers.

## Instructions to Set Up Locally and Run Tests
### Prerequisites:
- [Node.js](https://nodejs.org/) (includes npm)
   

### Steps to Set Up Locally:
 Clone the repository to your local machine using the following command:

```bash
 git clone https://github.com/svitlanazhuhan/CAD-details-tech-challenge.git
 cd CAD-details-tech-challenge
```

 Install the required dependencies:
```bash
 npm install
```

 You will need to set up environment variables for credentials. Create a ```.env``` file in the root directory of the project, and add the following variables:
```ini
CADDETAILS_USERNAME="user_email"
CADDETAILS_PASSWORD="user_password"
```

Playwright requires the installation of browser binaries. You can install them using the following command:

```bash
 npx playwright install --with-deps
```
Run the Tests: Once everything is set up, you can run the tests using the following command:

```bash
npx playwright test
```
To run a specific test, use:

```bash
npx playwright test tests/your-test-file.spec.ts
```

## Test Framework Implementation
### Framework: 
 Playwright with TypeScript
### Folder Structure:
```bash
CAD-details-tech-challenge/
│── .github/
│   └── workflows/
│       └── ci.yml                       # GitHub Actions CI/CD workflow
│── fixtures/
│   └── testData.ts                      # Stores test data (credentials, error messages)
│── pages/
│   ├── BasePage.ts                      # Common page functionalities
│   ├── CadDrawingsPage.ts               # CAD Drawings page interactions
│   ├── HomePage.ts                      # Homepage interactions (QuickPacks)
│   ├── LoginPage.ts                     # Login functionality and validation
│── tests/
│   ├── authenticationTests.spec.ts      # Login tests (valid/invalid credentials)
│   ├── downloadCadDrawingsTests.spec.ts # CAD Drawings authentication and downloads
│   ├── downloadQuickPacksTests.spec.ts  # QuickPacks download authentication
│── .env.example                          # Example environment variables file
│── package.json
│── playwright.config.ts
│── README.md                             # Project documentation
```


## Error Handling & Cleanup
 Each test ensures proper UI validation for errors and authentication failures.
 Downloaded files are verified and removed after each test run.

## CI/CD Integration with GitHub Actions

 This project includes a GitHub Actions workflow (.github/workflows/ci.yml) to automate test execution on every push and pull request to the main and master branches.
### Workflow Steps:
1. Checkout Code - Retrieves the latest code from the repository.
2. Setup Node.js - Installs the latest long-term support (LTS) version of Node.js.
3. Install Dependencies - Runs npm ci to install project dependencies.
4. Install Playwright Browsers - Ensures required browsers and dependencies are installed.
5. Set Environment Variables - Loads credentials securely from GitHub Secrets.
6. Run Playwright Tests - Executes all Playwright test cases.
7. Upload Test Reports - Stores test artefacts (screenshots, videos, and reports) for debugging.

This structured approach ensures robust test coverage for authentication and CAD file access restrictions.
