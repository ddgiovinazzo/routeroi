import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { evaluateTrip } from '@ddgiovinazzo/dispatch-math';
import type { CalculatorState } from '../../hooks/useCalculatorState';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 700;
  text-align: left;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;

const FieldCard = styled.button<{ $active: boolean }>`
  background: ${({ $active, theme }) => ($active ? 'rgba(16, 185, 129, 0.1)' : theme.colors.inputBackground)};
  border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.borderFocus : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.inputText};
  text-align: left;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }
`;

const FieldLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const FieldLabel = styled.span<{ $active: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ $active, theme }) => ($active ? theme.colors.textAccent : theme.colors.textMuted)};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ClearFieldButton = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 10px;
  cursor: pointer;
  padding: 1px 4px;
  border-radius: 4px;
  background: rgba(248, 113, 113, 0.15);
  font-weight: 700;

  &:hover {
    background: rgba(248, 113, 113, 0.25);
  }
`;

const FieldValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: 2px;
  font-variant-numeric: tabular-nums;
`;

const ToggleContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  user-select: none;
  height: 56px;
  box-sizing: border-box;

  &:hover {
    background: ${({ theme }) => theme.colors.cardBackgroundHover};
  }
`;

const ToggleTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ToggleTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ToggleSub = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const Switch = styled.div<{ $checked: boolean }>`
  position: relative;
  width: 50px;
  height: 26px;
  background-color: ${({ $checked, theme }) => ($checked ? theme.colors.buttonBackground : '#374151')};
  border-radius: 13px;
  transition: background-color 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${({ $checked }) => ($checked ? '27px' : '3px')};
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Keypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

const KeyButton = styled.button`
  height: 52px;
  background: rgba(24, 32, 44, 0.6);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.default};
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:active {
    background: ${({ theme }) => theme.colors.borderFocus};
    color: ${({ theme }) => theme.colors.buttonText};
    transform: scale(0.96);
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderFocus};
      background: rgba(24, 32, 44, 0.9);
    }
  }
`;

const ResultCard = styled.div<{ $isGo: boolean }>`
  background: ${({ $isGo }) => ($isGo ? 'rgba(16, 185, 129, 0.08)' : 'rgba(248, 113, 113, 0.08)')};
  border: 2px solid ${({ $isGo, theme }) => ($isGo ? theme.colors.textAccent : theme.colors.error)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  box-shadow: ${({ $isGo, theme }) => ($isGo ? theme.shadows.glow : '0 4px 10px rgba(248, 113, 113, 0.1)')};
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ $isGo, theme }) => ($isGo ? theme.colors.textAccent : theme.colors.error)};
  }
`;

