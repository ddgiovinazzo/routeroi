import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './styles/theme';
import Header from './components/layout/Header';
import MultiplierDisplay from './components/calculator/MultiplierDisplay';
import MetricsForm from './components/calculator/MetricsForm';
import OverheadForm from './components/calculator/OverheadForm';
import { useCalculatorState } from './hooks/useCalculatorState';
import {
  calculateFuelCPM,
  calculateTotalCPM,
  calculateHourlyFixed,
  calculateTargetMultiplier,
} from './utils/calculations';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }

  #root {
    width: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const AppContainer = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ResetButton = styled.button`
  height: 48px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.error};
    border-color: ${({ theme }) => theme.colors.error};
    background: rgba(248, 113, 113, 0.05);
  }

  &:active {
    background: rgba(248, 113, 113, 0.1);
  }

  @media (pointer: coarse) {
    height: 52px;
  }
`;

const Copyright = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

function App() {
  const { state, updateField, resetState } = useCalculatorState();

  // Run the math engine
  const fuelCpm = calculateFuelCPM(state.gasPrice, state.mpg);
  const totalCpm = calculateTotalCPM(fuelCpm, state.maintCpm, state.replCpm);
  const hourlyFixed = calculateHourlyFixed(state.insurance, state.phone, state.hours);
  const targetMultiplier = calculateTargetMultiplier(
    state.targetWage,
    hourlyFixed,
    state.avgMph,
    totalCpm,
    state.taxRate
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header />
        
        <MultiplierDisplay
          targetMultiplier={targetMultiplier}
          fuelCpm={fuelCpm}
          totalCpm={totalCpm}
          hourlyFixed={hourlyFixed}
          taxRate={state.taxRate}
          avgMph={state.avgMph}
        />

        <FormWrapper onSubmit={handleSubmit}>
          <MetricsForm state={state} updateField={updateField} />
          <OverheadForm state={state} updateField={updateField} />
        </FormWrapper>

        <Footer>
          <ResetButton type="button" onClick={resetState}>
            Reset to Defaults
          </ResetButton>
          <Copyright>
            &copy; {new Date().getFullYear()} RouteROI. All rights reserved.
          </Copyright>
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
