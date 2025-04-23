    async function startTesting() {
      while (true) {
        const code = Math.floor(10000 + Math.random() * 90000).toString();
        const payload = JSON.stringify({ code });

        try {
          const response = await fetch('https://www.gimkit.com/api/matchmaker/find-info-from-code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Connection': 'keep-alive',
            },
            body: payload
          });

          if (response.status !== 500 && response.status !== 429) {
            console.log(` Valid code found: ${code}`);
            console.log(` Redirecting...`);
            window.location.href = `https://www.gimkit.com/join?gc=${code}`;
            break;
          } else if (response.status == 500)  {
            console.log(` Code ${code} returned 500`);
          } else if (response.status == 429) {
            console.log(` API request limit reached. Try again in a few minutes.`);
            break;
          }

        } catch (err) {
          console.error(` Error trying code ${code}: ${err.message}`);
        }
      }
    }
startTesting();
