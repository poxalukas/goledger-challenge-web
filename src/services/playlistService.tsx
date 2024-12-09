import { url } from "./url_api";

const username = 'psAdmin';
const password = 'goledger';

export async function listarTodasPlaylist() {
  const body = {
    query: {
      selector: {
        "@assetType": "playlist",
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



export async function deletePlaylist(playlistData) {
  const body = {
      key: playlistData.key,
      cascade: playlistData.cascade           
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



//{
  //     "asset": [
  //       {
  //         "@assetType": "album",
  //         "name": "Luka'Album",
  //         "year": 2022,
  //         "artist": {
  //           "@assetType": "artist",
  //           "@key": "artist:713a43ae-8caf-5553-9871-6e62b00b4ae0"
  //         }
  //       }
  //     ]
  //   }
  //   dados para album
  
  
  // {
  //     "asset": [
  //       {
  //         "@assetType": "artist",
  //         "name": "Luka'Album",
  //         "country": "Brazil"
  //       }
  //     ]
  //   }
    
  
  
  // {
  //     "asset": [
  //       {
  //         "@assetType": "playlist",
  //         "name": "my playlist",
  //         "songs": [
  //           {
  //             "@assetType": "song",
  //             "@key": "song:1f37f761-980e-5bca-8986-abf8990fe8d3"
  //           }
  //        ],
  //         "private": true
    
  //       }
  //     ]
  //   }
    
  
  //
  
  // {
  //     "asset": [
  //       {
  //         "@assetType": "song",
  //         "name": "my song",
  //         "album": {
  //           "@assetType": "album",
  //           "@key": "album:b3cc9dd9-e083-51f9-bef6-f332417db414"
  //         }
  //       }
  //     ]
  //   }