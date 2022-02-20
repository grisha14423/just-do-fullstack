const notes = [
  {
    _id: "67rdca3eeb7f6fg",
    title: "title 1",
    importance: "67rdca3eeb7f6fgeed471198",
    content: "Lorem ipsum dolor ",
  },
  {
    _id: "67rdca3eeb7f6fgdasd",
    title: "title 2",
    importance: "67rdca3eeb7f6fgeed471100",
    content: "Lorem ipsum dolor and nunc",
  },
  {
    _id: "67rdca3eeb7f6fgdaasd",
    title: "title 3",
    importance: "67rdca3eeb7f6fgeed4711012",
    content: "Lorem ipsum dolor and smth else",
  },
  {
    _id: "67rdca3eeb7f6fgdaame",
    title: "title 4",
    importance: "67rdca3eeb7f6fgeed4711012",
    content: "Lorem ipsum dolor and company",
  },
  {
    _id: "67rdca3eeb7f6fgdaars",
    title: "title 5",
    importance: "67rdca3eeb7f6fgeed4711012",
    content: "Lorem ipsum dolor enough",
  },
  {
    _id: "67rdca3eeb7f6fgdaaqb",
    title: "title 6",
    importance: "67rdca3eeb7f6fgeed471198",
    content: "Lorem ipsum dolor and just go",
  },
  {
    _id: "67rdca3eeb7f254tra",
    title: "title gigas",
    importance: "67rdca3eeb7f6fgeed471100",
    content:
      "Cоздадим новый проект, добавим к нему файл index.php и запишем в этот файл, например, функцию var_dump([ 1, 2, 3 ]) с переданным в неё массивом. всё работает верно: X-Powered-By:PHP/5.6.19",
  },
];

if (!localStorage.getItem("notes")) {
  localStorage.setItem("notes", JSON.stringify(notes));
}
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(notes);
    }, 200);
  });

const add = (data) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      const notes = JSON.parse(localStorage.getItem("notes"));
      const newComment = {
        ...data,
        created_at: Date.now(),
        _id: Math.random().toString(36).substr(2, 9),
      };
      notes.push(newComment);
      localStorage.setItem("notes", JSON.stringify(notes));
      resolve(newComment);
    }, 200);
  });

const remove = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      const notes = JSON.parse(localStorage.getItem("notes"));
      const newnotes = notes.filter((x) => x._id !== id);
      console.log(id);
      console.log(newnotes);
      localStorage.setItem("notes", JSON.stringify(newnotes));
      resolve(id);
    }, 200);
  });

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("notes")).find(
          (user) => user._id === id
        )
      );
    }, 1000);
  });

if (!localStorage.getItem("notes")) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

const update = (id, data) =>
  new Promise((resolve) => {
    const notes = JSON.parse(localStorage.getItem("notes"));
    const noteIndex = notes.findIndex((n) => n._id === id);
    notes[noteIndex] = { ...notes[noteIndex], ...data };
    localStorage.setItem("notes", JSON.stringify(notes));
    resolve(notes[noteIndex]);
  });

export default fetchAll;
export { add, remove, getById, update };
