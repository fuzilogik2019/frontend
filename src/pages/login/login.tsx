import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';
import useAxios from '#/hooks/utils/useAxios';
import { useAuth } from '#/context/AuthContext';
import { ILoginProps } from './types';
import { paths } from '#/routes/paths';
import { Input, Button } from '@material-tailwind/react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const axios = useAxios();

  const onSubmit = async (values: ILoginProps) => {
    //TODO: Cambiar cuando la logica del LOGIN (desde el back, me devuelva el JWT y la info del Usuario)
    const { dni, password } = values;
    const { data, error, loading } = await axios.post('/auth/sign-in', {
      dni,
      password,
    });

    if (error && error?.response && error?.response?.data) return; //TODO: Snackbar de error.
    if (loading) return; //TODO: Spinner de carga.

    login(data);
    navigate(paths.home);
  };

  const validationSchema = yup.object({
    dni: yup.string().required('Campo requerido'),
    password: yup.string().required('Campo requerido'),
  });

  const { handleSubmit, handleBlur, handleChange, errors, touched } = useFormik(
    {
      initialValues: {
        dni: '',
        password: '',
      },
      onSubmit,
      validationSchema,
    },
  );

  const handleClick = async () => {
    // Maneja la lógica cuando se hace clic en el botón
    return;
  };

  function dniChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const cleanValue = value.replace(/[^\d]/g, ''); // Quitar todo excepto números

    // Solo permitir hasta 8 dígitos para el DNI
    const trimmedValue = cleanValue.slice(0, 8);

    // Actualizar el valor del input con los dígitos limpios
    e.target.value = trimmedValue;

    // Llamar a handleChange con el nuevo evento
    handleChange(e);
  }

  return (
    <section className="relative flex flex-col items-center h-screen justify-center overflow-hidden bg-gray-100">
      <div className="shadow-3xl rounded-xl p-6">
        <div className="container flex justify-center mb-10">
          <img
            src="assets/logos/fenix-login.svg"
            alt="fenix"
            className="object-cover h-auto rounded w-[100px]"
          />
        </div>

        <div className="text-center mb-10">
          <span className="text-3xl">
            Entre todos,
            <br />
          </span>
          <span className="text-3xl font-bold text-indigo-900">
            evitemos el fraude.
          </span>
        </div>

        <div className="flex justify-center items-center w-full">
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="mb-6 text-lg md:mb-8 shadow-3xl">
              <Input
                label="DNI"
                type="text"
                id="dni"
                placeholder="DNI"
                onChange={dniChange}
                onBlur={handleBlur}
                size="lg"
                error={!!errors.dni && !!touched.dni}
                variant="outlined"
                color="deep-purple"
              />
            </div>
            <div className="mb-6 text-lg">
              <Input
                label="Contraseña"
                type="password"
                id="password"
                placeholder="Contraseña"
                onChange={handleChange}
                onBlur={handleBlur}
                size="lg"
                error={!!errors.password && !!touched.password}
                color="deep-purple"
              />
            </div>
            <div className="flex flex-col">
              <Button
                color="deep-purple"
                type="submit"
                onClick={handleClick}
                className="w-full"
                size="lg"
              >
                Ingresar
              </Button>

              <Link
                to={paths.totalResults}
                className="mt-24 text-sm text-center text-violet-light underline"
              >
                Ver escrutinios
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* 
        // TODO: FIX FOOTER IMAGE DESIGN 
        // https://www.figma.com/file/iO7j93Rxbk2nIfYdqpAmv2/%F0%9F%A6%85-APP-Fiscalizaci%C3%B3n-Libertaria-%7C-%F0%9F%93%B1-FINAL?type=design&node-id=59-4193&mode=dev
        <div className='flex flex-col items-center h-screen mt-auto overflow-hidden bg-gray-100 md:hidden'> <img /
            src='assets/logos/footer.svg'
            alt='footer'
            className='w-full h-full p-0 m-0'
          /> 
        </div>
      */}
    </section>
  );
};

export const Login = observer(LoginPage);

export default Login;
