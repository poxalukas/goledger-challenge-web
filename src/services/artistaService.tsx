import { url } from "./url_api";

const username = 'psAdmin';
const password = 'goledger';

export async function listarTodosArtistas() {
  const body = {
    query: {
      selector: {
        "@assetType": "artist",
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



export async function excluirArtista(artistData) {
  const body = {
      key: artistData.key,
      cascade: artistData.cascade           
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

