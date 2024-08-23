import { useEffect, useState } from "react";
/*
 * Important is that it should be a function that starts with "use" because that's a convention.
 
 * Basically a rule in React projects that functions that start with use are treated as hooks
   and React projects typically look for functions that start with use and enforce certain rules on such functions.

 * That's why your custom hook function also must start with use so that those rules are also enforced on this function.
   And these rules are important because without them, if using hooks in the wrong place, your applications could 
   break or behave incorrectly.  
*/
export function useFetch(fetchfn,initialValue) {
    const [isDataFetching, setDataFetching] = useState(false);
  
    const [error, setError] = useState();

    const [fetchedData, setFetchedData] =  useState(initialValue);
   
    useEffect(() => {
        async function fetchData() {
          setDataFetching(true);
          try {
            const data = await fetchfn(); //api call to backend
            setFetchedData(data);
          } catch (error) {
            setError({message:error.message || 'Failed to fetch data.'});
          }
          setDataFetching(false);
        }
        fetchData();
      }, [fetchfn]); /* 
                        Reason we added dependency because that's some external data
                        which is not defined inside of useEffect and which theoretically could change.
                        And if it would change, this effect should be executed again so that we're fetching 
                        data correctly based on the latest available fetch function.
                        Therefore, fetchFn should be added as a dependency here.   
                    */

      return { isDataFetching, error, fetchedData, setFetchedData };                  
}