import axios from "axios";
import { BASE_URL } from "../constants/constants";

export const getAll = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

export const getAllMedicines = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

export const getMedicinesId = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data;
};

export const postOrder = async (body) => {
  await axios.post(
    `${BASE_URL}/order`,
    body
  );
};

export const getOrder = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/order/getOrder`
  );
  return data;
};
