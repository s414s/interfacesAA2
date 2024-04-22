type QueryParams = { [key: string]: string | number | boolean; };
type BodyParams = { [key: string]: string | number | boolean; };

const baseUrl = 'http://localhost:5093/';

export function GET(url: string, jwt: string | null) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
    };

    return fetch(baseUrl + url, requestOptions)
        .then(res => res.json())
        .then(data => data)
        .catch(error => error);
}

export function POST(body: BodyParams, jwt?: string | null) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(body)
    };
}

export function DELETE(body: string, jwt?: string | null) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
    };
}