const API_URL = 'https://ve.dolarapi.com/v1/dolares/oficial';


const getTasaCambio = async (): Promise<number> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.promedio;
    } catch (error) {
        console.error('Error fetching tasa de cambio:', error);
        throw error;
    }
};

export { getTasaCambio };