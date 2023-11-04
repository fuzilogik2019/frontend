import { Suspense } from 'react';
import AppRoutes from './routes/routes';
import { LoadingPage } from './pages/loading-page';
import { AuthProvider } from './context/AuthContext';
import { HamburgerProvider } from './context/HamburgerContext';
import { CertificateProvider } from './context/CertificationContext';
import Overlay from './components/overlay';
import './App.css';
import { ThemeProvider } from '@material-tailwind/react';
import { FilterProvider } from './context/FilterContext';

function App() {
  //TO DO - Custom Input Size
  const theme = {
    input: {
      styles: {
        variants: {
          outlined: {
            sizes: {
              lg: {
                container: {
                  height: 'h-14',
                  border: '2px',
                },
                input: {
                  fontSize: 'text-md',
                  px: 'px-3',
                  py: 'py-[6px]',
                  borderRadius: 'rounded-lg',
                },
                label: {
                  lineHeight: 'peer-placeholder-shown:leading-[3.9]',
                  position: '-top-1.5',
                  fontSize: 'peer-placeholder-shown:text-[18px]',
                  floated: {
                    fontSize: 'text-sm peer-focus:text-sm',
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return (
    <AuthProvider>
      <CertificateProvider>
        <ThemeProvider value={theme}>
          <Suspense fallback={<LoadingPage />}>
            <HamburgerProvider>
              <Overlay>
                <FilterProvider>
                  <AppRoutes />
                </FilterProvider>
              </Overlay>
            </HamburgerProvider>
          </Suspense>
        </ThemeProvider>
      </CertificateProvider>
    </AuthProvider>
  );
}

export default App;
