import { ThemeProvider } from './components/theme-provider';
import { Main } from './views/Main';

function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

export default App;
