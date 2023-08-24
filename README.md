
# Vehicle Tracking System

## Description

The Vehicle Tracking System is a project developed to allow users to view the current mileage status of tires in their vehicles. It provides an intuitive interface for users to manage and monitor tire information effectively.

## Business Rules

- Valid tire positions are defined as follows: (1L, 1R, 2L, 2R, 3L, 3R)
- It's assumed that there is only one tire for each position.
- A vehicle can have a maximum of 6 tires.

## Prominent Used Libraries

- [@angular/forms](https://www.npmjs.com/package/@angular/forms): Utilized for updating and adding new vehicles.
- [@ngrx/store](https://www.npmjs.com/package/@ngrx/store): Employed for managing Redux states.
- [@ngrx/store-devtools](https://www.npmjs.com/package/@ngrx/store-devtools): Ngrx/Store-Devtools: Used to visualize Redux states.
- [ng-zorro-antd](https://www.npmjs.com/package/ng-zorro-antd): Utilized for standardized components.
- [number-to-words](https://www.npmjs.com/package/number-to-words): Used for generating tire detail file names from numeric IDs.
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): Used for standardized CSS classes.


## Models

### Vehicle Model

```typescript
export interface Vehicle {
	id: string,
	lpn: string,
	depot: string
}
```
### Vehicle Detail Model
```typescript
import { Tire } from  "./tire.model";
import { Vehicle } from  "./vehicle.model";

export interface VehicleDetail extends Vehicle {
	tires: Tire[];
}
```

### Tire Model
```typescript
export interface Tire {
	id: string,
	position: string,
	mileage: string,
	mileageUnit: string
}
```

## Redux Structure

```typescript
export interface AppState {
	vehicles: Vehicle[];
	selectedVehicle: VehicleDetail | null;
	vehicleDetails: VehicleDetail[];
}
```

## Features

- Users can view vehicles in a tabular format through the 'vehicle-table' URL.
- The tabular structure allows users to access tire details.
- The Edit button enables users to modify vehicle details and tire information.
- The Create button allows users to add new vehicles.
- The Delete button lets users remove vehicles.
- Users can add or remove up to 6 tires for each vehicle on the existing form page.
- Users can view vehicle cards through the 'vehicle' URL.
- Tire details for each vehicle can be accessed through information indicators on the vehicle model.
- Red indicators indicate missing or incomplete tire information.
- Pagination is available for viewing vehicles in both table and card views, and users can adjust the number of displayed entries.

## Flow

The `app.component.ts` reads the vehicle list JSON file located in the assets folder and populates our Redux states with vehicle details for each vehicle. Subsequent actions are processed based on user interactions and update the Redux states accordingly. The entire process ensures that users can easily manage and monitor their tire information.

## Unit Tests

Unit tests are crucial to ensure the stability and correctness of your application. In this project, we have employed Karma and Jasmine for conducting unit tests.

### Karma

[Karma](https://karma-runner.github.io/latest/index.html) is a test runner that enables us to execute JavaScript code in multiple real browsers. It offers a consistent testing environment and allows us to catch potential issues across different browser platforms.

### Jasmine

[Jasmine](https://jasmine.github.io/) is a behavior-driven development framework for testing JavaScript code. It provides a clean and expressive syntax for writing test cases, making it easier to describe and understand the expected behavior of your code.

#### Running Unit Tests

To run the unit tests, make sure you have the necessary dependencies installed. You can usually do this by running:

```sh
npm install
```
Once the dependencies are installed, you can execute the unit tests using the following command:
```sh
ng test
```

#### Coverage Summary
Here is a summary of the test coverage for your project:
- Statements: 96.55% (168/174)
- Branches: 85.29% (29/34)
- Functions: 97.22% (70/72)
- Lines: 96.12% (149/155)


## Contact

For any inquiries or assistance, feel free to contact us at [emre.hanci@icloud.com](mailto:emre.hanci@icloud.com).

## License

This project is licensed under the [MIT License](LICENSE).
