# React + Vite Forms and Application with Redux and a mock json-server

Run both the app and the json-server with npm run dev:all
json-server runs on port 3001

Forms key features:

Register form:

- Username, Email, Password and Confirm password fields with real time + on-submit validations
- Minimal password length requirement + a password strength indicator
- Info tooltip on how to make your password stronger
- Show/Hide password button
- Unsuccessful submission due to errors in input fields show an additional error 
- Successfull submission shows a success message and redirects to the home route in 1.5 seconds
- Successfull submission saves the user's username, email and password in a mock json-server (password IS NOT hashed)


Sign-in form:

- Email and Password input fields with real time + on-submit validations
- Show/Hide password button
- Unsuccessful submission due to errors in input fields show an additional error - Successfull submission shows a success message and redirects to the home route in 1.5 seconds
- The form DOES NOT check whether user exists in the json-server - if all input fields' requirements are met, user is redirected to the home route in 1.5 seconds


App key features:

- Plant data fetched from Trefle API using an API key from .env (visible on purpose)
- Simulates a logged-in user
- Uses Vite's proxy to bypass cors
- Router with a Home page, favorites page, detailed plant view page, Not Found page
- Redux slices for plants fetching + crud on favorites (without update)
- Implemented Suspense + lazy loading
- Pagination on home page and on favorites page (on 10+ favorites)
- Fallback image for plants as API's images don't always render
- User can favorite a plant through the home page and through the details page
- User can navigate to the details page through the home page and through the favorites page
- Favorites are saved in the json-server

