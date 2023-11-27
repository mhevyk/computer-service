export function ComputersPage() {
  return (
    <div className="flex flex-col w-full lg:flex-row">
      <div className="grid flex-grow h-48 card bg-base-300 rounded-box place-items-center">
        Готові моделі
      </div>
      <div className="divider lg:divider-horizontal">АБО</div>
      <div className="grid flex-grow h-48 card bg-base-300 rounded-box place-items-center">
        Скласти самостійно
      </div>
    </div>
  );
}
