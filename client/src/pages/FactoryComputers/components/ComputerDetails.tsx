import { useParams } from "react-router-dom";
import { useComputer } from "../../../hooks/useComputer";
import { formatDate } from "../../../utils/formatDate";
import { ComputerComponents } from "./ComputerComponents";
import { Button } from "../../../components/ui/Button";
import { useCart } from "../../../context/CartContext/useCart";

export function ComputerDetails() {
  const { computerId } = useParams();
  const { addToCart } = useCart();

  if (!computerId) {
    throw new Error("Computer id is not specified!");
  }

  const computer = useComputer(Number(computerId));

  return (
    computer && (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>Характеристика</th>
              <th>Значення</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Назва</td>
              <td>{computer.name}</td>
            </tr>
            <tr>
              <td>Модель</td>
              <td>{computer.brand}</td>
            </tr>
            <tr>
              <td>Дата випуску</td>
              <td>{formatDate(new Date(computer.release_date))}</td>
            </tr>
            <tr>
              <td>Ціна (грн)</td>
              <td>{computer.price}</td>
            </tr>
            <tr>
              <td>Фабрична модель</td>
              <td>{computer.is_custom ? "Ні" : "Так"}</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "top" }}>Компоненти</td>
              <td>
                <ComputerComponents components={computer.components} />
              </td>
            </tr>
          </tbody>
        </table>
        <Button variant="accent" onClick={() => addToCart(computer)}>
          Додати у кошик
        </Button>
      </>
    )
  );
}
