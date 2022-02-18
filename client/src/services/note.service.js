import httpService from "./http.service";

const noteEndPoint = `note/`;

const noteService = {
  get: async () => {
    const { data } = await httpService.get(noteEndPoint);
    return data;
  },
  createNote: async (payload) => {
    const { data } = await httpService.post(noteEndPoint, payload);
    return data;
  },
  removeNote: async (noteId) => {
    const { data } = await httpService.delete(noteEndPoint + noteId);
    return data;
  },
  updateNote: async (payload) => {
    // console.log(payload);
    const { data } = await httpService.patch(
      noteEndPoint + payload._id,
      payload
    );
    // console.log(data);

    return data;
  },
};

export default noteService;
