import { useState } from 'react';
import styled from 'styled-components';
import {
  FormGroup,
  Label as InputLabel,
  InputWrapper,
  Suffix,
  StyledInput,
} from '../../styles/SharedStyles';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      90deg,
      rgba(16, 185, 129, 0.1) 0%,
      ${({ theme }) => theme.colors.textAccent} 50%,
      rgba(16, 185, 129, 0.1) 100%
    );
  }
`;

const Label = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-weight: 600;
`;

const MultiplierValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.heroLarge};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textAccent};
  text-shadow: ${({ theme }) => theme.shadows.glow};
  margin: ${({ theme }) => theme.spacing.xs} 0;
  font-variant-numeric: tabular-nums;
  line-height: 1;
`;

const Unit = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-style: italic;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.md};
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(24, 32, 44, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.02);
`;

const GridLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-align: center;
`;

const GridValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-variant-numeric: tabular-nums;
`;

const TripCalculatorContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(24, 32, 44, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: left;
`;

const CalculatorTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
`;


const PayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PayoutItem = styled.div<{ $variant: 'target' | 'warning' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(24, 32, 44, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ $variant }) =>
    $variant === 'target' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(248, 113, 113, 0.15)'};
`;

const PayoutLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-align: center;
  font-weight: 500;
`;

const PayoutValue = styled.span<{ $variant: 'target' | 'warning' }>`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 800;
  color: ${({ $variant, theme }) =>
    $variant === 'target' ? theme.colors.textAccent : theme.colors.error};
  font-variant-numeric: tabular-nums;
`;

interface MultiplierDisplayProps {
  gasCostPerMile: number;
  totalVehicleCpm: number;
  targetProfitCpm: number;
  minimumPayoutPerMile: number;
}

const formatCurrency = (val: number): string => {
  if (isNaN(val) || !isFinite(val)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(val);
};

const formatPayout = (val: number): string => {
  if (isNaN(val) || !isFinite(val)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

export const MultiplierDisplay = ({
  gasCostPerMile,
  totalVehicleCpm,
  targetProfitCpm,
  minimumPayoutPerMile,
}: MultiplierDisplayProps) => {
  const [tripMiles, setTripMiles] = useState<string>('');

  const parsedMiles = parseFloat(tripMiles) || 0;
  const targetPayout = parsedMiles * minimumPayoutPerMile;
  const breakevenPayout = parsedMiles * totalVehicleCpm;

  return (
    <Card>
      <Label>Required Rate</Label>
      <MultiplierValue>
        {formatCurrency(minimumPayoutPerMile)}
        <Unit>/ mi</Unit>
      </MultiplierValue>
      <Subtitle>Minimum payout per mile needed to reach your target</Subtitle>

      <TripCalculatorContainer>
        <CalculatorTitle>Quick Trip Calculator</CalculatorTitle>
        <FormGroup>
          <InputLabel htmlFor="tripMiles">Incoming Trip Miles</InputLabel>
          <InputWrapper>
            <StyledInput
              id="tripMiles"
              type="number"
              inputMode="decimal"
              step="0.1"
              min="0"
              placeholder="e.g. 10.5"
              value={tripMiles}
              onChange={(e) => setTripMiles(e.target.value)}
              $hasSuffix
              $suffixLength={2}
            />
            <Suffix>mi</Suffix>
          </InputWrapper>
        </FormGroup>
        <PayoutGrid>
          <PayoutItem $variant="target">
            <PayoutLabel>Target Minimum</PayoutLabel>
            <PayoutValue $variant="target">
              {formatPayout(targetPayout)}
            </PayoutValue>
          </PayoutItem>
          <PayoutItem $variant="warning">
            <PayoutLabel>Do Not Accept Below</PayoutLabel>
            <PayoutValue $variant="warning">
              {formatPayout(breakevenPayout)}
            </PayoutValue>
          </PayoutItem>
        </PayoutGrid>
      </TripCalculatorContainer>

      <Grid>
        <GridItem>
          <GridLabel>Fuel Cost</GridLabel>
          <GridValue>{formatCurrency(gasCostPerMile)} / mi</GridValue>
        </GridItem>
        <GridItem>
          <GridLabel>Vehicle CPM</GridLabel>
          <GridValue>{formatCurrency(totalVehicleCpm)} / mi</GridValue>
        </GridItem>
        <GridItem>
          <GridLabel>Target Profit</GridLabel>
          <GridValue>{formatCurrency(targetProfitCpm)} / mi</GridValue>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default MultiplierDisplay;
