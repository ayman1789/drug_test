document.getElementById('interactionForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const apiKey = document.getElementById('apiKey').value;
    const firstDrug = document.getElementById('firstDrug').value;
    const secondDrug = document.getElementById('secondDrug').value;

    const url = 'https://api.groq.com/openai/v1';
    const model = 'llama-3.1-70b-versatile';

    const data = {
        model: model,
        prompt: `Check interaction between ${firstDrug} and ${secondDrug} using ${apiKey}. Check sources: LactMed Database, AAP, WHO, Drugs.com, EMA, The Royal Women’s Hospital Clinical Guidelines.`,
        max_tokens: 500
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.choices && result.choices.length > 0) {
            document.getElementById('conclusion').textContent = result.choices[0].text;
        } else {
            throw new Error('Invalid response structure');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('conclusion').textContent = 'An error occurred: ' + error.message;
    });
});
