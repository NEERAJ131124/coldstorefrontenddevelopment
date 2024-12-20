import { AzureMap, AzureMapsProvider, IAzureMapOptions } from "react-azure-maps";
import * as atlas from "azure-maps-control";

export default function MapByCoordinates (coordinates:any){

    console.log(coordinates)
    const options: IAzureMapOptions = {
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: process.env.REACT_APP_AZURE_MAPS_KEY,
        },
        center: [coordinates.latitude??30.149, coordinates.longitude??15.232],
        zoom: 12,
      };
      
  return (
    <AzureMapsProvider>
      <div style={{ height: "300px", width: "100%" }}>
        <AzureMap options={options} />
      </div>
    </AzureMapsProvider>
  );
};

