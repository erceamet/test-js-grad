/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

const { default: axios } = require('axios');

module.exports = async function oldestPackageName() {
  // TODO
  const name = await axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(res => {
      return findOldestPackage(res.data.content);
    });
  return name;
};

const findOldestPackage = content => {
  const sortedPackagesByDate = content.sort(
    (a, b) => new Date(a.package.date) - new Date(b.package.date),
  );
  const oldestPackageByDate = sortedPackagesByDate[0].package.name;
  return oldestPackageByDate;
};
