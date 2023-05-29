import { RadioBrowserApi, StationSearchType } from 'radio-browser-api';
import { useCallback, useEffect, useMemo, useState } from 'react';

type RadioProps = {
  [key: string]: string | number;
};

const defaultCode = 'US';
type DefaultParamsType = {
  countryCode?: string;
  limit?: number;
  offset?: number;
} & RadioProps;

const defaultParams: DefaultParamsType = {
  countryCode: defaultCode,
  limit: 10,
  offset: 0,
};

export const useRadio = (params: DefaultParamsType) => {
  params = { ...defaultParams, ...params };
  const [stations, setStations] = useState<{ [key: string]: string | any }[]>([]);
  const api = useMemo(() => new RadioBrowserApi('My Radio App'), []);

  const countryStations = useCallback(async () => {
    try {
      const results: { [key: string]: string | any }[] = await api.searchStations(params);
      setStations(results);
      return results;
    } catch (e) {
      console.log(e);
    }
  }, [params]);

  useEffect(() => {
    countryStations();

    return () => {
      console.log(stations);
    };
  }, []);

  return {
    stations,
    setStations,
  };
};
