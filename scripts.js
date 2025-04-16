const startButton = document.querySelector(".start-btn");
      const beginingField = document.querySelector(".beginning-div");
      const gameField = document.querySelector(".game-field");
      const scoreText = document.querySelector(".score");
      const stopButton = document.querySelector(".stop");
      const holesWrapper = document.getElementById("holes-wrapper");

      let gameInterval;
      let currentVisibleMole = null;
      let gameRunning = false;
      let scoreCount = 0;

      // Generate 9 holes and moles
      for (let i = 0; i < 9; i++) {
        const hole = document.createElement("img");
        hole.src = "hole3.png";
        hole.className = "holes hole" + (i + 1);
        hole.style.top = `${350 + Math.floor(i / 3) * 70}px`;
        hole.style.left = `${700 + (i % 3) * 120}px`;

        const mole = document.createElement("img");
        mole.src = "mole1.png";
        mole.className = "moles mole" + (i + 1);
        mole.style.top = `${340 + Math.floor(i / 3) * 70}px`;
        mole.style.left = `${730 + (i % 3) * 120}px`;

        holesWrapper.appendChild(hole);
        holesWrapper.appendChild(mole);
      }

      const holes = document.querySelectorAll(".holes");
      const moles = document.querySelectorAll(".moles");

      startButton.addEventListener("click", () => {
        beginingField.style.display = "none";
        holes.forEach((hole) => (hole.style.display = "block"));
        moles.forEach((mole) => (mole.style.display = "none"));
        gameField.style.display = "block";
        scoreCount = 0;
        scoreText.textContent = `Score: ${scoreCount}`;
        gameRunning = true;

        gameInterval = setInterval(() => {
          if (!gameRunning) return;

          if (currentVisibleMole) {
            currentVisibleMole.style.display = "none";
          }

          const randomIndex = Math.floor(Math.random() * moles.length);
          currentVisibleMole = moles[randomIndex];
          currentVisibleMole.style.display = "block";

          currentVisibleMole.classList.add("pop");
          currentVisibleMole.addEventListener("animationend", () => {
            currentVisibleMole.classList.remove("pop");
          }, { once: true });

          setTimeout(() => {
            if (currentVisibleMole) currentVisibleMole.style.display = "none";
          }, 1000);
        }, 1200);
      });

      moles.forEach((mole) => {
        mole.addEventListener("click", () => {
          if (mole.style.display === "block") {
            mole.style.display = "none";
            scoreCount++;
            scoreText.textContent = `Score: ${scoreCount}`;
          }
        });
      });

      stopButton.addEventListener("click", () => {
        holes.forEach((hole) => (hole.style.display = "none"));
        moles.forEach((mole) => (mole.style.display = "none"));
        gameField.style.display = "none";
        beginingField.style.display = "block";
        gameRunning = false;
        clearInterval(gameInterval);

        const currentScoreDisplay = document.querySelector(".current-score");
        currentScoreDisplay.textContent = `Best Score: ${scoreCount}`;
      });