const GoNoGoIndicator = styled.h3<{ $isGo: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${({ $isGo, theme }) => ($isGo ? theme.colors.textAccent : theme.colors.error)};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const MetricBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(24, 32, 44, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.02);
`;

const MetricLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 2px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const MetricValue = styled.span<{ $color?: string }>`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 800;
  color: ${({ $color, theme }) => $color || theme.colors.textPrimary};
  font-variant-numeric: tabular-nums;
`;

const TrueCostText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-style: italic;
`;

interface DispatchEvaluatorProps {
  state: CalculatorState;
  updateField: (field: keyof CalculatorState, value: number | boolean) => void;
}

export const DispatchEvaluator = ({ state, updateField }: DispatchEvaluatorProps) => {
  const [activeField, setActiveField] = useState<'expectedRevenue' | 'screenMiles' | 'estimatedMinutes'>('expectedRevenue');
  const [inputStrings, setInputStrings] = useState({
    expectedRevenue: '',
    screenMiles: '',
    estimatedMinutes: '',
  });

  const [prevValues, setPrevValues] = useState({
    expectedRevenue: state.expectedRevenue,
    screenMiles: state.screenMiles,
    estimatedMinutes: state.estimatedMinutes,
  });

  // Sync state changes (e.g. from app reset) back to raw inputs during render to prevent cascading renders
  if (
    state.expectedRevenue !== prevValues.expectedRevenue ||
    state.screenMiles !== prevValues.screenMiles ||
    state.estimatedMinutes !== prevValues.estimatedMinutes
  ) {
    setPrevValues({
      expectedRevenue: state.expectedRevenue,
      screenMiles: state.screenMiles,
      estimatedMinutes: state.estimatedMinutes,
    });
    setInputStrings({
      expectedRevenue: state.expectedRevenue ? state.expectedRevenue.toString() : '',
      screenMiles: state.screenMiles ? state.screenMiles.toString() : '',
      estimatedMinutes: state.estimatedMinutes ? state.estimatedMinutes.toString() : '',
    });
  }

  const handleKeyPress = useCallback((key: string) => {
    const current = inputStrings[activeField];
    let next = current;

    if (key === 'clear') {
      next = '';
    } else if (key === 'delete') {
      next = current.slice(0, -1);
    } else if (key === '.') {
      if (!current.includes('.')) {
        next = current === '' ? '0.' : current + '.';
      }
    } else {
      if (current === '0' && key === '0') {
        // Do nothing
      } else if (current === '0' && key !== '0') {
        next = key;
      } else {
        next = current + key;
      }
    }

    setInputStrings((prev) => ({
      ...prev,
      [activeField]: next,
    }));

    const parsed = parseFloat(next);
    updateField(activeField, isNaN(parsed) ? 0 : parsed);
  }, [activeField, inputStrings, updateField]);

  // Keyboard navigation for desktop users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting if standard input elements are focused
      if (document.activeElement?.tagName === 'INPUT') {
        return;
      }

      const key = e.key;
      if (/[0-9]/.test(key)) {
        e.preventDefault();
        handleKeyPress(key);
      } else if (key === '.') {
        e.preventDefault();
        handleKeyPress('.');
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleKeyPress('delete');
      } else if (key === 'Escape') {
        e.preventDefault();
        handleKeyPress('clear');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  // Calculations
  const { gasPrice, mpg, maintenanceCpm, screenMiles, expectedRevenue, estimatedMinutes, isDeadhead, targetHourlyWage } = state;
  const vehicleCostPerMile = mpg > 0 ? (gasPrice / mpg) + maintenanceCpm : maintenanceCpm;
  const totalMiles = isDeadhead ? screenMiles * 2 : screenMiles;

  const tripMetrics = evaluateTrip({
    expectedRevenue,
    totalMiles,
    estimatedMinutes,
    vehicleCostPerMile,
  });

  const isGo = tripMetrics.hourlyRate >= targetHourlyWage;

  const formatOfferDisplay = (val: string, active: boolean) => {
    if (active) {
      return val === '' ? '$0' : `$${val}`;
    }
    const parsed = parseFloat(val);
    if (isNaN(parsed)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parsed);
  };

  const formatDistanceDisplay = (val: string, active: boolean) => {
    if (active) {
      return val === '' ? '0 mi' : `${val} mi`;
    }
    const parsed = parseFloat(val);
    if (isNaN(parsed)) return '0 mi';
    return `${parsed} mi`;
  };

  const formatTimeDisplay = (val: string, active: boolean) => {
    if (active) {
      return val === '' ? '0 min' : `${val} min`;
    }
    const parsed = parseFloat(val);
    if (isNaN(parsed)) return '0 min';
    return `${parsed} min`;
  };

  const clearField = (field: 'expectedRevenue' | 'screenMiles' | 'estimatedMinutes', e: React.MouseEvent) => {
    e.stopPropagation();
    setInputStrings((prev) => ({
      ...prev,
      [field]: '',
    }));
    updateField(field, 0);
  };

  return (
    <Container>
      <Title>Snap Decision Evaluator</Title>

      <FormGrid>
        <FieldCard
          type="button"
          $active={activeField === 'expectedRevenue'}
          onClick={() => setActiveField('expectedRevenue')}
        >
          <FieldLabelRow>
            <FieldLabel $active={activeField === 'expectedRevenue'}>Payout</FieldLabel>
            {inputStrings.expectedRevenue && (
              <ClearFieldButton onClick={(e) => clearField('expectedRevenue', e)}>×</ClearFieldButton>
            )}
          </FieldLabelRow>
          <FieldValue>{formatOfferDisplay(inputStrings.expectedRevenue, activeField === 'expectedRevenue')}</FieldValue>
        </FieldCard>

        <FieldCard
          type="button"
          $active={activeField === 'screenMiles'}
          onClick={() => setActiveField('screenMiles')}
        >
          <FieldLabelRow>
            <FieldLabel $active={activeField === 'screenMiles'}>Distance</FieldLabel>
            {inputStrings.screenMiles && (
              <ClearFieldButton onClick={(e) => clearField('screenMiles', e)}>×</ClearFieldButton>
            )}
          </FieldLabelRow>
          <FieldValue>{formatDistanceDisplay(inputStrings.screenMiles, activeField === 'screenMiles')}</FieldValue>
        </FieldCard>

        <FieldCard
          type="button"
          $active={activeField === 'estimatedMinutes'}
          onClick={() => setActiveField('estimatedMinutes')}
        >
          <FieldLabelRow>
            <FieldLabel $active={activeField === 'estimatedMinutes'}>Duration</FieldLabel>
            {inputStrings.estimatedMinutes && (
              <ClearFieldButton onClick={(e) => clearField('estimatedMinutes', e)}>×</ClearFieldButton>
            )}
          </FieldLabelRow>
          <FieldValue>{formatTimeDisplay(inputStrings.estimatedMinutes, activeField === 'estimatedMinutes')}</FieldValue>
        </FieldCard>
      </FormGrid>

      <ToggleContainer>
        <ToggleTextWrapper>
          <ToggleTitle>Deadhead Return</ToggleTitle>
          <ToggleSub>Return trip empty (double route mileage)</ToggleSub>
        </ToggleTextWrapper>
        <HiddenCheckbox
          type="checkbox"
          checked={isDeadhead}
          onChange={(e) => updateField('isDeadhead', e.target.checked)}
        />
        <Switch $checked={isDeadhead} />
      </ToggleContainer>

      <Keypad>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map((val) => (
          <KeyButton type="button" key={val} onClick={() => handleKeyPress(val)}>
            {val}
          </KeyButton>
        ))}
        <KeyButton type="button" onClick={() => handleKeyPress('delete')} aria-label="Backspace">
          ⌫
        </KeyButton>
      </Keypad>

      <ResultCard $isGo={isGo}>
        <GoNoGoIndicator $isGo={isGo}>{isGo ? 'Accept Offer' : 'Decline Offer'}</GoNoGoIndicator>
        <MetricsGrid>
          <MetricBox>
            <MetricLabel>Net Profit</MetricLabel>
            <MetricValue $color={isGo ? '#10b981' : '#f87171'}>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tripMetrics.netProfit)}
            </MetricValue>
          </MetricBox>
          <MetricBox>
            <MetricLabel>Hourly Rate</MetricLabel>
            <MetricValue $color={isGo ? '#10b981' : '#f87171'}>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tripMetrics.hourlyRate)}
              /hr
            </MetricValue>
          </MetricBox>
        </MetricsGrid>
        <TrueCostText>
          Est. Vehicle Cost: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tripMetrics.trueVehicleCost)}
          {' '}({new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(vehicleCostPerMile)}/mi)
        </TrueCostText>
      </ResultCard>
    </Container>
  );
};

export default DispatchEvaluator;
