import React from 'react';
import { ENDPOINTS } from '../constants/Endpoints';
import { API_KEY } from '../constants/Key';
const axios = require('axios');

export const useSearch = async (search: string) => {
    const [success, setSuccess] = React.useState<any>(undefined);
    const [error, setError] = React.useState<any>(undefined);
    const myTemplate = (search: string) => `${ENDPOINTS.GENERAL}${search}?api_key=${API_KEY.KEY}`;
    const formattedWithTemplate = myTemplate(search);
    try {
        const response = await axios.get(formattedWithTemplate);
        console.log(response);
        setSuccess(response);
      } catch (error) {
        console.error(error);
        setError(error);
      }
      console.log('wowza', success.data.collections)
    return { success: success, error: error}
}