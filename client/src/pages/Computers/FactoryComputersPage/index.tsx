import { useComputers } from "@computers/hooks/useComputers";
import { Computer } from "./components/Computer";

export function FactoryComputersPage() {
  const computers = useComputers();

  return (
    <>
      {computers && computers.length > 0 ? (
        computers?.map((computer) => (
          <Computer key={computer.computer_id} computer={computer} />
        ))
      ) : (
        <div className="px-2">
          <div className="divider">Доступних комп'ютерів поки що немає</div>
        </div>
      )}
    </>
  );
}
