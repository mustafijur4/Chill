    const clock = document.getElementById('clock');
    let lastTime = '';

    function createDigit(char) {
      const digit = document.createElement('div');
      digit.className = 'digit';
      const span = document.createElement('span');
      span.textContent = char;
      digit.appendChild(span);
      return digit;
    }

    function updateClock() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const newTime = `${h}:${m}:${s}`;

      if (clock.childNodes.length === 0) {
        // First load
        for (let char of newTime) {
          clock.appendChild(createDigit(char));
        }
      } else {
        // Update only changed digits
        [...newTime].forEach((char, i) => {
          const digitDiv = clock.childNodes[i];
          const currentChar = digitDiv.textContent;

          if (char !== currentChar) {
            // Animate out old digit
            const oldSpan = digitDiv.querySelector('span');
            digitDiv.classList.add('animate');

            setTimeout(() => {
              // Remove old, insert new with animation
              digitDiv.innerHTML = '';
              digitDiv.classList.remove('animate');
              digitDiv.classList.add('new');

              const newSpan = document.createElement('span');
              newSpan.textContent = char;
              digitDiv.appendChild(newSpan);

              requestAnimationFrame(() => {
                digitDiv.classList.remove('new');
              });
            }, 300);
          }
        });
      }

      lastTime = newTime;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial run