# SYNERGY 7 Challange Chapter 5
Nama: Muhammad Ariyanta Triputro <br />
Kelas: FSW 4

## List Endpoints
| API Endpoint      | Method | Deskripsi                        |
| ----------------- | ------ | -------------------------------- |
| `/api/cars`       | GET    | Menampilkan seluruh data mobil   |
| `/api/cars/:id`   | GET    | Menampilkan data mobil sesuai ID |
| `/api/cars`       | POST   | Menambahkan data mobil baru      |
| `/api/cars/:id`   | PUT    | Mengubah data mobil sesuai ID    |
| `/api/cars/:id`   | DELETE | Menghapus data mobil sesuai ID   |

## Contoh Hasil

- **1. Menampilkan seluruh data mobil**

   - **Request**
     - Endpoint : `api/cars`
     - Method   : `GET`
 
   - **Response**
  ```json
    {
        "id": 2,
        "car_name": "Chevrolet Corvette ZR1 2019",
        "price": 3000000,
        "image": null,
        "start_rent": "2023-10-12T17:00:00.000Z",
        "finish_rent": "2023-10-31T17:00:00.000Z"
    },
    {
        "id": 3,
        "car_name": "Audi R8 V8 2018",
        "price": 5000000,
        "image": null,
        "start_rent": "2023-11-26T17:00:00.000Z",
        "finish_rent": "2024-01-31T17:00:00.000Z"
    },
    {
        "id": 4,
        "car_name": "Honda NSX Type s 2020",
        "price": 8000000,
        "image": "http://res.cloudinary.com/dl1a3nua4/image/upload/v1718019883/rmmhfk97inoqeaxdjbka.jpg",
        "start_rent": "2023-12-13T17:00:00.000Z",
        "finish_rent": "2024-02-03T17:00:00.000Z"
    },
    {
        "id": 1,
        "car_name": "Mitsubishi Lancer Evo X 2017",
        "price": 4000000,
        "image": "http://res.cloudinary.com/dl1a3nua4/image/upload/v1718027735/zrjdmn9ugyqv1hnyiljn.jpg",
        "start_rent": "2023-11-02T17:00:00.000Z",
        "finish_rent": "2023-12-31T17:00:00.000Z"
    }
  ```
- **2. Menampilkan data mobil sesuai ID**

   - **Request**
     - Endpoint : `api/cars/2`
     - Method   : `GET`
 
   - **Response**
  ```json
  {
    "id": 2,
    "car_name": "Chevrolet Corvette ZR1 2019",
    "price": 3000000,
    "image": null,
    "start_rent": "2023-10-12T17:00:00.000Z",
    "finish_rent": "2023-10-31T17:00:00.000Z"
  }
  ```
- **3. Menambahkan data mobil baru**

   - **Request**
     - Endpoint : `api/cars`
     - Method   : `POST`
     - Body     :
         | Key             | Value                 |
         | --------------- | --------------------- |
         | car_name        | Nissan GTR Nismo 2017 |
         | price           | 5000000               |
         | image           | file: nissangtr.jpg   |
         | start_rent      | 2023-09-11            |
         | finish_rent     | 2023-10-13            |
 
   - **Response**
  ```json
  {
      "car_name": "Nissan GTR Nismo 2017",
      "price": 5000000,
      "start_rent": "2023-09-10T17:00:00.000Z",
      "finish_rent": "2023-10-12T17:00:00.000Z",
      "image": "http://res.cloudinary.com/dl1a3nua4/image/upload/v1718031164/dzeyx6ab7rynxhhigqoh.jpg",
      "id": 5
  }
  ```
- **4. Mengubah data mobil sesuai ID**

   - **Request**
     - Endpoint : `api/cars/3`
     - Method   : `PUT`
     - Body     :
         | Key             | Value                 |
         | --------------- | --------------------- |
         | image           | file: Audi R8.jpg     |
 
   - **Response**
  **Sebelum Update**
  ```json
  {
        "id": 3,
        "car_name": "Audi R8 V8 2018",
        "price": 5000000,
        "image": null,
        "start_rent": "2023-11-26T17:00:00.000Z",
        "finish_rent": "2024-01-31T17:00:00.000Z"
    }
  ```
  **Setelah Update**
  ```json
  Data berhasil di update
  {
    "id": 3,
    "car_name": "Audi R8 V8 2018",
    "price": 5000000,
    "image": "http://res.cloudinary.com/dl1a3nua4/image/upload/v1718031296/ljyvharb7xhapprgylvb.jpg",
    "start_rent": "2023-11-26T17:00:00.000Z",
    "finish_rent": "2024-01-31T17:00:00.000Z"
  }
  ```
