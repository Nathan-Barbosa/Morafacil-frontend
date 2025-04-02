import { useNavigate } from "react-router-dom";
import { usePostLoginMutation } from "../../services/loginService";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData } from "./Login.types";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { loginSchema } from "./Login.schemas";
import { useEffect } from "react";
import imglogo from "../../assets/logo-morar-facil.png";

const clearAllCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
};

const Login = () => {
  const navigate = useNavigate();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, control, watch } = methods;
  const { mutate } = usePostLoginMutation();

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: (response) => {
        if (response.code === 200) {
          console.log("Login realizado com sucesso vou redirecionar");
          navigate("/");
        }
      },
    });
  };

  useEffect(() => {
    clearAllCookies();
  }, []);

  console.log("form", watch());

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="max-w-md mx-auto p-6 border rounded shadow w-full">
        <div className="flex justify-center mb-4">
          <img src={imglogo} alt="Logo Morar Fácil" className="h-34 w-auto" />
        </div>

        <FormProvider {...methods}>
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Campo Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Controller
                control={control}
                name="email"
                render={({ field: { value = "", onChange } }) => (
                  <input
                    className="mt-1 block w-full border p-2 rounded"
                    type="email"
                    value={value || ""}
                    onChange={onChange}
                    placeholder="Insira o email"
                  />
                )}
              />
            </div>

            {/* Campo Senha */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <Controller
                control={control}
                name="password"
                render={({ field: { value = "", onChange } }) => (
                  <input
                    className="mt-1 block w-full border p-2 rounded"
                    type="password"
                    value={value || ""}
                    onChange={onChange}
                    placeholder="Insira sua senha"
                  />
                )}
              />
            </div>

            {/* Botões Entrar / Cadastrar */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full bg-blue-600 text-white p-2 rounded"
              >
                Cadastrar
              </button>

              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                Entrar
              </button>
            </div>

            {/* Checkbox + Link de senha */}
            <div className="w-full flex justify-between p-1 ">
              <div className="flex gap-2">
                <Controller
                  control={control}
                  name="rememberMe"
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <input
                      className="mt-1 block border p-2 rounded"
                      type="checkbox"
                      checked={value}
                      onChange={onChange}
                    />
                  )}
                />
                <span>Lembrar de mim</span>
              </div>
              <button
                className="cursor-pointer hover:text-blue-500 text-sm font-medium text-gray-700"
                onClick={() => navigate("/forgotPassword")}
              >
                lembrar senha
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export { Login };
