const importances = [
  {
    _id: "67rdca3eeb7f6fgeed471198",
    name: "Не важно",
    color: "secondary",
  },
  {
    _id: "67rdca3eeb7f6fgeed471100",
    name: "Важно",
    color: "success",
  },
  {
    _id: "67rdca3eeb7f6fgeed4711012",
    name: "Очень важно",
    color: "danger",
  },
];
// unimportant: {
//   _id: "67rdca3eeb7f6fgeed471198",
//   name: "Не важно",
//   color: "secondary",
// },
// important: {
//   _id: "67rdca3eeb7f6fgeed471100",
//   name: "Важно",
//   color: "success",
// },
// topmost: {
//   _id: "67rdca3eeb7f6fgeed4711012",
//   name: "Очень важно",
//   color: "danger",
// },

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(importances);
    }, 200);
  });

export default fetchAll;
