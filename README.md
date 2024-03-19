# Automation Project for Finance System

Automated tests have been created for the Finance system, a comprehensive tool designed for accounting and controlling funds for small and medium-sized businesses. The tests ensure the reliability and functionality of key features such as user authentication, search functionality, and logout behavior

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your machine
- Compatible with nodeJS version `16.14.0` and higher
- Compatible with npm version `8.3.1` and higher

### Installing and running the tests

1. Clone the repository:

   ```bash
   git clone https://github.com/art-harutyunyan/financeSystem.git
   ```

2. The `cypress.env.json` file is not pushed to repo, `cypress.env.example` is pushed instead. Fill the corresponding data before running Cypress.
3. To install dependencies `npm install`
4. To start Cypress runner `npx cypress open`
5. `experimentalRunAllSpecs` is enabled, so you can run all the specs.

======================================================================

After about 10 second you will see this ;)

![Example screenshot](https://github.com/art-harutyunyan/financeSystem/blob/1f535c6847519e4424e73381adcea8c77e808008/financeTests.png)
