const fetch = require('node-fetch'); // wait node 18 has native fetch

async function testCobalt() {
  const res = await fetch('https://co.wuk.sh/api/json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isAudioOnly: true
    })
  });
  const data = await res.json();
  console.log(data);
}
testCobalt();
