class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
    driverType,
  }) {
    super();

    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
    this.driverType = driverType;
  }

  render() {
    return `
    
    <div class="card filter-car-content">
        <img src="${this.image}" class="card-img-top car-img" alt="${this.manufacture}"/>
        <div class="card-body">
          <h6 class="card-text">${this.manufacture} ${this.model} / ${this.type}</h6>
          <h5 class="card-title">Rp. ${this.rentPerDay} / hari</h5>
          <p class="card-text">${this.description}</p>
          <p class="card-text"><span class="fa-solid fa-users"></span> ${this.capacity} Orang</p>
          <p class="card-text"><span class="fa-solid fa-gear"></span> ${this.transmission}</p>
          <p class="card-text"><span class="fa-regular fa-calendar"></span> Tahun ${this.year}</p>
          <div class="button d-flex align-items-end">
            <a href="#" class="btn filter-car-btn bg--lime-green-04">Pilih Mobil</a>
          </div>
        </div>
      </div>
    `;
  }
}
