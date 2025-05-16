import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';

export const LoginForm = () => {
  const { login, isLoading, error, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 sm:p-8 border border-gray-700"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-300">
              Or{' '}
              <Link
                to="/register"
                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Create a new account
              </Link>
            </p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-900/50 p-3 sm:p-4 rounded-md border border-red-700"
            >
              <p className="text-xs sm:text-sm text-red-300">{error.message}</p>
            </motion.div>
          )}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
          >
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  {...register('email')}
                  id="email"
                  autoComplete="email"
                  type="email"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p
                    className="mt-1 text-xs sm:text-sm text-red-400"
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <input
                  {...register('password')}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <p
                    className="mt-1 text-xs sm:text-sm text-red-400"
                    role="alert"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!isValid || isLoading}
              className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
            >
              Sign in
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
};
