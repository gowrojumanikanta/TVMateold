import axios from "axios";

export const BASE_URL = "https://api.tvmaze.com/shows";

export const fetchShows = async () => {
  try {
    return await axios.get(`${BASE_URL}/shows`);
  } catch (e) {
    return [];
  }
};

export const showDetailsRes= async () => {
  try {
    return await axios.get(`${BASE_URL}/show/1`);
  } catch (e) {
    return [];
  }
};

export const fetchShowList = async () => {
  try {
    return await axios.get(`${BASE_URL}/shows?q=arrow`);
  } catch (e) {
    return [];
  }
};

export const fetchCastList = async () => {
  try {
    return await axios.get(`${BASE_URL}/shows/1/cast`);
  } catch (e) {
    return [];
  }
};

export const fetchSCrewList = async () => {
  try {
    return await axios.get(`${BASE_URL}/shows/1/crew`);
  } catch (e) {
    return [];
  }
};
