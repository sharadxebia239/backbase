# BackbaseAssignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.9.

## Environment

npm version - 6.14.12
Angular CLI version - 11.2.9
Node version - 14.16.1
Typescript version - 4.1.5

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Components

1. `Logo Component` - Used to display the logo on the top header of the page. Used as provided no modification.
2. `Make Transfer Component` - This is newly built component. Used to display the Make Transfer section. It follow the below criteria: 
    ```shell
    a. "From account" field is prefilled with my account details and is disabled.
    b. "To account" input field is a mandatory field.
    c. Following field validations exist on "Amount" input field:
        i.  It is a mandatory field
        ii. Negative numbers are not allowed
        iii. Decimals are permitted ( 2 places )
        iv. It does not allow amount below the total balance of -€500  
    ```
3. `Submit Button Component` - Used to submit the transaction. Used as provided no modification. 
4. `Transaction Item Component` -  Transaction Item is showing each transaction in the list. Used as provided no modification. 
5. `Transaction List Component` - This is newly built component. Transactions list is sorted by date in descending order.
6. `Filter Component` - Used to filter the transaction list on the basis of merchant name. Used as provided no modification.
7. `Footer Component` - Used to display the footer at the bottom of the page. Used as provided no modification.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Find the below test report along with code coverage:

`Test Report`:
```shell
Executed 24 of 24 SUCCESS
```

`Code Coverage Summary`:
```shell
Statements   : 77.78% ( 84/108 )
Branches     : 80.77% ( 21/26 )
Functions    : 61.29% ( 19/31 )
Lines        : 78.72% ( 74/94 )
```
## Running lint

Run `ng lint` to execute the lint. All files pass linting.
`Lint Warning`: TSLint's support is discontinued and it is deprecating its support in Angular CLI. To opt-in using the community driven ESLint builder, see: https://github.com/angular-eslint/angular-eslint#migrating-an-angular-cli-project-from-codelyzer-and-tslint.

## Assumptions

1. `Make transfer form validation` - Best practice is to manage validation inside template with desiable submit button and if I submit form without any changes in provided fields, so according to reactive form it is not dirty form and it will not showing any validation error message, but in our case I do not make any changes in the provided submit button component that's why all validations moved from template to ts. 
2. `Frontend Technical Assignment` - There is a difference in expected output and provided component because it was mentioned not to modify existing components hence this differnce prevails.  
3. `Transactions List Data` - TransactionService first tries to get the data from API if it fails to get data in any scenario from the API local json file is picked up.  