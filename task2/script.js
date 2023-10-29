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

const placesToVisit = [
  "Amsterdam",
  "Kiev",
  "Zurich",
  "Prague",
  "Berlin",
  "Barcelona",
];

const travelRoute = (firstStop, tickets, placesToVisit) => {
  let map = {};
  const route = [];
  let plannedPlaces = [...placesToVisit];
  const routeSearch = (city) => {
    if (!route.includes(city)) {
      route.push(city);
      if (plannedPlaces.includes(city)) {
        let index = plannedPlaces.indexOf(city);
        plannedPlaces.splice(index, 1);
      }
    }

    if (map[city]) {
      for (const neighbor of map[city]) {
        if (!route.includes(neighbor)) {
          routeSearch(neighbor);
        }
      }
    }
  };
  for (let i = 0; i < tickets.length; i++) {
    let [arr, dept] = tickets[i].split(" - ");
    if (map[arr] !== undefined) {
      map[arr].push(dept);
    } else {
      map[arr] = [dept];
    }
  }

  routeSearch(firstStop);
  if (plannedPlaces.length === 0) return route;
  else throw new Error("places not covered");
};

let finalRoute = travelRoute("Kiev", tickets, placesToVisit);
console.log(finalRoute.join(" >>> "));
