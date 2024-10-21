export const convertFormData = (body) => {
  let data = {};
  body.forEach((value, key) => {
    try {
      data[key] = JSON.parse(value);
    } catch (e) {
      data[key] = value;
    }
  });
  return data;
};
