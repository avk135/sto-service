const API_ENDPOINT = 'https://sto-service.herokuapp.com/api';
// const API_ENDPOINT = 'http://localhost:5000/api';
const getFillials = async () => {
  try {
    let response = await fetch(`${API_ENDPOINT}/fillials`);
    response = await response.json();

    return response;
  } catch (e) {
    throw new Error(e);
  }
}

const getBookingsByFillialId = async (fillialId) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/booking/${fillialId}`);
    response = await response.json();
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  getFillials,
  getBookingsByFillialId,
  API_ENDPOINT
}