class Main {
  constructor() {
    this.inputWeightEl = '';
    this.inputNameEl = '';
    this.inputTime = 0;
    this.buttonEl = '';

    this.userData = JSON.parse(localStorage.getItem('data_user'));
    this.containerEl = document.querySelector('#app');

    this.renderLoading();

    setTimeout(() => {
      this.getDataFromStorage();
    }, 3000);

    this.notification();

  }

  getDataFromStorage() {
    if (!this.userData) {
      this.renderInputsFromUser();
      this.calculateNeededWater();
    } else {
      this.renderNeededWaterFromUser();
    }
  }

  renderInputsFromUser() {
    this.containerEl.innerHTML = '';

    const inputName = document.createElement('input');
    inputName.setAttribute('placeholder', 'Informe seu Nome');

    const containerForInputs = document.createElement('div');
    containerForInputs.setAttribute('class', 'container-for-inputs');

    const inputWeight = document.createElement('input');
    inputWeight.setAttribute('placeholder', 'Informe seu Peso');

    const inputTime = document.createElement('input');
    inputTime.setAttribute('placeholder', 'Minutos para ser notificado');

    const buttonEl = document.createElement('button');
    const textButton = document.createTextNode('Calcular');

    buttonEl.appendChild(textButton);

    this.inputNameEl = inputName;
    this.inputWeightEl = inputWeight;
    this.inputTime = inputTime;
    this.buttonEl = buttonEl;

    this.containerEl.appendChild(inputName);
    containerForInputs.appendChild(inputWeight);
    containerForInputs.appendChild(inputTime);
    this.containerEl.appendChild(containerForInputs);
    this.containerEl.appendChild(buttonEl);
  }

  renderNeededWaterFromUser() {
    this.containerEl.innerHTML = '';

    if (this.inputWeightEl.value && this.inputNameEl.value) {
      this.inputWeightEl.remove();
      this.inputNameEl.remove();
      this.buttonEl.remove();
    }

    const title = document.createElement('h1');
    const textOnTitle = document.createTextNode(`${this.userData.name} Você precisa beber ${this.userData.waterNeeded} ml de água para completar sua meta diária`);

    const inputEl = document.createElement('input');
    inputEl.setAttribute('placeholder', 'Informe quantas ml de água você bebeu');

    const containerForButtons = document.createElement('div');
    containerForButtons.setAttribute('class', 'container-for-buttons');

    const buttonEl = document.createElement('button');
    const textButton = document.createTextNode('Beber água');

    const restartButton = document.createElement('button');
    const textRestartButton = document.createTextNode('Reiniciar');

    buttonEl.appendChild(textButton);
    restartButton.appendChild(textRestartButton);

    title.appendChild(textOnTitle);
    this.containerEl.appendChild(title);
    this.containerEl.appendChild(inputEl);
    containerForButtons.appendChild(buttonEl);
    containerForButtons.appendChild(restartButton);
    this.containerEl.appendChild(containerForButtons);

    buttonEl.onclick = () => this.calculate(inputEl.value, title);
    restartButton.onclick = () => this.restart();

    setInterval(this.waterNotification, this.userData.timer);
  }

  calculate(water = 0) {
    const waterNeeded = this.userData.waterNeeded - water;

    this.userData.waterNeeded = waterNeeded;

    if (waterNeeded <= 0) {
      this.userData.waterNeeded = 0;
    }


    this.saveToStorage();
    this.renderNeededWaterFromUser();
  }

  calculateNeededWater() {
    this.buttonEl.onclick = () => {

      if (!this.inputWeightEl.value && this.inputNameEl.value) {
        return;

      } else {

        const weight = this.inputWeightEl.value;
        const waterNeeded = 35 * weight;
        const timer = this.inputTime.value * 60000;

        this.userData = {
          name: this.inputNameEl.value,
          waterNeeded,
          dailyWaterNeeded: waterNeeded,
          timer,
        }
        this.saveToStorage();
        
        this.renderLoading();

        setTimeout(() => {
          this.renderNeededWaterFromUser();
        }, 3000);
      }
    }
  }

  restart() {
    this.userData.waterNeeded = this.userData.dailyWaterNeeded;
    this.saveToStorage();
    this.renderNeededWaterFromUser();
  }

  notification() {
    document.addEventListener('DOMContentLoaded', () => {
      if (!Notification) {
        alert('Desktop notification');
        return;
      }
      if (Notification.permission !== 'grated') {
        Notification.requestPermission();
      }
    });
  }

  waterNotification() {
    const notification = new Notification('Beber água', {
      icon: "http://127.0.0.1:8080/assets/images/cup.png",
      body: "Beber água"
    });

    notification.onclick = window.href = "http://127.0.0.1:8080/index.html";
  }

  saveToStorage() {
    localStorage.setItem('data_user', JSON.stringify(this.userData));
  }

   renderLoading() {
    this.containerEl.innerHTML = '';
    
    const loading = document.createElement('div');
    loading.setAttribute('class', 'spinner');

    this.containerEl.appendChild(loading);

  }
}


new Main();