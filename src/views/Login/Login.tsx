import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePostLoginMutation } from "../../services/loginService";
import { loginSchema } from "./Login.schemas";
import { LoginFormData } from "./Login.types";
import imglogo from "../../assets/logo-morar-facil.png";
import { motion } from "framer-motion";

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
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { handleSubmit, control } = methods;

  const { mutate } = usePostLoginMutation();

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: (response) => {
        if (response.code === 200) {
          console.log("Login realizado com sucesso. Redirecionando...");
          navigate("/");
        }
      },
    });
  };

  useEffect(() => {
    clearAllCookies();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-center h-screen w-full bg-gray-50"
    >
      <div className="max-w-md w-full bg-white p-6 border rounded shadow-md">
        <div className="flex justify-center mb-6">
          <img src={imglogo} alt="Logo Morar Fácil" className="h-36 w-auto" />
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    id="email"
                    type="email"
                    {...field}
                    className="mt-1 block w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Insira seu email"
                  />
                )}
              />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    id="password"
                    type="password"
                    {...field}
                    className="mt-1 block w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Insira sua senha"
                  />
                )}
              />
            </div>

            {/* Lembrar e Esqueceu senha */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      ref={field.ref}
                    />
                  )}
                />
                <label htmlFor="rememberMe" className="text-gray-700">
                  Lembrar de mim
                </label>
              </div>

              <button
                type="button"
                onClick={() => navigate("/forgotPassword")}
                className="text-blue-600 hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>

            {/* Botões */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded border"
              >
                Cadastrar
              </button>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
              >
                Entrar
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </motion.div>
  );
};

export { Login };
