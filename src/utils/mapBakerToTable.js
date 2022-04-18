const mapBakerToTable = (baker) => ({
  id: baker.id,
  name: baker.name,
  appearance: baker.totalAppearance,
  taste: baker.totalTaste,
  total: baker.totalAppearance + baker.totalTaste,
});

export default mapBakerToTable;
