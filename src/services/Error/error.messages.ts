export const errorMessages = (error: any, isForUI = false): string => {
    if (error.response) {
        const { status, statusText, config } = error.response;
        console.error('API Error:', {
            status,
            statusText,
            url: config?.url,
            data: error.response.data,
        });
        return isForUI
            ? 'Something went wrong. Please try again later.'
            : `API Error: ${status} ${statusText}`;
    } else if (error.request) {
        console.error('Network Error:', error.message);
        return isForUI
            ? 'Unable to connect to the server. Please check your internet connection.'
            : 'Network Error: Unable to fetch data.';
    } else {
        console.error('Unexpected Error:', error.message);
        return isForUI
            ? 'An unexpected error occurred. Please try again.'
            : 'Unexpected Error occurred.';
    }
};