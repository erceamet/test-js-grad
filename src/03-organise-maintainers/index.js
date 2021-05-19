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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

const { default: axios } = require('axios');

module.exports = async function organiseMaintainers() {
  // TODO
  let maintainers = [];
  const content = await axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(res => {
      return res.data.content;
    });

  let usernames = [];
  content.forEach(i => {
    i.package.maintainers.forEach(childrenI => {
      !usernames.includes(childrenI.username)
        ? usernames.push(childrenI.username)
        : null;
    });
  });
  usernames.sort();
  usernames.forEach(user => {
    let listOfPackages = [];
    content.forEach(i => {
      i.package.maintainers.forEach(childrenI => {
        childrenI.username == user ? listOfPackages.push(i.package.name) : null;
      });
    });
    listOfPackages.sort();
    maintainers.push({ username: user, packageNames: listOfPackages });
  });
  return maintainers;
  // return maintainers;
};
