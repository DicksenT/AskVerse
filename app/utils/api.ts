export const apiFetch = async<T>(
    url: string,
    method: "GET" | "POST" | 'DELETE' | 'PATCH',
    dispatchFn: Function,
    dispatch: Function, 
    body?: any,
    transformFn?: (data: any) => T 
): Promise<T | null>=>{
    try{
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: body ? JSON.stringify(body) : undefined 
        })
        if(!response.ok) throw new Error(`HTTP ERROR: ${response.status}`)
        const json = await response.json()
        const finalData = transformFn ? transformFn(json) : json
        dispatch(dispatchFn(finalData))
        return finalData.id    
    }catch(error){
        console.error('Fetch error: ', error)
        return null
    }
}