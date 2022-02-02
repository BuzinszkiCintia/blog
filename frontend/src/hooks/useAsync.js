import { useEffect, useState } from "react";

const useAsync = (fn) => {
  //paramétere egy function =fn
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // itt most azért true mert a rendzer alapállapota a töltés

  useEffect(() => {
    //amit átadok a useeffectnek azt sose tegyük asyncronná
    fn().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [fn]); //condition array: akkor fut le a useeffect hogyha ez ami a szögletes zárójelbe van megváltozik, de mivel ez egy function ami egy összetett dolog(így nem tudja összehaosnlítani), ezért a memóriacímét nézi meg. Röviden összetett típusoknál nem az értékét hanem a memóricímét nézi, ezért nem fut többször le a useeffect.
  return [data, loading];
};

export default useAsync;
