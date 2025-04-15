export const apiFetch = async <T = unknown, R = T>(
    url: string,
    method: "GET" | "POST" | "DELETE" | "PATCH",
    body?: T,
    transformFn?: (data: unknown) => R
  ): Promise<R | null> => {
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
  
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "failed to fetch");
      }
  
      const { data } = await response.json();
      return transformFn ? transformFn(data) : (data as R);
    } catch (error) {
      console.error("Fetch error: ", error);
      return null;
    }
  };
  
  export const getFetch = async <T>(
    url: string,
    transformFn?: (data: T) => T
  ): Promise<Record<string, T> | null> => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "failed to fetch");
      }
  
      const { data } = await res.json();
      const changedData = data.reduce((acc: Record<string, T>, val: T) => {
        const result = transformFn ? transformFn(val) : val;
        acc[(result as any)._id] = result; // We can't avoid any here without a defined interface
        return acc;
      }, {} as Record<string, T>);
  
      return changedData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  