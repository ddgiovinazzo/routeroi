import styled from 'styled-components';
import type { CalculatorState } from '../../hooks/useCalculatorState';

const FormCard = styled.section`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const FormTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  font-weight: 600;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
  text-align: left;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Prefix = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  pointer-events: none;
`;

const Suffix = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  pointer-events: none;
`;

interface InputProps {
  $hasPrefix?: boolean;
  $hasSuffix?: boolean;
  $suffixLength?: number;
}

const StyledInput = styled.input<InputProps>`
  width: 100%;
  height: 48px;
  background: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.inputText};
  font-size: 1rem;
  padding: 0 ${({ theme }) => theme.spacing.md};
  padding-left: ${({ $hasPrefix, theme }) => ($hasPrefix ? '1.75rem' : theme.spacing.md)};
  padding-right: ${({ $hasSuffix, $suffixLength, theme }) =>
    $hasSuffix ? `${($suffixLength || 3) * 0.5 + 1.25}rem` : theme.spacing.md};
  box-sizing: border-box;
  transition: ${({ theme }) => theme.transitions.default};
  font-variant-numeric: tabular-nums;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderFocus};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.borderFocus};
  }

  @media (pointer: coarse) {
    height: 52px;
  }
`;

interface MetricsFormProps {
  state: CalculatorState;
  updateField: (field: keyof CalculatorState, value: number) => void;
}

export const MetricsForm = ({ state, updateField }: MetricsFormProps) => {
  const handleChange = (field: keyof CalculatorState, valStr: string) => {
    const val = parseFloat(valStr);
    updateField(field, isNaN(val) ? 0 : val);
  };

  return (
    <FormCard>
      <FormTitle>Vehicle & Driving Metrics</FormTitle>

      <FormGroup>
        <Label htmlFor="gasPrice">Gas Price</Label>
        <InputWrapper>
          <Prefix>$</Prefix>
          <StyledInput
            id="gasPrice"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={state.gasPrice || ''}
            onChange={(e) => handleChange('gasPrice', e.target.value)}
            $hasPrefix
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>/ gal</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="mpg">Fuel Efficiency (MPG)</Label>
        <InputWrapper>
          <StyledInput
            id="mpg"
            type="number"
            inputMode="numeric"
            step="1"
            min="1"
            value={state.mpg || ''}
            onChange={(e) => handleChange('mpg', e.target.value)}
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>MPG</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="maintCpm">Maintenance CPM</Label>
        <InputWrapper>
          <Prefix>$</Prefix>
          <StyledInput
            id="maintCpm"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={state.maintCpm || ''}
            onChange={(e) => handleChange('maintCpm', e.target.value)}
            $hasPrefix
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>/ mi</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="replCpm">Vehicle Replacement CPM</Label>
        <InputWrapper>
          <Prefix>$</Prefix>
          <StyledInput
            id="replCpm"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={state.replCpm || ''}
            onChange={(e) => handleChange('replCpm', e.target.value)}
            $hasPrefix
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>/ mi</Suffix>
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="avgMph">Average Active Speed</Label>
        <InputWrapper>
          <StyledInput
            id="avgMph"
            type="number"
            inputMode="numeric"
            step="1"
            min="1"
            value={state.avgMph || ''}
            onChange={(e) => handleChange('avgMph', e.target.value)}
            $hasSuffix
            $suffixLength={3}
            required
          />
          <Suffix>MPH</Suffix>
        </InputWrapper>
      </FormGroup>
    </FormCard>
  );
};

export default MetricsForm;
