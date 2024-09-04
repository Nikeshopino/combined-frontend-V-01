import React from 'react';
import "./PriceTable.css";
function MobileOrderBook({maxQuantity , color ,data ,type}) {  
  return (
    <>
    <table className="price-table w-full mr-4  ">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>
                    Qty at <span style={{ color: color }}>{type}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.price}</td>
                    <td className="bar-cell">
                      <div
                        className="bar"
                        style={{
                          width: `${(row.quantity / maxQuantity) * 100}%`,
                          backgroundColor: color,
                        }}
                      ></div>
                      <span className="qty-text">{row.quantity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
    </>
  )
}

export default MobileOrderBook