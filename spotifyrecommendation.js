// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAQ8FJy7IN2CF-g4sNJ_uc_XebBxtJBiPxHmBoD163w06UmgSJMUQvX8Fy7FKG1s467xxHmlTooAw2Os05HQIEzDOFIb_rdz-X_1o02EcAbMWfi23Psmd_0gtcoBMzgwjRq-uMfE7mZpoVCxNV5MYT0W1w5dnM_cQ2g__858Bk9Vt8pUZ2oOpH9Nk2VocAetUsfNivrOqCYCIKIsLB0SI8VOh1NqXvxGf8TJ7Glx3-hcttELX_-rblwVSJ4x9cQk7rEiXsuKK91YLQuLvj-';

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracksAndRecommendations() {
  const topTracksIds = [
    '3afkJSKX0EAMsJXTZnDXXJ', '0TL0LFcwIBF5eX7arDIKxY', '5Gu0PDLN4YJeW75PpBSg9p', '5IgjP7X4th6nMNDh4akUHb', '3RhyHYnYxuGnP8njFlNxHq'
  ];

  // Get user's top tracks
  const topTracks = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET');
  const topTrackNames = topTracks.items.map(({ name, artists }) =>
    `${name} by ${artists.map(artist => artist.name).join(', ')}`
  );

  // Get recommendations based on user's top tracks
  const recommendations = await fetchWebApi(`v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET');
  const recommendedTrackNames = recommendations.tracks.map(({ name, artists }) =>
    `${name} by ${artists.map(artist => artist.name).join(', ')}`
  );

  return { topTracks: topTrackNames, recommendations: recommendedTrackNames };
}

// Call the function and log the results
getTopTracksAndRecommendations().then(({ topTracks, recommendations }) => {
  console.log('Top Tracks:');
  console.log(topTracks);
  console.log('Recommendations:');
  console.log(recommendations);
});