- **5. Mengahapus data mobil sesuai ID**

   - **Request**
     - Endpoint : `api/cars/5`
     - Method   : `DELETE`
 
   - **Response**
  **Sebelum Delete**
  ```json
  [
    {
        "id": 2,
        "car_name": "Chevrolet Corvette ZR1 2019",
        "price": 3000000,
        "image": null,
        "start_rent": "2023-10-12T17:00:00.000Z",
        "finish_rent": "2023-10-31T17:00:00.000Z"
    },
    {
        "id": 4,
        "car_name": "Honda NSX Type s 2020",
        "price": 8000000,
        "image": "http://res.cloudinary.com/dl1a3nua4/image/upload/v1718019883/rmmhfk97inoqeaxdjbka.jpg",
        "start_rent": "2023-12-13T17:00:00.000Z",
        "finish_rent": "2024-02-03T17:00:00.000Z"
    },
    {
        "id": 1,
        "car_name": "Mitsubishi Lancer Evo X 2017",
        "price": 4000000,
        "image": "http://res.cloudinary.com/dl1a3nua4/image/upload/v1718027735/zrjdmn9ugyqv1hnyiljn.jpg",
        "start_rent": "2023-11-02T17:00:00.000Z",
        "finish_rent": "2023-12-31T17:00:00.000Z"
    },
    {
        "id": 5,
        "car_name": "Nissan GTR Nismo 2017",
        "price": 5000000,
        "image": "http://res.cloudinary.com/dl1a3nua4/image/upload/v1718031164/dzeyx6ab7rynxhhigqoh.jpg",
        "start_rent": "2023-09-10T17:00:00.000Z",
        "finish_rent": "2023-10-12T17:00:00.000Z"
    },
    {
        "id": 3,
        "car_name": "Audi R8 V8 2018",
        "price": 5000000,
        "image": "http://res.cloudinary.com/dl1a3nua4/image/upload/v1718031296/ljyvharb7xhapprgylvb.jpg",
        "start_rent": "2023-11-26T17:00:00.000Z",
        "finish_rent": "2024-01-31T17:00:00.000Z"
    }
  ]
  ```
  **Setelah Delete**
  ```json
  Data berhasil di hapus

  [
    {
        "id": 2,
        "car_name": "Chevrolet Corvette ZR1 2019",
        "price": 3000000,
        "image": null,
        "start_rent": "2023-10-12T17:00:00.000Z",
        "finish_rent": "2023-10-31T17:00:00.000Z"
    },
    {
        "id": 4,
        "car_name": "Honda NSX Type s 2020",
        "price": 8000000,
        "image": "http://res.cloudinary.com/dl1a3nua4/image/upload/v1718019883/rmmhfk97inoqeaxdjbka.jpg",
        "start_rent": "2023-12-13T17:00:00.000Z",
        "finish_rent": "2024-02-03T17:00:00.000Z"
    },
    {
        "id": 1,
        "car_name": "Mitsubishi Lancer Evo X 2017",
        "price": 4000000,
        "image": "http://res.cloudinary.com/dl1a3nua4/image/upload/v1718027735/zrjdmn9ugyqv1hnyiljn.jpg",
        "start_rent": "2023-11-02T17:00:00.000Z",
        "finish_rent": "2023-12-31T17:00:00.000Z"
    },
    {
        "id": 3,
        "car_name": "Audi R8 V8 2018",
        "price": 5000000,
        "image": "http://res.cloudinary.com/dl1a3nua4/image/upload/v1718031296/ljyvharb7xhapprgylvb.jpg",
        "start_rent": "2023-11-26T17:00:00.000Z",
        "finish_rent": "2024-01-31T17:00:00.000Z"
    }
  ]
  ```

### Entity Relationship Diagram (ERD)

![ERD](public/uploads/images/ERD_Challenge 5.png)
  
