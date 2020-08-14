class Main {
  constructor() {
    this.inputWeightEl = '';
    this.inputNameEl = '';
    this.buttonEl = '';

    this.userData = JSON.parse(localStorage.getItem('data_user'));
    this.containerEl = document.querySelector('#app');

    this.getDataFromStorage();
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

    const inputWeight = document.createElement('input');
    inputWeight.setAttribute('placeholder', 'Informe seu Peso');

    const buttonEl = document.createElement('button');
    const textButton = document.createTextNode('Calcular');

    buttonEl.appendChild(textButton);

    this.inputNameEl = inputName;
    this.inputWeightEl = inputWeight;
    this.buttonEl = buttonEl;

    this.containerEl.appendChild(inputName);
    this.containerEl.appendChild(inputWeight);
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
    const textOnTitle = document.createTextNode(`${this.userData.name} Você precisa de ${this.userData.waterNeeded} ml`);

    const inputEl = document.createElement('input');
    inputEl.setAttribute('placeholder', 'Informe quantas ml de água você bebeu');

    const buttonEl = document.createElement('button');
    const textButton = document.createTextNode('Beber água');

    buttonEl.appendChild(textButton);

    title.appendChild(textOnTitle);
    this.containerEl.appendChild(title);
    this.containerEl.appendChild(inputEl);
    this.containerEl.appendChild(buttonEl);

    buttonEl.onclick = () => this.calculate(inputEl.value, title);
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

        this.userData = {
          name: this.inputNameEl.value,
          waterNeeded
        }
        this.saveToStorage();
        this.renderNeededWaterFromUser();

      }

    }
  }

  saveToStorage() {
    localStorage.setItem('data_user', JSON.stringify(this.userData));
  }
}

new Main();