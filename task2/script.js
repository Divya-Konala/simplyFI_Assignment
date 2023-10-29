// Define the array of available tickets with their routes
const tickets = [
    "Paris - Skopje",
    "Zurich - Amsterdam",
    "Prague - Zurich",
    "Barcelona - Berlin",
    "Kiev - Prague",
    "Skopje - Paris",
    "Amsterdam - Barcelona",
    "Berlin - Kiev",
    "Berlin - Amsterdam",
  ];
  
  // Define an array of places to visit
  const placesToVisit = [
    "Amsterdam",
    "Kiev",
    "Zurich",
    "Prague",
    "Berlin",
    "Barcelona",
  ];
  
  // Define a function to calculate the travel route
  const travelRoute = (firstStop, tickets, placesToVisit) => {
    // Initialize a map to store the connections between cities
    let map = {};
  
    // Initialize an array to store the final travel route
    const route = [];
  
    // Create a copy of placesToVisit for tracking planned places
    let plannedPlaces = [...placesToVisit];
  
    // Define a recursive function to search for the travel route
    const routeSearch = (city) => {
      if (!route.includes(city)) {
        route.push(city);
  
        // Remove the visited city from the planned places list
        if (plannedPlaces.includes(city)) {
          let index = plannedPlaces.indexOf(city);
          plannedPlaces.splice(index, 1);
        }
  
        if (map[city]) {
          for (const neighbor of map[city]) {
            if (!route.includes(neighbor)) {
              // Recursively search for the neighbor city
              routeSearch(neighbor);
            }
          }
        }
      }
    };
  
    // Build the map of city connections from the provided tickets
    for (let i = 0; i < tickets.length; i++) {
      let [arr, dept] = tickets[i].split(" - ");
      if (map[arr] !== undefined) {
        map[arr].push(dept);
      } else {
        map[arr] = [dept];
      }
    }
  
    // Start the route search from the specified first stop
    routeSearch(firstStop);
  
    // If all planned places have been visited, return the final route
    if (plannedPlaces.length === 0) return route;
    else throw new Error("Places not covered");
  };
  
  // Calculate the travel route starting from "Kiev"
  let finalRoute = travelRoute("Kiev", tickets, placesToVisit);
  
  // Print the final route with " >>> " as a separator
  console.log(finalRoute.join(" >>> "));
  