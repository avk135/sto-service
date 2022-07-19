const API_ENDPOINT = 'https://sto-service.herokuapp.com/api';
//const API_ENDPOINT = 'http://localhost:5000/api';

const getFillials = async () => {
  try {
    let response = await fetch(`${API_ENDPOINT}/fillials`);
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const deleteBookingById = async (bookingsId) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/bookings/${bookingsId}`, {
      method: 'DELETE'
    });
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const completeBookingById = async (bookingId) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/bookings/complete/${bookingId}`, {
      method: 'POST'
    });

    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}



const getFillialById = async (fillialId) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/fillials/${fillialId}`);
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const updateFillialById = async (fillialId, payload) => {
  console.log(payload);
  try {
    let response = await fetch(`${API_ENDPOINT}/fillials/${payload._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const deleteFillialById = async (fillialId) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/fillials/${fillialId}`, {
      method: 'DELETE'
    });
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const getBookingsByFillialId = async (fillialId) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/booking/${fillialId}`);
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const getCustomers = async () => {
  try {
    let response = await fetch(`${API_ENDPOINT}/customers`);
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const createFillial = async (payload) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/fillials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}


const login = async ({ email, password }) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.status === 200) {
      response = await response.json();
    } else if (response.status === 403) {
      throw new Error('Не верный логин или пароль');
    } else {
      throw new Error(response);
    }

    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}

const getTireFittingGoods = async () => {
  try {
    let response = await fetch(`${API_ENDPOINT}/tire-fitting-good`);
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const getConditioningGoods = async () => {
  try {
    let response = await fetch(`${API_ENDPOINT}/conditioning-goods`);
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const getAdditionalServices = async () => {
  try {
    let response = await fetch(`${API_ENDPOINT}/additional-services`);
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const getTireRepair = async () => {
  try {
    let response = await fetch(`${API_ENDPOINT}/tire-repair`);
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const getFittingGoodById = async (id) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/tire-fitting-good/${id}`);
    response = await response.json();

    return Promise.resolve(response);
  } catch (e) {
    return e;
  }
}

const updateFittingGoodById = async (id, payload) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/tire-fitting-good/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const saveBill = async (payload) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/billings`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    response = await response.json();

    return response;
  } catch (e) {
    return e;
  }
}

const getBills = async (fillialId, date) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/billings/${fillialId}/${date}`);

    response = await response.json();
    return response;
  } catch (e) {
    return e;
  }
}

export default {
  getFillials,
  getBookingsByFillialId,
  login,
  getCustomers,
  createFillial,
  getFillialById,
  updateFillialById,
  deleteFillialById,
  deleteBookingById,
  completeBookingById,
  getTireFittingGoods,
  getConditioningGoods,
  getAdditionalServices,
  getTireRepair,
  getFittingGoodById,
  updateFittingGoodById,
  saveBill,
  getBills
}