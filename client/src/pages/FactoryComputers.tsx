import { useComputers } from "../hooks/useComputers";

export function FactoryComputers() {
  const computers = useComputers();

  const factoryComputers = computers?.filter(computer => !computer.is_custom);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Модель</th>
            <th>Дата випуску</th>
          </tr>
        </thead>
        <tbody>
          {factoryComputers?.map(computer => (
            <tr key={computer.computer_id}>
              <td>{computer.name}</td>
              <td>{computer.brand}</td>
              <td>{computer.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
