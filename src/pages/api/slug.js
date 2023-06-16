// pages/api/yourRoute.js
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const accessToken = req.cookies.access_token;

//   try {
//     // Fetch the necessary data based on the access token
//     const data = await fetchData(accessToken);

//     // Extract the dynamic paths from the fetched data
//     const paths = extractPaths(data);

//     // Return the paths as a response
//     res.status(200).json({ paths });
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     res.status(500).json({ error: 'Error fetching data' });
//   }
// }

// async function fetchData(accessToken) {
//   // Make API request using the access token
//   const response = await axios.get('http://127.0.0.1:8000/api/v1/', {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   return response.data;
// }

// function extractPaths(data) {
//   // Assuming the data is an array of objects with a 'slug' property
//   const paths = data.map(item => ({
//     params: { slug: item.slug },
//   }));

//   return paths;
// }

export default async function handler(req, res) {
  const accessToken = req.cookies.access_token;

  // console.log(process.env.API_URL)

  // Use the access_token to fetch the necessary data or perform other operations
  const data = await fetch(process.env.API_URL + '/api/v1/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());

  res.status(200).json(data);
}