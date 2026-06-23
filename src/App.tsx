import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './styles/theme';
import Header from './components/layout/Header';
import DispatchEvaluator from './components/calculator/DispatchEvaluator';
import MetricsForm from './components/calculator/MetricsForm';
import { useCalculatorState } from './hooks/useCalculatorState';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #06080a; /* Deep dark page background to offset the centered mobile layout on desktop */
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
    display: flex;
    justify-content: center;
  }
`;

const AppContainer = styled.main`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.6);
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CollapsibleDetails = styled.details`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  
  & > summary {
    list-style: none;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textMuted};
    padding: ${({ theme }) => theme.spacing.sm} 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xs};
    user-select: none;
    transition: color 0.2s;
    
    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
    }
    
    &::-webkit-details-marker {
      display: none;
    }
    
    &::before {
      content: '⚙️';
      font-size: 14px;
    }
  }
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

  &:active {
    color: ${({ theme }) => theme.colors.error};
    border-color: ${({ theme }) => theme.colors.error};
    background: rgba(248, 113, 113, 0.1);
  }
`;

const Copyright = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

function App() {
  const { state, updateField, resetState } = useCalculatorState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header />

        <FormWrapper onSubmit={handleSubmit}>
          <DispatchEvaluator state={state} updateField={updateField} />

          <CollapsibleDetails>
            <summary>Edit Vehicle Profile & Target Wage</summary>
            <MetricsForm state={state} updateField={updateField} />
          </CollapsibleDetails>
        </FormWrapper>

        <Footer>
          <ResetButton type="button" onClick={resetState}>
            Reset Offer Fields
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
