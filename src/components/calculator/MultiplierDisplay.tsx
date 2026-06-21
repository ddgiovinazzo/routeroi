import styled from 'styled-components';

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

  &:hover {
    border-color: rgba(16, 185, 129, 0.3);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3),
      ${({ theme }) => theme.shadows.glow};
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
  grid-template-columns: repeat(2, 1fr);
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

interface MultiplierDisplayProps {
  targetMultiplier: number;
  fuelCpm: number;
  totalCpm: number;
  hourlyFixed: number;
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

export const MultiplierDisplay = ({
  targetMultiplier,
  fuelCpm,
  totalCpm,
  hourlyFixed,
}: MultiplierDisplayProps) => {
  return (
    <Card>
      <Label>Required Rate</Label>
      <MultiplierValue>
        {formatCurrency(targetMultiplier)}
        <Unit>/ mi</Unit>
      </MultiplierValue>
      <Subtitle>Minimum payout per mile needed to reach your goals</Subtitle>

      <Grid>
        <GridItem>
          <GridLabel>Fuel Cost</GridLabel>
          <GridValue>{formatCurrency(fuelCpm)} / mi</GridValue>
        </GridItem>
        <GridItem>
          <GridLabel>Total Variable Cost (CPM)</GridLabel>
          <GridValue>{formatCurrency(totalCpm)} / mi</GridValue>
        </GridItem>
        <GridItem>
          <GridLabel>Hourly Fixed Cost</GridLabel>
          <GridValue>{formatCurrency(hourlyFixed)} / hr</GridValue>
        </GridItem>
        <GridItem>
          <GridLabel>Overhead Breakeven</GridLabel>
          <GridValue>
            {formatCurrency((hourlyFixed / 12) + totalCpm)} / mi
          </GridValue>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default MultiplierDisplay;
