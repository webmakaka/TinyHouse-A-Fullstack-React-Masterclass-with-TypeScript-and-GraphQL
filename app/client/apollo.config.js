module.exports = {
  client: {
    service: {
      name: 'apollo-server',
      url: 'https://tinyhouse.dev/api',
      // optional headers
      // headers: {
      //   authorization: 'Bearer lkjfalkfjadkfjeopknavadf',
      // },
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};

// module.exports = {
//   service: {
//     endpoint: {
//       url: 'https://tinyhouse.dev/api',
//       skipSSLValidation: true,
//     },
//   },
// };

// module.exports = {
//   client: {
//     service: {
//       name: 'apollo-server',
//       endpoint: {
//         url: 'https://tinyhouse.dev/api',
//         skipSSLValidation: true,
//       },
//     },
//   },
// };
