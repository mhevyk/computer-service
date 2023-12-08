import { useComputers } from "../../../features/computers/hooks/useComputers";
import { Computer } from "./components/Computer";

export function FactoryComputersPage() {
  const computers = useComputers();

  return (
    <>
      {computers?.map(computer => (
        <Computer key={computer.computer_id} computer={computer} />
      ))}
    </>
  );
}
