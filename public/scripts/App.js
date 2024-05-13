class App {
  constructor() {
    this.driverInput = document.querySelector("#drivers");
    this.dateInput = document.querySelector("#rent-time");
    this.timeInput = document.querySelector("#waktu");
    this.seatInput = document.querySelector("#penumpang");
    this.filterbtn = document.querySelector("#filter-btn");
    this.carContainerElement = document.getElementById("carContainer");
  }

  async init() {
    await this.load();
    this.updateFilter();
  }

  run = () => {
    console.log("App is Running");

    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add("col-md-6", "col-lg-4");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars(() => {
      return (
        car.availableAt >=
          new Date(this.dateInput.value + "T" + this.timeInput.value) &&
        (this.passengerInput.value === undefined
          ? true
          : car.capacity >= this.passengerInput.value) &&
        car.driverType === this.driverInput.value
      );
    });
    Car.init(cars);
  }
  updateFilter = () => {
    const driver = this.driverInput.value;
    const date = this.dateInput.value;
    const time = this.timeInput.value;

    if (driver && date && time) {
      this.filterbtn.removeAttribute("disabled");
    } else {
      this.filterbtn.setAttribute("disabled", true);
    }
  };

  handleFilterBtnClick = () => {
    if (
      this.driverInput.value &&
      this.dateInput.value &&
      this.timeInput.value
    ) {
      this.filterbtn.classList.remove("btn-success");
      this.filterbtn.classList.add("btn-outline-primary");
      this.filterbtn.textContent = "Edit";

      this.clear();
      this.init().then(this.run);
    }
  };

  clear = () => {
    this.carContainerElement.innerHTML = "";
  };
}
