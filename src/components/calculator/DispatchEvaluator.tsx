import { useState } from 'react';
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

const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: left;
`;

const GiantInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const GiantInput = styled.input`
  width: 100%;
  height: 72px;
  background: ${({ theme }) => theme.colors.inputBackground};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.inputText};
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  box-sizing: border-box;
  transition: ${({ theme }) => theme.transitions.default};
  font-variant-numeric: tabular-nums;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderFocus};
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.15);
  }
`;

const GiantSuffix = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  pointer-events: none;
`;

const ToggleContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
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

const TargetDisplay = styled.div`
  background: rgba(24, 32, 44, 0.5);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TargetLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textAccent};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TargetValue = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textAccent};
  text-shadow: ${({ theme }) => theme.shadows.glow};
  font-variant-numeric: tabular-nums;
  margin-top: 4px;
  line-height: 1;
`;

const SecondaryInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SecondaryPrefix = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.125rem;
  font-weight: 600;
  pointer-events: none;
`;

const SecondaryInput = styled.input`
  width: 100%;
  height: 52px;
  background: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.inputText};
  font-size: 1.125rem;
  font-weight: 600;
  padding: 0 ${({ theme }) => theme.spacing.md};
  padding-left: 1.75rem;
  box-sizing: border-box;
  transition: ${({ theme }) => theme.transitions.default};
  font-variant-numeric: tabular-nums;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }
`;

const VerdictCard = styled.div<{ $isGo: boolean }>`
  background: ${({ $isGo }) => ($isGo ? 'rgba(16, 185, 129, 0.08)' : 'rgba(248, 113, 113, 0.08)')};
  border: 2px solid ${({ $isGo, theme }) => ($isGo ? theme.colors.textAccent : theme.colors.error)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
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

const VerdictIndicator = styled.h3<{ $isGo: boolean }>`
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

const InfoText = styled.div`
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
  const [localMiles, setLocalMiles] = useState('');
  const [localOffer, setLocalOffer] = useState('');
  const [prevValues, setPrevValues] = useState({
    screenMiles: state.screenMiles,
    actualOffer: state.actualOffer,
  });

  // Sync state changes (e.g. from reset) back to local inputs during render
  if (state.screenMiles !== prevValues.screenMiles || state.actualOffer !== prevValues.actualOffer) {
    setPrevValues({
      screenMiles: state.screenMiles,
      actualOffer: state.actualOffer,
    });
    setLocalMiles(state.screenMiles ? state.screenMiles.toString() : '');
    setLocalOffer(state.actualOffer ? state.actualOffer.toString() : '');
  }

  const handleMilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;
    setLocalMiles(valStr);
    const parsed = parseFloat(valStr);
    updateField('screenMiles', isNaN(parsed) ? 0 : parsed);
  };

  const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;
    setLocalOffer(valStr);
    const parsed = parseFloat(valStr);
    updateField('actualOffer', isNaN(parsed) ? 0 : parsed);
  };

  // Calculations
  const { gasPrice, mpg, maintenanceCpm, screenMiles, actualOffer, isDeadhead, targetHourlyWage, averageMph } = state;

  const vehicleCostPerMile = mpg > 0 ? (gasPrice / mpg) + maintenanceCpm : maintenanceCpm;
  const requiredProfitPerMile = averageMph > 0 ? targetHourlyWage / averageMph : 0;
  const magicMultiplier = vehicleCostPerMile + requiredProfitPerMile;
  const totalMiles = isDeadhead ? screenMiles * 2 : screenMiles;
  const minimumAcceptablePayout = totalMiles * magicMultiplier;
  const autoEstimatedMinutes = averageMph > 0 ? (totalMiles / averageMph) * 60 : 0;

  // Package evaluation
  const hasActualOffer = actualOffer > 0;
  const tripStats = hasActualOffer ? evaluateTrip({
    expectedRevenue: actualOffer,
    totalMiles,
    estimatedMinutes: autoEstimatedMinutes,
    vehicleCostPerMile,
  }) : null;

  const isGo = tripStats ? tripStats.hourlyRate >= targetHourlyWage : false;

  return (
    <Container>
      <Title>Snap Decision Evaluator</Title>

      <Card>
        <InputGroup>
          <InputLabel htmlFor="screenMiles">Route Miles</InputLabel>
          <GiantInputWrapper>
            <GiantInput
              id="screenMiles"
              type="number"
              inputMode="decimal"
              placeholder="0.0"
              style={{ fontSize: '2.25rem' }} // Expressly set size to prevent iOS zoom
              value={localMiles}
              onChange={handleMilesChange}
              required
            />
            <GiantSuffix>mi</GiantSuffix>
          </GiantInputWrapper>
        </InputGroup>

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

        <TargetDisplay>
          <TargetLabel>Required Target</TargetLabel>
          <TargetValue>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(minimumAcceptablePayout)}
          </TargetValue>
          <InfoText>
            Based on {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(magicMultiplier)}/mi target rate
          </InfoText>
        </TargetDisplay>
      </Card>

      <Card>
        <InputGroup>
          <InputLabel htmlFor="actualOffer">Verify Actual Offer (Optional)</InputLabel>
          <SecondaryInputWrapper>
            <SecondaryPrefix>$</SecondaryPrefix>
            <SecondaryInput
              id="actualOffer"
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              style={{ fontSize: '1.125rem' }} // Expressly set size to prevent iOS zoom
              value={localOffer}
              onChange={handleOfferChange}
            />
          </SecondaryInputWrapper>
        </InputGroup>

        {tripStats && (
          <VerdictCard $isGo={isGo}>
            <VerdictIndicator $isGo={isGo}>{isGo ? 'Accept Offer' : 'Decline Offer'}</VerdictIndicator>
            <MetricsGrid>
              <MetricBox>
                <MetricLabel>Net Profit</MetricLabel>
                <MetricValue $color={isGo ? '#10b981' : '#f87171'}>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tripStats.netProfit)}
                </MetricValue>
              </MetricBox>
              <MetricBox>
                <MetricLabel>Hourly Rate</MetricLabel>
                <MetricValue $color={isGo ? '#10b981' : '#f87171'}>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tripStats.hourlyRate)}/hr
                </MetricValue>
              </MetricBox>
            </MetricsGrid>
            <InfoText>
              Est. Trip Time: {Math.round(autoEstimatedMinutes)} min (@ {averageMph} MPH) | True Cost: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tripStats.trueVehicleCost)}
            </InfoText>
          </VerdictCard>
        )}
      </Card>
    </Container>
  );
};

export default DispatchEvaluator;
