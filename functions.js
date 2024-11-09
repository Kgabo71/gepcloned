import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

// Get user's current location
export const getCurrentLocation = (successCallback, errorCallback) => {
  Geolocation.getCurrentPosition(
    position => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      successCallback(location);
    },
    error => errorCallback(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};

// Fetch nearby taxi ranks based on user location
export const getNearbyTaxiRanks = async (userLocation, radiusInKm = 10) => {
  const { latitude, longitude } = userLocation;
  const radiusInM = radiusInKm * 1000;

  const nearbyRanksSnapshot = await firestore()
    .collection('taxiRanks')
    .where('location', '>=', new firestore.GeoPoint(latitude - radiusInM / 111000, longitude - radiusInM / 111000))
    .where('location', '<=', new firestore.GeoPoint(latitude + radiusInM / 111000, longitude + radiusInM / 111000))
    .get();

  const nearbyRanks = nearbyRanksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return nearbyRanks;
};

// Add a new taxi rank
export const addTaxiRank = async (rankName, latitude, longitude) => {
  await firestore().collection('taxiRanks').add({
    name: rankName,
    location: new firestore.GeoPoint(latitude, longitude),
    routes: [],
  });
};

// Add a new route and cost
export const addRoute = async (rankId, destination, cost, distance, path = []) => {
  const newRouteRef = await firestore().collection('routes').add({
    destination: destination,
    cost: cost,
    rank: firestore().doc(`taxiRanks/${rankId}`),
    distance: distance,
    path: path.map(point => new firestore.GeoPoint(point.latitude, point.longitude)),
  });

  // Update the taxi rank to include this new route
  await firestore().collection('taxiRanks').doc(rankId).update({
    routes: firestore.FieldValue.arrayUnion(newRouteRef),
  });
};

// Find the taxi rank to the desired destination
export const findTaxiRankToDestination = async (destination) => {
  const ranksSnapshot = await firestore().collection('taxiRanks').get();
  const matchingRanks = [];

  for (const rankDoc of ranksSnapshot.docs) {
    const rankData = rankDoc.data();
    const routeRefs = rankData.routes;

    for (const routeRef of routeRefs) {
      const routeDoc = await routeRef.get();
      const routeData = routeDoc.data();

      if (routeData.destination === destination) {
        matchingRanks.push({ rank: rankData, route: routeData });
      }
    }
  }

  return matchingRanks;
};

// Example usage of the functions

// Fetch user location and nearby taxi ranks
getCurrentLocation(
  async (location) => {
    const ranks = await getNearbyTaxiRanks(location);
    console.log('Nearby Taxi Ranks:', ranks);
  },
  (error) => console.log('Error getting location', error)
);

// Add a new taxi rank
addTaxiRank('New Rank Name', -26.2041, 28.0473)
  .then(() => console.log('Taxi rank added successfully'))
  .catch(error => console.error('Error adding taxi rank:', error));

// Add a new route to a taxi rank
addRoute('rankId', 'Pretoria', 30, 50, [{ latitude: -26.2041, longitude: 28.0473 }])
  .then(() => console.log('Route added successfully'))
  .catch(error => console.error('Error adding route:', error));

// Find taxi ranks to a specific destination
findTaxiRankToDestination('Pretoria')
  .then(ranks => console.log('Taxi ranks to destination:', ranks))
  .catch(error => console.error('Error finding taxi rank:', error));
