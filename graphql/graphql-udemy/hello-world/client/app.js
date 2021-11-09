const GRAPHQL_URL = 'http://localhost:9000/';

async function fetchGreetings() {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query {
                    greeting
                  }
            `
        })
    });
    const {data} = await response.json();
    return data;
}

fetchGreetings().then(({greeting}) => {
    const title = document.querySelector('h1');
    title.textContent = greeting;
});