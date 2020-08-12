class Main {
  constructor() {
    this.inputWeightEl = '';
    this.inputNameEl = '';
    this.buttonEl = '';

    this.dataUser = JSON.parse(localStorage.getItem('data_user'));
    this.containerEl = document.querySelector('#app');

    this.getDataFromStorage();
  }

  getDataFromStorage() {
    if (!this.dataUser) {
      this.renderInputsFromUser();
      this.calculate();
    } else {
      this.renderNeededWaterFromUser();
    }

  }

  renderInputsFromUser() {
    const inputName = document.createElement('input');
    const inputWeight = document.createElement('input');
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
    if (this.inputWeightEl.value && this.inputNameEl.value) {
      this.inputWeightEl.remove();
      this.inputNameEl.remove();
      this.buttonEl.remove();
    }

    const title = document.createElement('h1');
    const textOnTitle = document.createTextNode(`Você precisa de ${this.dataUser.waterNeeded} ml por dia`);

    const inputEl = document.createElement('input');
    const buttonEl = document.createElement('button');
    const textButton = document.createTextNode('Beber água');

    buttonEl.appendChild(textButton);

    title.appendChild(textOnTitle);
    this.containerEl.appendChild(title);
    this.containerEl.appendChild(inputEl);
    this.containerEl.appendChild(buttonEl);

  }

  calculate() {
    this.buttonEl.onclick = () => {

      if (!this.inputWeightEl.value && this.inputNameEl.value) {
        return;

      } else {

        const weight = this.inputWeightEl.value;
        const waterNeeded = 35 * weight;

        this.dataUser = {
          name: this.inputNameEl.value,
          waterNeeded
        }
        this.saveToStorage();
        this.renderNeededWaterFromUser();

      }

    }
  }

  saveToStorage() {
    localStorage.setItem('data_user', JSON.stringify(this.dataUser));
  }
}

//O cálculo é dado pela seguinte fórmula matemática e vale para ambos os sexos: 35 ml X peso corporal (em kg)

new Main();