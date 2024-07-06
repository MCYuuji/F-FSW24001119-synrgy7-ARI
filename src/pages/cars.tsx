import { useState, useEffect } from 'react';

interface ICars {
    data: [{
        id: number;
        car_name: string;
        price: number;
        image: string;
        start_rent: Date;
        finish_rent: Date;
    }]
    count: number
}

export default function Cars() {
  const [result, setResult] = useState<ICars>()

  useEffect(() => {
    let ignore = false;

    const getCars = async () => {
        const res = await fetch("http://localhost:8000/api/v1/cars")
        const data = await res.json()
        console.log(data)
        setResult(data)
    }

    if(!ignore) getCars();

    return () => {
        ignore = true;
    };
  }, []);

  return (
    <div style={{ marginTop: "100px" }}>
      <h1>Cars</h1>
      <table>
        <thead>
            <tr>
                <th>id</th>
                <th>Car</th>
                <th>Price</th>
                <th>Image</th>
                <th>Start rent</th>
                <th>Finish rent</th>
            </tr>
        </thead>
        <tbody>
            {
                result?.data ? result.data.map((el:any) => (
                    <tr>
                        <td>{el.id}</td>
                        <td>{el.car_name}</td>
                        <td>{el.price}</td>
                        <td><img src={el.image} alt=""/></td>
                        <td>{el.start_rent}</td>
                        <td>{el.finish_rent}</td>
                    </tr>
                )) : (
                    <tr>
                        <td>no data</td>
                    </tr>
                )
            }
        </tbody>
      </table>
    </div>
  );
}