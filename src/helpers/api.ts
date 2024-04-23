type QueryParams = { [key: string]: string | number | boolean; };
type BodyParams = { [key: string]: any; };

const baseUrl = 'http://localhost:5093/';

export async function GET(url: string, jwt: string | null) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
    };

    try {
        const res = await fetch(baseUrl + url, requestOptions);
        const data = await res.json();
        return data;
    } catch (error) {
        alert(error);
        return error;
    }
}

export function POST(url: string, body: BodyParams, jwt: string | null) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(body)
    };
}

export function DELETE(body: string, jwt: string | null) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
    };
}