import { FormEvent } from "react";
import { useLogin } from "../../auth/useLogin";

export function LoginPage() {
  const login = useLogin();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const credentials = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    await login(credentials);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button type="submit">Login</button>
    </form>
    //   <div className="relative flex flex-col justify-center h-screen overflow-hidden">
    //   <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
    //     <h1 className="text-3xl font-semibold text-center text-purple-700">
    //       DaisyUI
    //     </h1>
    //     <form className="space-y-4">
    //       <div>
    //         <label className="label">
    //           <span className="text-base label-text">Email</span>
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Email Address"
    //           className="w-full input input-bordered input-primary"
    //         />
    //       </div>
    //       <div>
    //         <label className="label">
    //           <span className="text-base label-text">Password</span>
    //         </label>
    //         <input
    //           type="password"
    //           placeholder="Enter Password"
    //           className="w-full input input-bordered input-primary"
    //         />
    //       </div>
    //       <a
    //         href="#"
    //         className="text-xs text-gray-600 hover:underline hover:text-blue-600"
    //       >
    //         Forget Password?
    //       </a>
    //       <div>
    //         <button className="btn btn-primary">Login</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}
