# Documentation project 1 - Group 26

## Usage

-   `npm install` to install dependencies.
-   `npm run dev` to start the development server
-   `npm run prettier` to check code formatting
    -   `npm run prettier:fix` to fix formatting
-   `npm run lint` to check for linting errors
    -   `npm run lint:fix` to fix auto fixable linting errors
-   `npm test` to run all tests
-   `npm run build` to build the project
    -   it will be built in the `dist` folder

## Choices

For the design we chose to have a list of Pokémon to the left of the screen, and a sorting and filter section to the right, as well as showing detailed information about one Pokémon in the middle of the screen. For smaller screens both the Pokémon-list and the sorting/filter section collapses into a button to make for a better user experience.

We chose to wrap our application (in [`App.tsx`](./src/App.tsx)) in our `ContextProvider`, such that we have access to some global state in the application. The main purpose of the context is to keep track of which Pokémon are currently shown, as well as the current filters and sorting method. We did this to prevent having to send state variables and set functions down the component hierarchy. We believe this results in easier code to read and easier state management.

### Unnecessary API calls

As per not querying the API unnecessarily, we use TanStack Query and its `useQuery`/`useInfiniteQuery` hook. We know that [our API is static](https://pokeapi.co/docs/v2#info), so we use a query client with infinite staleTime and gcTime to reduce our number of calls. For some API calls, we "optimize" even more, as some of our query functions call other functions for individual Pokémon. See `getPokemonById` which is called by `getPokemonSliceAllData` (both in [Requests.ts](./src/api/Requests.ts)), which is called by a query function. In this function (`getPokemonById`), we manually check the cache for the Pokémon, and if it is there, we instantly return the cached data. This way our application will never request the same data from the API twice in the same session. We think this is the best way to handle our situation since our API does not support fetching detailed information about multiple Pokémon at once.

We have decided only to fetch 20 Pokémon when the website loads. Then the user can load more if they want to. By doing this, we reduce the number of API calls even more, but at the same time let the user decide if they want to see even more Pokémon.

Our filtering of Pokémon might not be as intuitive as we would want it to be, but there is a reason. Now, our filters are union-based, meaning that if you select "Fire" and "Water", you will get Pokémon that are either Fire or Water (not necessarily both). The reason we do not have intersection-based filters is that since we are fetching 20 Pokémon at a time, we would have to fetch a lot of Pokémon to get almost any results with more than one filter. We think that this is a good trade-off, as we do not want to make too many API calls.

### Web storage

We use `sessionStorage` to store the user's currently selected Pokémon, filters, and sorting methods. This is done to make the user experience better, as the user keeps their state in the application even if they refresh or close and reopen the page (in one session). We do not use `localStorage` for that since we do not want to keep this state between sessions.

We also use `localStorage` to store the user's favorite Pokémon, such that they are saved between sessions.

## What's tested

We are testing most of the components of the project. We also test the utility functions in `utils.ts`.

How/what we are testing:

-   our own components
    -   including props, state, and user interaction
-   use mocking so that we do not depend on the API during testing
-   use snapshot testing to ensure that the components are rendered as expected

We have also done manual testing to ensure that the application works as expected. Quite a lot of time has been spent on testing the application on different browsers and devices with different screen sizes.
