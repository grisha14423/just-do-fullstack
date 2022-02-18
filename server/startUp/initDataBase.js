const importanceMock = require("../mock/importances.json");
const Importance = require("../models/Importance");

module.exports = async () => {
  const importances = Importance.find();
  if (importances.length !== importanceMock.length) {
    await createInitialEntity(Importance, importanceMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();

  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return 0;
      } catch (error) {
        return error;
      }
    })
  );
}
