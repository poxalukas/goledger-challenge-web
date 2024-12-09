import { url } from "./url_api";

const username = 'psAdmin';
const password = 'goledger';

export async function listarTodosSons() {
  const body = {
    query: {
      selector: {
        "@assetType": "song",
      },
    },
  };

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));
  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url+ '/query/search', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const sortedData = result?.result?.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }) || [];

    return sortedData;
  } catch (err) {
    throw new Error(err.message);
  }
}



export async function deleteSong(somData) {
  const body = {
      key: somData.key,
      cascade: somData.cascade           
  };

  const headers = new Headers();
  headers.set("Authorization", "Basic " + btoa(`${username}:${password}`));
  headers.set("Content-Type", "application/json");

  try {
      const response = await fetch(url + '/invoke/deleteAsset', {
          method: "DELETE", 
          headers: headers,
          body: JSON.stringify(body),  
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;  
  } catch (err) {
      throw new Error(err.message);
  }
}

