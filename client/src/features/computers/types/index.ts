export type Component = {
  component_id: number;
  manufactorer_id: number;
  computer_id: number;
  processor_id: number | null;
  motherboard_id: number | null;
  memory_id: number | null;
  videocard_id: number | null;
  power_supply_id: number | null;
  price_per_unit: number;
  quantity: number;
};

export type Computer = {
  computer_id: number;
  name: string;
  brand: string;
  is_custom: boolean;
  release_date: string;
  price: number;
  components: Component[];
};
