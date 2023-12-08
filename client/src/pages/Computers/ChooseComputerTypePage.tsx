import { ComponentProps } from "react";
import { Link } from "react-router-dom";

type ImageLinkProps = {
  imageURL: string;
  to: string;
} & ComponentProps<"div">;

function ImageLink({ to, imageURL, children }: ImageLinkProps) {
  return (
    <Link to={to} className="block relative">
      <img
        src={imageURL}
        className="w-full h-64 object-cover rounded-md hover:filter grayscale brightness-[15%] hover:brightness-[20%] transition-all duration-500"
        style={{ aspectRatio: "16/9" }}
      />
      <span className="absolute top-1/2 right-1/2 translate-x-1/2 text-white text-xl pointer-events-none">
        {children}
      </span>
    </Link>
  );
}

export function ChooseComputerTypePage() {
  return (
    <div className="flex flex-col justify-center lg:flex-row">
      <div>
        <ImageLink
          to="factory"
          imageURL={"/assets/factory.jpg"}
          className="grid card rounded-box place-items-center h-56 hover:opacity-50 transition-all"
        >
          Готові моделі
        </ImageLink>
        <div className="text-center py-4">
          Вибирайте цей пункт, якщо хочете вибрати одну з готових моделей
          комп’ютерів
        </div>
      </div>
      <div className="divider lg:divider-horizontal lg:!h-56">АБО</div>
      <div>
        <ImageLink
          to="custom"
          imageURL={"/assets/custom.webp"}
          className="grid card rounded-box place-items-center h-56  hover:opacity-50 transition-all"
        >
          Скласти самостійно
        </ImageLink>
        <div className="text-center py-4">
          Вибирайте цей пункт, якщо хочете налаштувати свою власну конфігурацію
          комп’ютера
        </div>
      </div>
    </div>
  );
}
