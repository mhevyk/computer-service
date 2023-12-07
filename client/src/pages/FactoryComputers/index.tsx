import { useComputers } from "../../hooks/useComputers";
import { Computer } from "./components/Computer";

export function FactoryComputers() {
  const computers = useComputers();

  return (
    <>
      {computers?.map(computer => (
        <Computer key={computer.computer_id} computer={computer} />
      ))}
    </>
  );
}
