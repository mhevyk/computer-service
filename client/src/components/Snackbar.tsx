import { forwardRef } from "react";
import { Icon } from "@iconify/react";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";

export const ErrorSnackbar = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ message }, ref) => {
    const { closeSnackbar } = useSnackbar();

    return (
      <SnackbarContent
        ref={ref}
        role="alert"
        className="alert alert-error flex items-center text-white p-4 rounded-md shadow-md"
      >
        <Icon
          icon="prime:times"
          onClick={() => closeSnackbar()}
          className="cursor-pointer mr-4"
        />

        <div className="flex items-center">
          <Icon icon="material-symbols:error" className="mr-2" />
          <span>{message}</span>
        </div>
      </SnackbarContent>
    );
  }
);

// export function Snackbar({ id, message, ref }: CustomContentProps) {
//   const { closeSnackbar } = useSnackbar();
//   const handleCloseSnackbar = () => closeSnackbar(id);

//   return (
//     <SnackbarContent ref={ref}>
//       <div className="toast toast-end">
//         <div>
//           <Icon icon="prime:times" />
//         </div>
//         <div className="alert alert-success">
//           <span>{message}</span>
//         </div>
//       </div>
//     </SnackbarContent>

//     // <SnackbarContent>
//     //   <Container>
//     //     {variant === 'success' ? <CheckIcon /> : <TimesIcon />}
//     //     <MessageContainer>
//     //       {message}
//     //     </MessageContainer>
//     //     <DismissButton onClick={handleCloseSnackbar}>
//     //       <ScreenReaderOnlyText>Close snackbar<ScreenReaderOnlyText>
//     //       <CloseIcon aria-hidden />
//     //     </DismissButton>
//     //   </Container>
//     // </SnackbarContent>
//   );
// }
