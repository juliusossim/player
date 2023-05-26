import { RadioBrowserApi, StationSearchType } from 'radio-browser-api'
import { useCallback, useEffect, useState } from 'react';

type RadioProps = {
  param?: { [key: string]: string | number }
}

const defaultCode = 'US';
type DefaultParamsType = {
  countryCode?: string;
  limit?: number;
  offset?: number;
} & RadioProps;

const defaultParams: DefaultParamsType = { countryCode: defaultCode, limit: 10, offset: 0  }

export const useRadio = (params = defaultParams) => {

    type StationType = { [key: string]: string | any }

    const [stations, setStations] = useState<Array<{[key: string]: string | any}>>([]);

 const api = new RadioBrowserApi('My Radio App')

    const countrySations = async () => {
      try {
       console.log(params.countryCode)
       const results: StationType[] = await api.searchStations({
         ...params
       })
       setStations(results)
       return results;
      }
      catch(e){
       console.log(e)
      }
}
    useEffect(() => {
      countrySations()
    
      return () => {
        console.log(stations);
      }
    }, [params])
    

    
    return ({
        stations, setStations
    })
}