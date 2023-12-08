import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode } from "react";
import { Component } from "../../../../features/computers/types";

type ComponentTypeDetails = {
  name: string;
  icon: ReactNode;
};

const map = new Map([
  [
    "memory_id",
    {
      name: "Пам'ять",
      icon: <Icon icon="material-symbols:memory" />,
    },
  ],
  [
    "motherboard_id",
    {
      name: "Материнська плата",
      icon: <Icon icon="bi:motherboard" />,
    },
  ],
  [
    "power_supply_id",
    {
      name: "Блок живлення",
      icon: <Icon icon="ph:power-bold" />,
    },
  ],
  // TODO: add rest components
]);

function getComponentType(component: Component) {
  for (const key of map.keys()) {
    if (component[key as keyof typeof component]) {
      return map.get(key) as ComponentTypeDetails;
    }
  }

  return { name: "Невідомий тип", icon: <Icon icon="fluent-mdl2:unknown" /> };
}

type ComputerComponentsProps = {
  components: Component[];
};

function ComputerComponent({ component }: { component: Component }) {
  const componentTypeDetails = getComponentType(component);

  console.log(componentTypeDetails);

  return (
    <li
      key={component.component_id}
      className="flex gap-4 items-center h-10 mb-2"
    >
      {componentTypeDetails.icon}
      {componentTypeDetails.name}, {component.quantity} шт, по{" "}
      {component.price_per_unit} грн
    </li>
  );
}

export function ComputerComponents({ components }: ComputerComponentsProps) {
  return (
    <ol>
      {components.map(component => (
        <ComputerComponent key={component.component_id} component={component} />
      ))}
    </ol>
  );
}
