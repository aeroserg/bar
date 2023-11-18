// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from 'react';

const useApiData = (apiUrl, initialState) => {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [apiUrl]);

  return data;
};

export default useApiData;
