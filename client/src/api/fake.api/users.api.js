const users = [
  {
    _id: "67rdca3eeb7f6fgeed471818",
    name: "Рэйчел Грин",
    email: "user@example.com",
    notes: [
      "67rdca3eeb7f6fgdaasd",
      "67rdca3eeb7f6fgdaame",
      "67rdca3eeb7f6fgdaars",
    ],
  },
  {
    _id: "67rdca3eeb7f6fgeed471819",
    name: "Шелдон Купер",
    email: "user1@example.com",
    notes: [
      "67rdca3eeb7f6fgdaasd",
      "67rdca3eeb7f6fgdaame",
      "67rdca3eeb7f6fgdaars",
    ],
  },
  {
    _id: "67rdca3eeb7f6fgeed471820",
    name: "Леонард Хофстедтер",
    email: "user2@example.com",
    notes: [
      "67rdca3eeb7f6fgdaasd",
      "67rdca3eeb7f6fgdaame",
      "67rdca3eeb7f6fgdaars",
    ],
  },
  {
    _id: "67rdca3eeb7f6fgeed471821",
    name: "Говард Воловиц",
    email: "user3@example.com",
    notes: [
      "67rdca3eeb7f6fgdaasd",
      "67rdca3eeb7f6fgdaame",
      "67rdca3eeb7f6fgdaars",
    ],
  },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("users")));
    }, 1000);
  });

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("users")).find(
          (user) => user._id === id
        )
      );
    }, 1000);
  });
export default fetchAll;
export { getById };
