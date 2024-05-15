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
        Car.availableAt >=
          new Date(this.dateInput.value + "T" + this.timeInput.value) &&
        (this.seatInput.value === undefined
          ? true
          : Car.capacity >= this.seatInput.value) &&
        Car.driverType === this.driverInput.value
      );
    });
    Car.init(cars);
  }

  clear = () => {
    this.carContainerElement.innerHTML = "";
  };
}
