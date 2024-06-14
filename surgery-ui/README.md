# Cloud Surgery

## Design Principles

- Satisfy use cases with the minimum number of clicks.
- Fetch / Search a list -> Select an object -> CRUD form
- Stop users from doing things rather than throwing up error messages.
- Only enable buttons when the action is valid (e.g. mandatory fields filled in)
- Validate fields only if it's helpful.

### `npm install`

Sets up the application and downloads all dependencies.

### `npm start`

Runs the app in the development mode.\
For patient functionality, open [http://localhost:3000](http://localhost:3000) to view it in your browser.

To log in as an existing patient, use martin@test.com, password = bananas.

The page will reload when you make changes.\
You may also see any lint errors in the console.

For staff functionality, visit http://localhost:3000/staff/login.

To log in as an existing member of staff, use smith@lostinspace.com, password = pain.


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
